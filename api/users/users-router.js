const express = require('express')
const User = require("./users-model")
const Post = require("../posts/posts-model")
const {
  logger,
  validatePost,
  validateUser,
  validateUserId
} = require("../middleware/middleware")

const router = express.Router()

router.get('/', (req, res, next) => {
  User.get()
    .then(users => {
      res.json(users)
    })
    .catch(next)
})

router.get('/:id', validateUserId, (req, res, next) => {
  res.json(req.user)
})

router.post('/', validateUser, (req, res, next) => {
  User.insert({name: req.name})
    .then(newUser => {
      res.status(201).json(newUser)
    })
    .catch(next)
})

router.put('/:id', validateUserId, validateUser, (req, res, next) => {
  User.update(req.params.id, {name: req.name})
  .then(updatedUser => {
    res.json(updatedUser)
  })
  .catch(next)
})

router.delete('/:id', validateUserId, validateUser, async (req, res, next) => {
  try{
    await User.remove(req.params.id)
    res.json(req.user)
  }catch(err){
    next(err)
  }
})

router.get('/:id/posts', validateUserId, async (req, res, next) => {
  try{
    const result = await User.getUserPosts(req.params.id)
    res.json(result)
  }catch(err){
    next(err)
  }
})

router.post('/:id/posts', validateUserId, async (req, res, next) => {
  try{
    const result = await Post.insert({
      user_id: req.params.id,
      text: req.text
    })
    res.status(201).json(result)
  }catch(err){
    next(err)
  }
})

router.use((err, req, res, next) => { //eslint-disable-line
  res.status(err.status || 500).json({
    message: "your code is in pain",
    err: err.message,
    stack: err.stack
  })
})

module.exports = router
