const bcrypt = require('bcrypt');
const userModel = require('../../../model/user/user');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken')

const registerUser = async (req, res) => {

    try {
        const { password, ...data } = req.body;
        const saltRounds = 10;
        bcrypt.hash(req.body.password, saltRounds, async (error, hash) => {
            if (error) return res.status(203).json({ message: "something went wrong" })

            data.password = hash;

            const dataToSave = new userModel(data);

            const response = await dataToSave.save();

            const { password, ...responsewithoutpassword } = response._doc;

            const transporter = await nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.ADMIN_MAIL,
                    pass: process.env.ADMIN_APP_PASSWORD,
                }
            });
            const mailOptions = {
                from: process.env.ADMIN_MAIL,
                to: responsewithoutpassword.email,
                subject: 'Registration Completed',
                html: `
                <html>
                <body>
                <h1> Welcome ${responsewithoutpassword.f_name} to Frank and Oak Website</h1>
                <p>Thank you for registering with us. We are excited to have you on board. </p>
                <p>Here are some of the benefits of being a part of our community:</p>
                <ul>
                    <li>Get exclusive access to our latest collections</li>
                    <li>Get early access to our sales</li>
                    <li>Get exclusive discounts</li>
                    <li>Get access to our exclusive events</li>
                </ul>
                <p>Stay tuned for more updates from us. </p>
                <p>Thank you once again for registering with us. </p>
                <p>Best Regards</p>
                <p>Frank and Oak Team</p>
                </body>
                </html>
                `
            };



            transporter.sendMail(mailOptions, (error, success) => {
                if (error) {
                    res.status(500).json({ message: 'email could not send' })
                    console.log(error);
                    return;
                }
                console.log('Email sent: ' + info.response);
            });

            res.status(200).json({ message: "successfully register", data: responsewithoutpassword })

        });


    }
    catch (error) {
        console.log(error);
        // if (error.code === 11000 && error.keyPattern && error.keyValue.email) {
        //     return res.status(404).json({ message: 'email already exist' })
        // }

        console.log(error.keyPattern, error.keyPattern.email, error.keyValue.email);

        res.status(500).json({ message: 'internal server error' })
    }
};


const loginUser = async (req, res) => {
    try {
        const { email, password} = req.body;
        // console.log();
        // console.log(auth);

        const user = await userModel.findOne({ email });

        if (!user) return res.status(404).json({ message: "user not found" });

        const transporter = await nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.ADMIN_MAIL,
                pass: process.env.ADMIN_APP_PASSWORD,
            }
        });
        const mailOptions = {
            from: process.env.ADMIN_MAIL,
            to: user.email,
            subject: 'SignIn done successfully',
            html: `
            <html>
            <body>
            <h1>Welcome Back!</h1>
            <p>Thank you for signing in once again. We are grateful for your continued support.</p>
            <p>If you have any questions or need assistance, feel free to reach out to our support team.</p>
            <p>Best regards,</p>
            <p>Frank and Oak Team</p>
            </body>
            </html>
            `
        };



        transporter.sendMail(mailOptions, (error, success) => {
            if (error) {
                res.status(500).json({ message: 'email could not send' })
                console.log(error);
                return;
            }
            console.log('Email sent: ' + info.response);
        });

        bcrypt.compare(password, user.password, (error, result) => {
            if (error) return res.status(203).json({ message: "something went wrong" });

            if (!result) return res.status(404).json({ message: "password not match" });
            // console.log(user.id);

            jwt.sign({ email: user.email, _id: user._id }, process.env.JWT_KEY, (error, token) => {
                if (error) return res.status(203).json({ message: 'internal server error' });

            const response={
                f_name:user.f_name,
                email,
                id:user.id,
            }

                res.status(200).json({ message: 'login successfull', data:response, auth: token })
            })

            // res.status(200).json({ message: 'login successfull' })
        })

    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'internal server error' })
    }
};

module.exports = {
    registerUser,
    loginUser
}