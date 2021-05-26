const express = require("express");
const router = express.Router();
const User = require("../models/user");




router.get("/calculatePrize", async(req, res) => {
    let stopAt = (Math.floor((Math.random() * 8)))
    console.log(req.session.userID, " won: ", stopAt);
    console.log(req.session.username);
    try {
        const updateUser = await User.updateOne({ _id: req.session.userID }, { $push: { spinHistory: stopAt.toString() } });

    } catch (err) {
        console.log(err);
    }
    res.json(stopAt);
});

module.exports = router;