const User = require('../models/UserModel')
const { registerValidation, loginValidation } = require('../security/validation')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

module.exports.readUser = async (req, res) => {
  try {
    const allUsers = await User.find()
    res.send(allUsers)
    console.log(allUsers)
  } catch (err) {
    res.json(err)
  }
}

module.exports.readOneUser = async (req, res) => {
  console.log(req.params.userId)
  try {
    const oneUser = await User.findById(req.params.userId)
    res.json(oneUser)
    console.log(oneUser)
  } catch (err) {
    res.json({ message: '❌ Incorrect _id ⬇️', _id: err.value })
  }
}

module.exports.createUser = async (req, res) => {
  const { error } = registerValidation(req.body)
  if (error) return res.status(400).send(error.details[0].message)
  
  const emailExist = await User.findOne({ email: req.body.email })
  if (emailExist) return res.status(400).send('Email already exist')

  const salt = await bcrypt.genSalt(10)
  const hashPassword = await bcrypt.hash(req.body.password, salt)

  const user = new User({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: hashPassword
  })
  try {
    const savedUser = await user.save()
    res.send({ message: 'new user created ⬇️', savedUser })
    console.log({ user: user._id })
    console.log({ message: 'new user created ⬇️', savedUser })
  } catch (err) {
    res.status(400).send(err.message)
  }
}

module.exports.loginUser = async (req, res) => {
  const { error } = loginValidation(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  const user = await User.findOne({ email: req.body.email })
  if (!user) return res.status(400).send('Email is not found')
  console.log(user)

  const validPass = await bcrypt.compare(req.body.password, user.password)
  if (!validPass) return res.status(400).send('Invalid password')

  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET)
  res.header('auth-token', token).send({ message: 'Logged in 🆗', user, token })
  console.log({ message: 'Logged in OK', user, token })
}

module.exports.updateUser = async (req, res) => {
  console.log(req.params.userId)
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.userId, req.body)
    res.json({ mesage: 'Post updated. How it was before ⬇️', updatedUser })
    console.log('Post updated. How it was before ➡️ ', updatedUser)
  } catch (err) {
    res.json({ message: '❌ Incorrect _id ⬇️', _id: err.value })
  }
}

module.exports.deleteUser = async (req, res) => {
  console.log(req.params.postId)
  try {
    const deletedPost = await User.findByIdAndDelete(req.params.postId)
    res.json({ mesage: 'Post deleted ⬇️', deletedPost })
    console.log('Post deleted ➡️ ', deletedPost)
  } catch (err) {
    res.json({ message: '❌ Incorrect _id ⬇️', _id: err.value })
  }
}
