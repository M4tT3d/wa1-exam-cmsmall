"use strict"

import { fetchGlobal, updateGlobal } from "../models/global.dao.js"

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
  updateGlobal(req.params.key, req.body.value)
    .then((data) => {
      res.json(data)
    })
    .catch((error) => {
      res.status(500).json({ error: error })
    })
}
