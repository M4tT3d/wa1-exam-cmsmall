"use strict"
import sqlite3 from "sqlite3"

const sqlite = sqlite3.verbose()

const db = new sqlite.Database("articles.sqlite", (err) => {
  if (err) throw err
})

export default db
