"use strict"
import cors from "cors"
import express from "express"
import morgan from "morgan"
import router from "./src/routes/route.js"

// init express
const app = new express()
const port = process.env.PORT || 3001

app.use(morgan("dev"))
app.use(express.json())

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
}
app.use(cors(corsOptions))
app.use("/api", router)

export { app, port }
