"use strict"
import dotenv from "dotenv"
import { app, port } from "./app.js"

dotenv.config()
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
