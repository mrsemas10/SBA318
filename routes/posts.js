const express = require("express")
const app = express()
const router = express.Router()

const users = require("../data/posts");

const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json({extended: true}));

router.get("/posts", (req, res) => {
    res.send("chores");
})

router.post("/posts", (req, res)=> {
    if(req.body.task && req.body.description) {
        if(posts.find((t) => t.task == req.body.task)) {
            res.json({error: `task already exists: ${t.task}`})
            return;
        }
        const newTask = {
            id: posts[posts.length-1].id + 1,
            task: req.body.task,
            description: req.body.description,
        }
        posts.push(newTask)
        res.json(posts[posts.length-1]);
    } else {
        res.json({error: "not enough info"});
    }
})

router.post("/posts", (req, res)=> {
    res.json(posts);
})


router.get("/posts/:id", (req, res, next)=> {
    const post = posts.find((t) => t.id == req.params.id);
    if (post)
        res.json(post);
    else next();   
})

router.patch("/posts/:id", (req, res, next)=> {
    const post = posts.find((t, i) => {
        if (t.id == req.params.id) {
            for (const key in req.body) {
                posts[i][key] = req.body[key];
            }
            return true;
        }
    })
    if (post)
        res.json(post);
    else next();
    
})

router.delete("/posts/:id", (req, res, next)=> {
    const post = posts.find((t, i) => {
        if (t.id == req.params.id) {
            posts.splice(i, 1);
            return true;
        }
    })
    if (post)
        res.json(post);
    else next();
    
})



module.exports = router;