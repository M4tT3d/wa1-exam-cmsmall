"use strict"
import { Router } from "express"
import {
  createArticle,
  deleteArticle,
  getAllArticles,
  getArticleByUserId,
  getArticles,
  updateArticle,
} from "../controllers/article.js"
import { createSession, deleteSession, getCurrentUser } from "../controllers/auth.js"
import { getGlobalData, updateGlobalData } from "../controllers/global.js"
import { canAccessArticle, canEditArticle, isAdmin, isLoggedIn, validateArticle } from "../utils.js"

const router = Router()

// AUTH routes
// used for login
router.post("/sessions", createSession)
// used for logout
router.delete("/sessions/current", isLoggedIn, deleteSession)
// This route checks whether the user is logged in or not.
router.get("/sessions/current", getCurrentUser)

//Articles routes
router.get("/articles/:id", canAccessArticle, getArticles)
router.get("/articles", getArticles)
router.get("/all-articles", isLoggedIn, isAdmin, getAllArticles)
router.post("/articles", isLoggedIn, validateArticle, createArticle)
router.get("/user/articles", isLoggedIn, getArticleByUserId)
router.patch("/articles/:id", isLoggedIn, canEditArticle, validateArticle, updateArticle)
router.delete("/articles/:id", isLoggedIn, canEditArticle, deleteArticle)

// Global routes
router.get("/globals/:key", getGlobalData)
router.patch("/globals/:key", isLoggedIn, isAdmin, updateGlobalData)
export default router
