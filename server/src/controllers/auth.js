"use strict"
import passport from "passport"

export function createSession(req, res, next) {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err)
    if (!user) {
      // display wrong login messages
      return res.status(401).json({ error: info })
    }
    // success, perform the login and extablish a login session
    req.login(user, (err) => {
      if (err) return next(err)

      // req.user contains the authenticated user, we send all the user info back
      // this is coming from userDao.getUser() in LocalStratecy Verify Fn
      return res.json(req.user)
    })
  })(req, res, next)
}

export function deleteSession(req, res) {
  req.logout(() => {
    res.status(200).json({ message: "Logout successful" })
  })
}

export function getCurrentUser(req, res) {
  if (req.isAuthenticated()) return res.status(200).json(req.user)
  return res.status(401).json({ error: "Not authenticated" })
}
