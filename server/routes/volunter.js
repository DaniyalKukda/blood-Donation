const express = require('express');
const router = express.Router();
const Volunter = require('../models/Volunter');

router.use(express.json())
router.use(express.urlencoded({ extended: true }))


router.post("/postvolunter", (req, res) => {
    const volunter = new Volunter(req.body);
    volunter.save().then(volunter => {
        res.send({ message: 'volunter added successfully' })
    }).catch(err => {
        res.status(500).send(err)
    });
})
router.get("/getvolunter:id", (req, res) => {
    let postID = req.params.id
    const collection = Volunter.collection
    collection.find({ postID }).toArray((err, items) => {
        if (err) {
            console.log(err, "error")
        }
        res.send(items)
    })
    //...
})

module.exports = router