const router = require('express').Router()
const authController = require('../controllers/authController')

router.get('/', authController.readUser)
router.get('/:userId', authController.readOneUser)
router.post('/register', authController.createUser)
router.post('/login', authController.loginUser)
router.patch('/:userId', authController.updateUser)
router.delete('/:postId', authController.deleteUser)

module.exports = router
