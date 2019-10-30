const express = require('express');

const postsRouter = require('./data/seeds/01-posts');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.send('hello new node 23');
})
//get the persons from the data base
server.get('/users', (req, res) => {

    db.find()
    .then(user => {
        if(user === []) {
            res.status(404).json({ message: "did not find users"})
        } else {
            res.json(user)
        }
    })
})

server.use('/api/posts', postsRouter);

server.listen(4000, () => {
  console.log('\n*** Server Running on http://localhost:4000 ***\n');
});
