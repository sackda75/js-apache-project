const jwt = require('jsonwebtoken')

// Si pas de token dans Headers, Access Denied
module.exports = function (req, res, next) {
  const token = req.header('auth-token')
  if (!token) return res.status(400).send('Access Denied')
  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET)
    req.userId24digits = verified
    next()
  } catch (err) {
    res.status(400).send('Invalid Token')
  }
}
