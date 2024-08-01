const express = require('express');
const app = express();
const PORT = 3000;

console.log('running');

const posts = require('./routes/posts.js');
const users = require('./routes/users.js');

const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json({extended: true}));

app.use('/users', users);
app.use('/posts', posts);

app.get('/', (req, res) => {
    res.send("Work in Progress!");
})




app.listen(PORT, () => {
    console.log(`server is listening on port: ${PORT}`);
})

