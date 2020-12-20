const Comment = require('../models/CommentModel')

module.exports.readComment = async (req, res) => {
  try {
    const allComments = await Comment.find()
    res.json(allComments)
    console.log({ message: 'All the comments ⬇️ ', allComments })
  } catch (err) {
    res.json(err)
  }
}

module.exports.readOneComment = async (req, res) => {
  console.log(req.params.commentId)
  try {
    const oneComment = await Comment.findById(req.params.commentId)
    res.json(oneComment)
    console.log(oneComment)
  } catch (err) {
    res.json({ message: '❌ Incorrect _id ⬇️', _id: err.value })
  }
}

module.exports.createComment = async (req, res) => {
  console.log(req.body)
  const comment = new Comment({
    title: req.body.title,
    description: req.body.description
  })
  try {
    const savedComment = await comment.save()
    res.json({ mesage: 'Comment created ⬇️ ', savedComment })
    console.log({ message: 'new comment created ⬇️', savedComment })
  } catch (err) {
    res.status(400).send(err.message)
  }
}

module.exports.updateComment = async (req, res) => {
  console.log(req.params.commentId)
  try {
    const updatedComment = await Comment.findByIdAndUpdate(req.params.commentId, req.body)
    res.json({ mesage: 'Post updated. How it was before ⬇️ ', updatedComment })
    console.log('Post updated. How it was before ➡️ ', updatedComment)
  } catch (err) {
    res.json({ message: '❌ Incorrect _id ⬇️ ', _id: err.value })
  }
}

module.exports.deleteComment = async (req, res) => {
  console.log(req.params.commentId)
  try {
    const deletedComment = await Comment.findByIdAndDelete(req.params.commentId)
    res.json({ message: 'Post deleted ⬇️ ', deletedComment })
    console.log({ message: 'Post deleted ⬇️ ', deletedComment })
  } catch (err) {
    res.json({ message: '❌ Incorrect _id ⬇️ ', _id: err.value })
  }
}
