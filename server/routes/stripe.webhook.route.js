import express from "express";
import Stripe from "stripe";
import { getFirestore } from "firebase-admin/firestore";
import admin from "firebase-admin";
import dotenv from "dotenv";

dotenv.config();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const router = express.Router();

// initialize firebase admin SDK
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
  });
}
const db = getFirestore();

router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    const sig = req.headers["stripe-signature"];
    let event;

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      console.error(" Webhook signature verification failed:", err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const customerEmail = session.customer_email;
      const priceId = session.metadata?.price_id;

      let plan = "Free";
      if (priceId === process.env.BASIC_PLAN_PRICE_ID) plan = "Basic";
      if (priceId === process.env.PRO_PLAN_PRICE_ID) plan = "Pro";
      if (priceId === process.env.ULTIMATE_PLAN_PRICE_ID) plan = "Ultimate";

      try {
        const userRef = db.collection("users").where("email", "==", customerEmail);
        const snapshot = await userRef.get();

        if (snapshot.empty) {
          console.log("⚠️ No user found for:", customerEmail);
        } else {
          snapshot.forEach((doc) => {
            doc.ref.update({ plan });
            console.log(` Updated plan to ${plan} for ${customerEmail}`);
          });
        }
      } catch (err) {
        console.error(" Firestore update error:", err);
      }
    }

    res.status(200).json({ received: true });
  }
);

export default router;
