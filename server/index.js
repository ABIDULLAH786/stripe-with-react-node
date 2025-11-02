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


app.post("/api/stripe/create-checkout-session", async (req, res) => {
  const { product } = req.body
  let line_item;
  if (!product) {
    line_item = {
      price_data: {
        currency: "usd",
        product_data: {
          name: "React Stripe Checkout",
        },
        unit_amount: 100 * 100,
      },
      quantity: 1,
    };
  } else {
    console.log({product})
    line_item = {
      price_data: {
        currency: "usd",
        product_data: {
          name: product.title,
          images: [product.image],
        },
        unit_amount: product.price * 100,
      },
      quantity: 1,
    };
  }
  console.log({line_item})
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [line_item],
    mode: "payment",
    success_url: `${process.env.FE_CLIENT_URL}/success`,
    cancel_url: `${process.env.FE_CLIENT_URL}/cancel`,
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

app.post("/api/stripe/create-multi-checkout-session", async (req, res) => {
  try {
    const { products } = req.body;

    if (!products || products.length === 0) {
      return res.status(400).json({ error: "No products selected" });
    }


    const line_items = products.map((p) => ({
      price_data: {
        currency: "usd",
        product_data: { name: p.title, images: [p.image] },
        unit_amount: p.price * 100,
      },
      quantity: p.quantity,
    }));
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: `${process.env.FE_CLIENT_URL}/success`,
      cancel_url: `${process.env.FE_CLIENT_URL}/cancel`,
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});


const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log("server is running on: " + `https:localhost:${PORT}`)
})
