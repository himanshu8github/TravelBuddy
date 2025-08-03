import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import geminiRoute from "./routes/gemini.route.js";
import chatbotRoute from "./routes/chat.route.js";
import paymentRoute from "./routes/stripe.route.js"

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

//  This mounts the route at /api/generate-itinerary
app.use("/api", geminiRoute);
app.use("/api/chat-suggestions", chatbotRoute);
app.use("/api/payment", paymentRoute);

app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
});
