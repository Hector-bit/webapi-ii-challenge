const express = require('express');

const router = express.Router();

const dataBase = require('../data/db');

router.post('/posts', (req, res) => {
    dataBase.insert(req.body)
    .then(post => {
        if(post){
            res.status(201).json('post was added')        
        } else {
            res.status(404).json(res.status(400).json({ errorMessage: "Please provide title and contents for the post." }))
        }
    })
    .catch(error => {
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
    })
})

router.post('/posts/:id/comments', (req, res) => {
    dataBase.insert(req.body)
    .then(post => {
        if(post){
            res.status(201).json('comment was added')
        } else {
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        }
    })
    .catch(error => {
        res.status(500).json({ error: "There was an error while saving the comment to the database" })
    })
})

router.get('/posts', (req, res) => {
    dataBase.find(req.body)
    .then(post => {
        res.status(201).json(post)
    })
    .catch(error => res.status(500).json({ error: "The posts information could not be retrieved." }))
})

router.get('/posts/:id', (req, res) => {
    dataBase.findById(req.params.id)
    .then(post => {
        if(post){
            res.status(201).json(post)
        } else {
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        }
    })
    .catch(error => res.status(500).json({ error: "The post information could not be retrieved." }))
})

router.get(`/posts/:id/comments`, (req, res) => {
    dataBase.findPostComments(req.params.id)
    .then(post => {
        if(post){
            res.status(201).json(post)
        } else {
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        }
    })
})

router.delete('/posts/:id', (req, res) => {
    dataBase.remove(req.params.id)
    .then(post => {
        if(post){
            res.status(201).json({ message: `Post with ID ${req.params.id} was deleted` })
        } else {
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        }
    })
    .catch(error => res.status(404).json({ message: "The post with the specified ID does not exist." }))
})

// router.post('/posts/:id', (req, res) => {
//     dataBase.update(req.params.id)
//     .then(post => {
//         if(post){
//             res.status(201).json({ message: `Post with ID ${req.params.id} was modified` })
//         } else {
//             res.status(404).json({ message: "The post with the specified ID does not exist." })
//         }
//     })
//     .catch(error => res.status(404).json({ message: "The post with the specified ID does not exist." }))
// })

router.put('/posts/:id', (req, res) => {
    const { title, contents } = req.body;
  
    if (!title || !contents) {
      res
        .status(400)
        .json({ errorMessage: 'Please provide name and bio for the user.' });
    } else {
      dataBase.update(req.params.id, req.body)
        .then(updated => {
          if (updated) {
            res.status(200).json(updated);
          } else {
            res
              .status(404)
              .json({
                message: 'The post with the specified ID does not exist.',
              });
          }
        })
        .catch(() => {
          res.status(500).json({
            errorMessage: 'The user information could not be modified.',
          });
        });
    }
  });

module.exports = router;