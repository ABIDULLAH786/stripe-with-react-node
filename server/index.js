const cors = require("cors")
const express = require("express")
require("dotenv").config();
const app = express()
const uuid = require("uuid")
// TODO: add a stipe key
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)


app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
  res.send("hello world, It is working fine")
})

app.post("/payment", (req, res) => {
  const { product, token } = req.body
  console.log({ product, token })

  const idempontencyKey = uuid()
  return stripe.customers.create({
    email: token.email,
    source: token.id
  }).then(customer => {
    stripe.charges.create({
      amount: product.price * 100,
      currency: "usd",
      customer: customer.id,
      receipt_email: token.email,
      description: `Purchased the ${product.name}`,
      shipping: {
        name: token.card.name,
        address: {
          line1: token.card.address_line1,
          line2: token.card.address_line2,
          city: token.card.address_city,
          country: token.card.address_country,
          postal_code: token.card.address_zip
        }
      }
    }, { idempontencyKey })
  }).then(result => res.status(200).json(result))
    .catch(err => console.log(err))
})

app.post("/payments/create", async (req, res) => {
  const { total } = req.body
  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "usd",
  })
  res.status(201).send({
    clientSecret: paymentIntent.client_secret,
  })
})

app.post("/api/stripe/create-checkout-session", async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "React Stripe Checkout",
          },
          unit_amount: 100 * 100,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${process.env.FE_CLIENT_URL}/success`,
    cancel_url: `${process.env.FE_CLIENT_URL}/success`,
  });

  res.json({ id: session.id, url: session.url });
});


app.post("/api/stripe/create-subscription-session", async (req, res) => {
  // plan: "introduction" | "intermediate" | "advance"
  try {
    const { plan, email } = req.body
    if (!plan)
      return res.status(400).json({ error: "Missing plan" });

    // Map your Stripe Price IDs to plan names
    const prices = {
      introduction: "price_1SOtP9Cq0KFgZIAaMSwftTYT",
      intermediate: "price_1SOtfuCq0KFgZIAawFfs3qn2",
      advance: "price_1SOtmyCq0KFgZIAa32E7S0lq",
    };

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "subscription",
      line_items: [
        {
          price: prices[plan],
          quantity: 1,
        },
      ],
      success_url: `${process.env.FE_CLIENT_URL}/success`,
      cancel_url: `${process.env.FE_CLIENT_URL}/success`,
    });

    res.json({ id: session.id, url: session.url, session });
  } catch (error) {
    console.error({ error });
    res.status(500).json({ error: error.message });
  }
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log("server is running on: " + `https:localhost:${PORT}`)
})
