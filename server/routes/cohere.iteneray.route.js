import express from "express";
import { createItinerary } from "../controller/cohere.controller.js";

const router = express.Router();

router.post("/createitinerary", createItinerary);

export default router;
