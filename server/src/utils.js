"use strict"

import db from "./db/connection.js"
import { roles } from "./utils/constants.js"

/** Defining authentication verification middleware **/
export function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }
  return res.status(401).json({ error: "Not authorized" })
}

// Defining authorization verification middleware
export function isAuthorized(req, res, next) {
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
