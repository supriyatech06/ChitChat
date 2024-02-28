import express from "express"
import protectRoute from "./protectRoute.js"
import { sendMessage } from "../controllers/message.controllers.js"

const router= express.Router()

router.post("/send/:id",protectRoute,sendMessage)

export default router;