import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const createCheckoutSession = async (req, res) => {
  const { plan } = req.body;

  let priceId;

  switch (plan) {
    case "Basic":
      priceId = process.env.BASIC_PLAN_PRICE_ID;
      break;
    case "Pro":
      priceId = process.env.PRO_PLAN_PRICE_ID;
      break;
    case "Ultimate":
      priceId = process.env.ULTIMATE_PLAN_PRICE_ID;
      break;
    default:
      return res.status(400).json({ error: "Invalid plan selected" });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: "http://localhost:5173/success",
      cancel_url: "http://localhost:5173/cancel",
    });

    res.json({ url: session.url });
  } catch (error) {
    res.status(500).json({ error: "Failed to create Stripe session" });
  }
};

export default createCheckoutSession;
