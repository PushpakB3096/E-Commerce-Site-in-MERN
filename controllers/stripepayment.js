/* start of stripepayment.js */
const stripe = require("stripe")(process.env.SECRETKEY);
const uuid = require("uuid/v4");

exports.makePayment = (req, res) => {
    const { products, token } = req.body;

    let finalAmount = 0;
    products.map(product => {
        finalAmount += product.cost;
    });

    const idempotencyKey = uuid();      //generates a unique key so that the user is not charged more than once
    
    return stripe.customers.create({
        email: token.email,
        source: token.id
    }).then(customer => {
        stripe.charges
          .create(
            {
              amount: finalAmount * 100,
              currency: "INR",
              customer: customer.id,
              receipt_email: token.email,
              description: "Dev Account"
            },
            { idempotencyKey }
          )
          .then((result) => res.status(200).json(result))
          .catch((err) => console.log(err));
    });
};

/* end of stripepayment.js */