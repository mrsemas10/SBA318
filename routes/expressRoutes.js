const express = require("express")
const app = express()
const router = express.Router()
const bodyParser = require("body-parser")

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.status(200).send("Family Chores!");
});



module.exports = router;