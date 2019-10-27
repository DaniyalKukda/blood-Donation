const express = require('express');
const router = express.Router();
const Users = require('../models/Users');

router.use(express.json())
router.use(express.urlencoded({extended:true}))

router.get("/get", (req,res)=>{
       res.send({message: 'get data successfully'})
})
router.post("/signup", (req,res)=>{
    const user = new Users(req.body);
    user.save().then(newUser => {
        res.send({message: 'User added successfully'})
    }).catch(err => {
        res.status(500).send(err)
    });
})

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await Users.findOne({ email })

    if (!user) {
        return res.send({ message: "We didn't found this user!" });
    }

    const isAuthenticated = await user.comparePassword(password);

    if (!isAuthenticated) {
        return res.send({ message: "Invalid Password!" });
    }

    const token = await user.generateToken();
    res.header("x-auth", token);
    res.send(user)
})

// protected route
router.post("/logout", (req, res) => {
    const token = req.header("x-auth");

    Users.removeToken(token)
        .then(() => res.send({message: "Token Removed Successfully"}))
        .catch(err => res.send(err))
})

router.get("/getUsers", (req, res) => {
    const collection = Users.collection
    collection.find().toArray((err, items) => {
        if (err) {
            console.log(err, "error")
        }
        res.send(items)
    })
    //...
})

module.exports = router