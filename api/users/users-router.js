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
  if()
  res.json(req.user)
})

router.post('/', validateUser, (req, res, next) => {

})

router.put('/:id', validateUserId, validateUser, (req, res, next) => {

})

router.delete('/:id', validateUserId, validateUser, (req, res, next) => {

})

router.get('/:id/posts', validateUserId, (req, res, next) => {

})

router.post('/:id/posts', validateUserId, (req, res, next) => {

})

router.use((err, req, res, next) => { //eslint-disable-line
  res.status(err.status || 500).json({
    message: "your code is in pain",
    err: err.message,
    stack: err.stack
  })
})

module.exports = router
