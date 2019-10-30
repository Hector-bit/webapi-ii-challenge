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
    dataBase.findById(req.params.id)
    .then(post => {
        if(post){
            res.status(201).json(post.comment)
        } else {
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        }
    })
})

module.exports = router;