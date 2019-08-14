const express = require('express');
const userRouter = require('./users/userRouter.js')
const postRouter = require('./posts/postRouter.js')

const server = express()
server.use(express.json())

// CUSTOM MIDDLEWARE PLUGGING IN
server.use(logger)

// ROUTER
server.use('/api/users', userRouter )
server.use('/api/users', postRouter )

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});

// CUSTOM MIDDLEWARE // 
function logger(req, res, next) {
  console.log(`[${new Date().toISOString()} ${req.method} to ${req.url}]`)
  next()
}


module.exports = server;
