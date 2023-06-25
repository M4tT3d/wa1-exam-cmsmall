"use strict"

import { fetchGlobal, updateGlobal } from "../models/global.dao.js"
import { titleSchema } from "../utils/schemas.js"

export function getGlobalData(req, res) {
  fetchGlobal(req.params.key)
    .then((data) => {
      res.json(data)
    })
    .catch((error) => {
      res.status(500).json({ error: error })
    })
}

export function updateGlobalData(req, res) {
  const validatedData = titleSchema.safeParse(req.body)
  const errors = []

  if (!validatedData.success) {
    validatedData.error.issues.forEach((issue) => {
      errors.push({ path: issue.path, maessage: issue.message })
    })
    return res.status(422).json({ error: errors })
  }
  updateGlobal(req.params.key, req.body.value)
    .then((data) => {
      res.json(data)
    })
    .catch((error) => {
      res.status(500).json({ error: error })
    })
}
