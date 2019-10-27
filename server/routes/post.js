const express = require('express');
const router = express.Router();
const Posts = require('../models/Post');

router.use(express.json())
router.use(express.urlencoded({ extended: true }))


router.post("/postrequest", (req, res) => {
    const post = new Posts(req.body);
    post.save().then(post => {
        res.send({ message: 'post added successfully' })
    }).catch(err => {
        res.status(500).send(err)
    });
})
router.get("/getrequest", (req, res) => {
    const collection = Posts.collection
    collection.find().toArray((err, items) => {
        if (err) {
            console.log(err, "error")
        }
        res.send(items)
    })
    //...
})
router.get("/myrequest:id", (req, res) => {
    let userID = req.params.id
    const collection = Posts.collection
    collection.find({ userID }).toArray((err, items) => {
        if (err) {
            console.log(err, "error")
        }
        res.send(items)
    })
    //...
})

module.exports = router