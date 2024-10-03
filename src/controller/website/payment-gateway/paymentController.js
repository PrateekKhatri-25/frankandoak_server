const stripe  = require('stripe')(process.env.STRIPE_SECRET_KEY)

const purchase = async (req, res) => {
    try {
        console.log(req.body);
        const data=req.body

        const lineItems = data.map((item) => (
            {
                price_data: {
                    currency: 'inr',
                    product_data: {
                        name: item.product.name
                    },
                    unit_amount: item.product.price * 100
                },
                quantity: item.quantity
            }
        ));

        const customer = await stripe.customers.create({
            name: 'Prateek',
            address: {
                line1: 'Hatti ram ka oda,Dau ji mandir road',
                line2: 'In front of Kabra Provision Store,Prem Nivas',
                city: 'Jodhpur',
                state: 'Rajasthan',
                postal_code: '342001',
                country: 'in',
            }
        });

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: 'http://localhost:3000/success',
            cancel_url: 'http://localhost:3000/cancel',
            customer: customer.id
        });

        console.log(session, customer);

        res.status(200).json({ message: 'payment successfull', session: session.id })
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'internal server error' })
    }
};

module.exports = {
    purchase
};