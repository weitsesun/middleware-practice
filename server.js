const express = require('express')

const PORT = 3000

let app = express()

app.use(loggingMiddleware)

app.get('/', (req, res) => {
  res.send('Home page')
})

app.get('/user', authorizeUsersAccess, (req, res) => {
  console.log(req.admin)
  res.send('User Page')
})
//1. What is middleware?
//    - middleware function is executed when server received a request and will
//      be invoked before the controller sends the response
//    - middleware function has access to the req and res variables
//    - Has third parameter "next"

function loggingMiddleware(req, res, next) {
  console.log(`${new Date().toISOString()}: ${req.originalUrl}`)
  next()
}

function authorizeUsersAccess(req, res, next) {
  if(req.query.admin === 'true') {
    req.admin = true
    return next()
  } else {
    res.send('ERROR: You must be an admin')
  }
  console.log('should return next')
}

app.listen(PORT, () => {
  console.log(`Server is now listening on port ${PORT}`)
})