const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const User = require("../models/user");

const saltRounds = 12;

/* signup, login, logout */


router.get("/calculatePrize", async(req, res) => {
    let stopAt = (Math.floor((Math.random() * 8)))
    console.log(req.session.userID, " won: ", stopAt);
    try {
        const updateUser = await User.updateOne({ _id: req.session.userID }, { $push: { spinHistory: stopAt.toString() } });
    } catch (err) {
        console.log(err);
    }
    res.json(stopAt);
});

module.exports = router;