const express = require('express')
const Users = require('./userDb')
const Posts =  require('../posts/postDb')

const router = express.Router();



router.post('/', (req, res) => {
   
});

router.post('/:id/posts', (req, res) => {

});


//GET
router.get('/', async (req, res) => {
   try {
       const users = await Users.get()
       res.status(200).json({ users })
   } catch (error) {
     console.log(error)
     res.status(500).json({message: 'Error retrieving the users'})
   }
});



router.get('/:id', [validateUserId], (req, res) => {
   res.status(200).json(req.user)
});



router.get('/:id/posts', (req, res) => {

});

router.delete('/:id', (req, res) => {

});

router.put('/:id', (req, res) => {

});



//CUSTOM MIDDLEWARE

function validateUserId(req, res, next) {
  const { id } = req.params

  Users.getById(id)
  .then(user => {
    if(user) {
      req.user = user
      next()
    } else {
      res.status(400).json({
        message: "invalid user id" 
      })
    }
  })
};

function validateUser(req, res, next) {

};

function validatePost(req, res, next) {

};

module.exports = router;


