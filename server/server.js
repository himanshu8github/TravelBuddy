import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";

import chatbotRoute from "./routes/chat.cohere.route.js";
import paymentRoute from "./routes/stripe.route.js";
import Webhookstripe from './routes/stripe.webhook.route.js';
import cohereRoute from './routes/cohere.iteneray.route.js';

const app = express();

app.use("/api/stripe", Webhookstripe);

app.use(express.json());

const allowedOrigins = [
  "http://localhost:5173",
  "https://travelbuddy-1-m1pr.onrender.com",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use("/api/itinerary", cohereRoute);
app.use("/api/chat-suggestions", chatbotRoute);
app.use("/api/payment", paymentRoute);

app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
