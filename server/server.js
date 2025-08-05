import dotenv from "dotenv";
dotenv.config({
  path: process.env.NODE_ENV === "production" ? ".env.production" : ".env.development",
});

import express from "express";
import cors from "cors";

import chatbotRoute from "./routes/chat.cohere.route.js";
import paymentRoute from "./routes/stripe.route.js";
import Webhookstripe from './routes/stripe.webhook.route.js';
import cohereRoute from './routes/cohere.iteneray.route.js';

const app = express();

app.use("/api/stripe", Webhookstripe);
app.use(express.json());

app.use(
  cors({
    origin: function (origin, callback) {
      const allowedOrigin = process.env.FRONTEND_URL;
      if (!origin || origin === allowedOrigin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use("/api", cohereRoute);
app.use("/api/chat-suggestions", chatbotRoute);
app.use("/api/payment", paymentRoute);

app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
