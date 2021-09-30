const express = require('express')
const {
  logger,
  validatePost,
  validateUser,
  validateUserId
} = require("../middleware/middleware")

const router = express.Router()

router.get('/', (req, res) => {

})

router.get('/:id', validateUserId, (req, res) => {

})

router.post('/', validateUser, (req, res) => {

})

router.put('/:id', validateUserId, validateUser, (req, res) => {

})

router.delete('/:id', validateUserId, validateUser, (req, res) => {

})

router.get('/:id/posts', validateUserId, (req, res) => {

})

router.post('/:id/posts', validateUserId, (req, res) => {

})

module.exports = router
