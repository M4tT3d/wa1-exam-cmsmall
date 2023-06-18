"use strict"
/* Data Access Object (DAO) module for accessing users data */
import { scrypt, timingSafeEqual } from "crypto"
import db from "../db/connection.js"

// This function is used at log-in time to verify username and password.
export function getUser(email, password) {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM user WHERE email=?"
    db.get(sql, [email], (err, row) => {
      if (err) {
        reject(err)
      } else if (row === undefined) {
        resolve(false)
      } else {
        const user = {
          id: row.id,
          username: row.email,
          name: row.name,
          surname: row.surname,
          role: row.role,
        }

        // Check the hashes with an async call, this operation may be CPU-intensive (and we don't want to block the server)
        scrypt(password, row.salt, 32, function (err, hashedPassword) {
          // WARN: it is 64 and not 32 (as in the week example) in the DB
          if (err) reject(err)
          if (!timingSafeEqual(Buffer.from(row.hash, "hex"), hashedPassword))
            // WARN: it is hash and not password (as in the week example) in the DB
            resolve(false)
          else resolve(user)
        })
      }
    })
  })
}
