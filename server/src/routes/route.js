"use strict"
import { Router } from "express"
import { createSession, deleteSession, getCurrentUser } from "../controllers/auth.js"

const router = Router()

// AUTH routes
// used for login
router.post("/sessions", createSession)
// used for logout
router.delete("/sessions/current", deleteSession)
// This route checks whether the user is logged in or not.
router.get("/sessions/current", getCurrentUser)
export default router
