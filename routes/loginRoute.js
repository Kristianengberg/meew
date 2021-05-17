const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const User = require("../models/user");

const saltRounds = 12;

/* signup, login, logout */


router.post("/login", async(req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        console.log(user);
        if (user) {
            const cmp = await bcrypt.compare(req.body.password, user.hashedPassword);
            if (cmp) {
                //   ..... further code to maintain authentication like jwt or sessions
                res.send("Auth Successful");
            } else {
                res.send("Wrong username or password.");
            }
        } else {
            res.send("Wrong username or password.");
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server error Occured");
    }
});

module.exports = router;