const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');

router.use(express.json())
router.use(express.urlencoded({ extended: true }))


router.post("/commentPost", (req, res) => {
    const comment = new Comment(req.body);
    comment.save().then(comment => {
        res.send({ message: 'comment added successfully' })
    }).catch(err => {
        res.status(500).send(err)
    });
})
router.get("/getcomment:id", (req, res) => {
    let postID = req.params.id
    const collection = Comment.collection
    collection.find({ postID }).toArray((err, items) => {
        if (err) {
            console.log(err, "error")
        }
        res.send(items)
    })
    //...
})

module.exports = router