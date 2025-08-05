import express from "express";
import  {chatWithCohere}  from "../controller/chat.cohere.controller.js";

const router = express.Router();

router.post("/", chatWithCohere);

export default router;



