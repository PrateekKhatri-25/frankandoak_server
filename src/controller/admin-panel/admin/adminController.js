const OtpData = require('../../../data/support');
const AdminModal = require('../../../model/admin/admin');
require('dotenv').config();
const nodemailer = require('nodemailer')
const fs = require('fs')
const path = require('path')

//controller 1

const registerAdmin = async () => {
    const preData = await AdminModal.find();
    if (preData.length !== 0) return console.log(preData);

    const data = {
        email: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASSWORD
    }

    const dataToSave = new AdminModal(data);
    const response = await dataToSave.save();
    console.log(response);

}

//controller 2

const adminLogin = async (req, res) => {
    try {
        const ifValidEmail = await AdminModal.find({ email: req.body.email });

        if (ifValidEmail.length === 0) return res.status(400).json({ message: 'enter a valid email' });
        if (ifValidEmail[0].password != req.body.password) return res.status(401).json({ message: 'enter a valid password' })
        res.status(200).json({ messgae: "success", data: ifValidEmail })
    }
    catch (error) {
        res.status(500).json({ messgae: "internal server error" })
    }
}

//controller 3

const generateOtp = async (req, res) => {
    try {
        const { email } = req.body;
        const transporter = await nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.ADMIN_MAIL,
                pass: process.env.ADMIN_APP_PASSWORD
            }
        });
        const otp = Math.floor(Math.random() * 1000000);

        const otpData = OtpData;

        otpData.set(email, otp)

        console.log(email);

        console.log(otp);

        const mailOptions = {
            from: process.env.ADMIN_MAIL,
            to: email,
            subject: 'OTP for email update',
            text: `Your OTP for email updatedation is ${otp}`
        }
        transporter.sendMail(mailOptions, (error, success) => {
            if (error) {
                res.status(500).json({ message: 'otp could not generate' })
                console.log(error);
                return;
            }

            res.status(200).json({ message: 'otp generated successfully' })
        })
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'internal server error' })
    }
}

//controller 4

const updateEmail = async (req, res) => {
    try {
        const otpdata = OtpData;
        const sentOtp = otpdata.get(req.body.email);

        if (Number(req.body.userotp) !== sentOtp) return res.status(401).json({ message: 'incorrect OTP' })

        const response = await AdminModal.updateOne(
            req.params,
            {
                $set: { email: req.body.newemail }
            }
        )
        res.status(200).json({ message: 'email updated successfully', data: response })

    }
    catch (error) {
        console.log(error);
        re.status(500).json({ message: 'internal server error' })
    }
}

//controller 5

const updateAdmin = async (req, res) => {
    const data = req.body;
    // console.log(req.files);
    const preData = await AdminModal.findById(req.params._id);
    // console.log(req.get('host'));

    if (req.files) {
        const filepath = path.join(__dirname, 'src', 'uploads');

        if (preData.logo) {
            // if (req.files.logo[0]) {
                data.logo = req.files.logo[0].filename

                // if (preData.logo) {
                //     if (fs.existsSync(`${filepath}/${preData[0].logo}`)) {
                //         fs.unlinkSync(`${filepath}/${preData[0].logo}`)
                //     }
                // }
            // }
        }

        if (preData.favicon) {
            // if (req.files.favicon[0]) {
                data.favicon = req.files.favicon[0].filename

                // if (fs.existsSync(`${filepath}/${preData[0].favicon}`)) {
                //     fs.unlinkSync(`${filepath}/${preData[0].favicon}`)
                // }
            // }
        }

        if (preData.footlogo) {
            if (req.files.footlogo[0]) {
                data.footlogo = req.files.footlogo[0].filename

                // if (fs.existsSync(`${filepath}/${preData[0].footlogo}`)) {
                //     fs.unlinkSync(`${filepath}/${preData[0].footlogo}`)
                // }
            }
        }

        if (preData.profile) {
            if (req.files.profile[0]) {
                data.profile = req.files.profile[0].filename

                if (fs.existsSync(`${filepath}/${preData[0].profile}`)) {
                    fs.unlinkSync(`${filepath}/${preData[0].profile}`)
                }
            }
        }
    }
    console.log(data);
    try {
        console.log(data);
        const response = await AdminModal.updateOne(
            req.params,
            {
                $set: data
            }
        )
        const path=`${req.protocol}/${req.get('host')}/src/uploads/`
        res.status(200).json({ message: 'successfull updated', data: response,file_path:path })
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'internal server error' })
    }
}

module.exports = {
    adminLogin,
    registerAdmin,
    generateOtp,
    updateEmail,
    updateAdmin
};