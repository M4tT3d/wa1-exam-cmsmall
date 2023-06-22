"use strict"
import db from "../db/connection.js"

export function fetchGlobal(key) {
  return new Promise((resolve, reject) => {
    db.get(`SELECT value FROM global WHERE type = ?`, [key], (error, row) => {
      if (error) reject(error)
      if (!row) reject("No global data found")
      resolve(row)
    })
  })
}

export function updateGlobal(key, data) {
  return new Promise((resolve, reject) => {
    db.run(`UPDATE global SET value = ? WHERE type = ?`, [data, key], (error) => {
      if (error) reject(error)
      resolve({ message: "Global data updated" })
    })
  })
}
