const User = require("../users/users-model")

function logger(req, res, next) {
  const timestamp = new Date().toLocaleString()
  const method = req.method
  const url = req.originalUrl
  console.log(`[${timestamp}] ${method} to ${url}`)
  next()
}

async function validateUserId(req, res, next) {
  try{
    const user = await User.getById(req.params.id)
    if(!user){
      res.status(404).json({
        message: "User does not exist"
      })
    }else{
      req.user = user
      next()
    }
  }catch(err){
    res.status(500).json({
      message: "Error finding user"
    })
  }
}

async function validateUser(req, res, next) {
  const {name} = req.body
  if(!name || !name.trim()){
    res.status(400).json({
      message: "Name field is required"
    })
  }else{
    req.name = name.trim()
    next()
  }
}

async function validatePost(req, res, next) {
  const {text} = req.body
  if(!text || !text.trim()){
    res.status(400).json({
      message: "Text field is required"
    })
  }else{
    req.text = text.trim()
    next()
  }
}

module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost
}