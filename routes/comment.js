const router = require('express').Router()
const commentController = require('../controllers/commentController')

router.get('/', commentController.readComment)
router.get('/:commentId', commentController.readOneComment)
router.post('/register', commentController.createComment)
router.patch('/:commentId', commentController.updateComment)
router.delete('/:commentId', commentController.deleteComment)

module.exports = router
