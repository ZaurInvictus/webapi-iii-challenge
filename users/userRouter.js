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



router.get('/:id', async (req, res) => {
  try {
    const hub = await Users.getById(req.params.id);

    if (hub) {
      res.status(200).json(hub);
    } else {
      res.status(404).json({ message: 'Hub not found' });
    }
  } catch (error) {
    // log error to server
    console.log(error);
    res.status(500).json({
      message: 'Error retrieving the hub',
    });
  }
});



router.get('/:id/posts', (req, res) => {

});

router.delete('/:id', (req, res) => {

});

router.put('/:id', (req, res) => {

});

//custom middleware

function validateUserId(req, res, next) {

};

function validateUser(req, res, next) {

};

function validatePost(req, res, next) {

};

module.exports = router;


