const express = require('express');
const app = express();
const PORT = 3000;

console.log('running');

const posts = require('./routes/posts');
const users = require('./routes/users');


app.listen(PORT, () => {
    console.log(`server is listening on port: ${PORT}`);
})