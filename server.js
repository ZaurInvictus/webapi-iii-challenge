const express = require('express');
const userRouter = require('./users/userRouter.js')
const postsRouter = require('./posts/postRouter.js')
const server = express();

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});

// ROUTER
server.use('/api/users', userRouter )

// CUSTOM MIDDLEWARE // 
function logger(req, res, next) {
  console.log(`${req.method}`)
  next()
};

module.exports = server;
