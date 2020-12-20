const router = require('express').Router()
const verify = require('../security/verifyToken')

// Private route needs token in Headers
router.get('/', verify, (req, res) => {
  res.json({ message: 'Access 🆗', userId: req.userId24digits })
  console.log({ message: 'Access OK', userId: req.userId24digits })
})

module.exports = router
