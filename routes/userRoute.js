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


router.post("/users", async(req, res) => {
    console.log(req.session.userID);
    console.log(req.body.firstName);
    try {
        const updateUser = await User.updateOne({ _id: req.session.userID }, { $set: { firstName: req.body.firstName } });
        res.json(updateUser);
    } catch (err) {
        res.json({ message: err });
    }
});

router.get("/users/history", async(req, res) => {
    console.log(req.session.userID);
    try {
        const user = await User.findOne({ _id: req.session.userID });
        console.log(user.spinHistory);
        res.json(user.spinHistory);
    } catch (err) {
        res.json({ message: err });
    }
});

router.get("/users/data", async(req, res) => {
    console.log(req.session.userID);
    try {
        const user = await User.findOne({ _id: req.session.userID });
        console.log(user);
        res.json(user);
    } catch (err) {
        res.json({ message: err });
    }
});



module.exports = router;