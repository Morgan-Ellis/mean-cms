const express = require("express");
const userRouter = express.Router();

//User Model
const User = require("../models/user");

//POST signup
userRouter.post("/signup", function (req, res) {

    let username = req.body.username;
    let password = req.body.password;

    User.findOne({
        username: username
    }, function (err, user) {
        if (err) console.log(err);

        if (user) {
            res.json("userExists");
        } else {
            let user = new User({
                username: username,
                password: password
            });

            user.save(function (err) {
                if (err) {
                    console.log(err);
                } else {
                    res.json("userCreated");
                }
            });
        }
    });
});

//POST login
userRouter.post("/login", function (req, res) {

    const username = req.body.username;
    const password = req.body.password;

    User.findOne({
        username: username,
        password: password
    }, function (err, user) {
        if (err) console.log(err);

        if (user) {
            res.json(username);
        } else {
            res.json("invalidLogin");
        }
    });
});

//Exports
module.exports = userRouter;