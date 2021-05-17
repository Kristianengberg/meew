const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const User = require("../models/user");

const saltRounds = 12;

/* signup, login, logout */


router.post("/register", async(req, res) => {
    console.log(req.body);
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
        const insertResult = await User.create({
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            hashedPassword: hashedPassword,
        });
        res.json(insertResult);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server error Occured");
    }
});

module.exports = router;