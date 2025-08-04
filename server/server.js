import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import geminiRoute from "./routes/gemini.route.js";
import chatbotRoute from "./routes/chat.route.js";
import paymentRoute from "./routes/stripe.route.js"
import Webhookstripe from './routes/stripe.webhook.route.js';

dotenv.config();

const app = express();
app.use(
  cors({
    origin: process.env.FRONTEND_URL, // only allow your frontend domain
    credentials: true,
  })
);


app.use("/api/stripe", Webhookstripe);


app.use(express.json());

//  This mounts the route at /api/generate-itinerary
app.use("/api", geminiRoute);
app.use("/api/chat-suggestions", chatbotRoute);
app.use("/api/payment", paymentRoute);


app.get("/", (req, res) => {
  res.send("API is running...");
});

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/dist", "index.html"));
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
});
