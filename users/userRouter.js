const express = require('express')
const Users = require('./userDb')
const Posts =  require('../posts/postDb')

const router = express.Router();


// POST 
router.post('/', validateUser, (req, res) => {
  Users.insert(req.body)
  .then(user => {
    res.status(201).json(user);
  })
  .catch(error => {
    res.status(500).json({
      message: 'Internal server error',
    });
  });
});


// POST BY ID 
router.post('/:id/posts', validateUserId, (req, res) => {
 const newPost = {...req.body, user_id: req.params.id }

  Posts.insert(newPost)
  .then(post => {
     res.status(201).json(post)
  })
  .catch((error) => {
    res.status(500).json({
      message: 'Internal server error'
    })
  })

});




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


//GET POST BY ID
router.get('/:id/posts', [validateUserId], (req, res) => {
  const id = req.params.id

  Users.getUserPosts(id)
  .then(post => {
    res.status(200).json(post)
  })
  .catch(error => {
    res.status(500).json({
      error: 'Internal server error'
    })
  })
})


// DELETE
router.delete('/:id',  validateUserId, (req, res) => {
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
  Users.update(req.params.id, req.body)
  .then(user => {
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'User could not be found' });
    }
  })
  .catch(() => {
    res.status(500).json({
      message: 'Error updating the user',
    })
  })
})



// CUSTOM MIDDLEWARE

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
  if (req.body === undefined || Object.keys(req.body).length === 0) {
    res.status(400).json({
      message: "missing user data"
    });
    return
  }

  if (req.body.name === undefined) {
    res.status(400).json({
      message: "missing required name field"
    })
    return
  }

  next()
}


  // VALIDATE POST
 function validatePost(req, res, next) {
   if(req.body === undefined || Object.keys(req.body).length === 0) {
     res.status(400)({
       message: "missing post data"
     })
     return
   }

   if(req.body.text === undefined) {
     res.status(400).json({
       message: "missing required text field"
     })
     return
   }

  next()
 };

module.exports = router;


