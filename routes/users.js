const express = require("express")
const app = express()
const router = express.Router()

const users = require("../data/users");

const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json({extended: true}));


router.get("/users", (req, res) => {
    res.json(users);
    // res.send('my family');
})

router.post("/users", (req, res) => {
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


router.get("/users/:id", (req, res, next)=> {
    const user = users.find((n) => n.id == req.params.id);
    if (user)
        res.json(user);
    else next();   
})

router.patch("/users/:id", (req, res, next)=> {
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

router.delete("/users/:id", (req, res, next)=> {
    const user = users.find((n, i) => {
        if (n.id == req.params.id) {
            users.splice(i, 1);
            return true;
        }
    })
    if (user)
        res.json(user);
    else next();
    
})

module.exports = router;
