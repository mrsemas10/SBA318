console.log('running');

const express = require('express');
const app = express();
const PORT = 3000;
const fs = require('fs');

const posts = require('./routes/posts.js');
const users = require('./routes/users.js');

// console.log(posts);
// console.log(users);


const bodyParser = require("body-parser");

// app.use(express.static("./styles"));

// app.engine('views', () => {
//     fs.readFile()
// })

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json({extended: true}));

// =====getting this error: Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
//but not sure what it means=================
app.use('/users', users);
app.use('/posts', posts);

app.get('/', (req, res) => {
    res.send("connected!");
})

app.get("/users", (req, res) => {
    res.json(users);
    // res.send('my family'); this works but not the json
})

app.post("/users", (req, res) => {
    if(req.body.name && req.body.relationshop){
        if(users.find((n) => n.name == req.body.name)) {
            res.json({error: `family member already exists: ${n.name}`})
            return;
        }
        const newMember = {
            id: users[users.length-1].id + 1,
            name: req.body.name,
            relationship: req.body.relationship
        }
        users.push(newMember);
        res.json(users[users.length-1]);
    } else {
        res.json({error: "not enough info"})
    }
})

// TypeError: users.find is not a function
app.get("/users/:id", (req, res, next)=> {
    const user = users.find((n) => n.id == req.params.id);
    if (user)
        res.json(user);
    else next();   
})

app.patch("/users/:id", (req, res, next)=> {
    const user = users.find((n, i) => {
        if (n.id == req.params.id) {
            for (const key in req.body) {
                users[i][key] = req.body[key];
            }
            return true;
        }
    })
    if (user)
        res.json(user);
    else next();
    
})


app.use((req, res) => {
    res.status(404);
    res.json({ error: "not found" });
});

app.listen(PORT, () => {
    console.log(`server is listening on port: ${PORT}`);
})

