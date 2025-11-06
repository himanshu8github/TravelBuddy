import Stripe from "stripe";
import dotenv from 'dotenv'; 
dotenv.config();  

// console.log("Stripe Secret Key Loaded:", process.env.STRIPE_SECRET_KEY);

// if (!process.env.STRIPE_SECRET_KEY?.startsWith("sk_test_")) {
//   throw new Error(" Use only test keys for Stripe in development!");
// }

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const createCheckoutSession = async (req, res) => {
  const { plan, email } = req.body;

  if (!plan || !email) {
    return res.status(400).json({ error: "Plan and email are required" });
  }

  const formatPlan = (p) => p.charAt(0).toUpperCase() + p.slice(1).toLowerCase();
  const normalizedPlan = formatPlan(plan);

  let priceId;

  switch (normalizedPlan) {
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
      customer_email: req.body.email,
      success_url: `${process.env.FRONTEND_URL}/dashboard?checkout=success`,
       cancel_url: `${process.env.FRONTEND_URL}/dashboard?checkout=cancel`,
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error("Stripe Error:", error);
    res.status(500).json({ error: "Failed to create Stripe session" });
  }
};

export default createCheckoutSession;
