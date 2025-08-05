import express from "express";
import { generateItinerary } from "../controller/itenerary.controller.js";
const router = express.Router();

router.post("/generate-itinerary", generateItinerary);
// router.post("/generate", generateItinerary);

export default router;
