"use strict"
import cors from "cors"
import express from "express"
import session from "express-session"
import morgan from "morgan"
import passport from "passport"
import LocalStrategy from "passport-local"
import { getUser } from "./src/models/users.dao.js"
import router from "./src/routes/route.js"

// init express
const app = new express()
const port = process.env.PORT || 3001

app.use(morgan("dev"))
app.use(express.json())

/** Set up authentication strategy to search in the DB a user with a matching password.
 * The user object will contain other information extracted by the method userDao.getUser (i.e., id, username, name).
 **/
passport.use(
  new LocalStrategy(async function verify(username, password, callback) {
    const user = await getUser(username, password)
    if (!user) return callback(null, false, "Incorrect username or password")
    return callback(null, user) // NOTE: user info in the session (all fields returned by userDao.getUser, i.e, id, username, name)
  })
)

// Serializing in the session the user object given from LocalStrategy(verify).
passport.serializeUser(function (user, callback) {
  callback(null, user)
})

// Starting from the data in the session, we extract the current (logged-in) user.
passport.deserializeUser(function (user, callback) {
  // this user is id + email + name
  // if needed, we can do extra check here (e.g., double check that the user is still in the database, etc.)
  // e.g.: return userDao.getUserById(id).then(user => callback(null, user)).catch(err => callback(err, null));

  return callback(null, user) // this will be available in req.user
})

// setup cors
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
}
app.use(cors(corsOptions))
// setup session
app.use(
  session({
    secret: process.env.SESSION_SECRET || "supersecret",
    resave: false,
    saveUninitialized: false,
    cookie:{
      sameSite: "strict",
    }
  })
)
app.use(passport.authenticate("session"))
app.use("/api", router)

export { app, port }
