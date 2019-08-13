const express = require('express')
const Users = require('./userDb')
const Posts =  require('../posts/postDb')

const router = express.Router();


// POST 
router.post('/', (req, res) => {
  Users.insert(req.body)
  .then(user => {
    res.status(201).json(user);
  })
  .catch(error => {
    // log error to server
    console.log(error);
    res.status(500).json({
      message: 'Error adding the hub',
    });
  });
});


// POST BY ID
// router.post('/:id/posts', (req, res) => {
  
// });


//GET USERS
router.get('/', async (req, res) => {
   try {
       const users = await Users.get()
       res.status(200).json({ users })
   } catch (error) {
     console.log(error)
     res.status(500).json({message: 'Error retrieving the users'})
   }
});


// GET USER BY ID
router.get('/:id', [validateUserId], (req, res) => {
   res.status(200).json(req.user)
});


// GET POST BY ID
// router.get('/:id/posts', [validateUserId], (req, res) => {
//   res.status(200).json(req.user)
// });


// DELETE
router.delete('/:id', (req, res) => {
  Users.remove(req.params.id)
  .then(count => {
    if (count > 0) {
      res.status(200).json({ message: 'User was deleted' });
    } else {
      res.status(404).json({ message: 'User could not be found' });
    }
  })
  .catch(error => {
    // log error to server
    console.log(error);
    res.status(500).json({
      message: 'Error removing the hub',
    });
  });
});

// UPDATE
router.put('/:id', (req, res) => {

});



//CUSTOM MIDDLEWARE

// VALIDATE USER ID
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


// VALIDATE USER 
function validateUser(req, res, next) {
  const { name } = req.body;
  if (!name) {
    res.status(400).json({ error: "Include Name" });
    next();
  } else {
    next();
  }
};


// VALIDATE POST
// function validatePost(req, res, next) {

// };

module.exports = router;


