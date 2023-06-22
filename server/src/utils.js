"use strict"

import db from "./db/connection.js"
import { roles } from "./utils/constants.js"
import { articleSchema } from "./utils/schemas.js"

/** Defining authentication verification middleware **/
export function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }
  return res.status(401).json({ error: "Not authorized" })
}

// Defining authorization verification middleware
export function canEditArticle(req, res, next) {
  const articleId = parseInt(req.params.id, 10)
  if (isNaN(articleId)) {
    return res.status(400).json({ error: "Invalid article id" })
  }
  db.get("SELECT userId FROM article WHERE articleId = ?", [articleId], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err })
    }
    if (!row) {
      return res.status(404).json({ error: "Article not found." })
    }
    if (row.userId === req.user.id || req.user.role === roles.ADMIN) {
      return next()
    }
    return res.status(401).json({ error: "Not authorized" })
  })
}

export function isAdmin(req, res, next) {
  if (req.user.role === roles.ADMIN) {
    return next()
  }
  return res.status(401).json({ error: "Not authorized. You are not an admin" })
}

export function validateArticle(req, res, next) {
  const results = articleSchema.safeParse(req.body)
  const errors = []

  if (!results.success) {
    results.error.issues.forEach((issue) => {
      errors.push({ path: issue.path, maessage: issue.message })
    })
    return res.status(400).json({ error: errors })
  }
  if (results.data.userId === req.user.id || req.user.role === roles.ADMIN) return next()
  return res
    .status(401)
    .json({ error: "Not authorized. You can't create an article for another user" })
}
