const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.get("/users", async(req, res) => {
    try {
        const users = await User.find();
        res.json(users)
    } catch (err) {
        res.json({ message: err });
    }
});
/*
router.post("/users", async(req, res) => {
    console.log(req.body);
    const user = new User({
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName
    })
    try {
        const savedUser = await user.save();
        res.json(savedUser);
    } catch (err) {
        res.json({ message: err });
    }
});
*/

router.get("/users/:id", async(req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.json(user);
    } catch (err) {
        res.json({ message: err });
    }
})

router.patch("/users/:id", async(req, res) => {
    try {
        const updateUser = await User.updateOne({ _id: req.params.id }, { $set: { title: req.body.firstName } });
        res.json(updateUser);
    } catch (err) {
        res.json({ message: err });
    }
});

router.delete("/users/:id", async(req, res) => {
    try {
        const removeUser = await User.remove({ _id: req.params.id });
        res.json(removeUser);
    } catch (err) {
        res.json({ message: err });
    }
});





module.exports = router;