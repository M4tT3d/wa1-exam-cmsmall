"use strict"

import { listAllUsers } from "../models/users.dao.js"

export function getAllUsers(req, res) {
  listAllUsers()
    .then((data) => {
      res.json(data)
    })
    .catch((error) => {
      res.status(500).json({ error: error })
    })
}
