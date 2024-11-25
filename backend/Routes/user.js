import express from "express";
import { jWT_SECRET_KEY } from '../config.js'
import { users, Account } from '../db.js';
import jwt from 'jsonwebtoken';
import { authMiddleware } from '../middleware.js'

// Multiple routing
const user_router = express.Router();

user_router.post('/signup', async (req, res) => {


    // user json => First_Name: String,
    //              Second_Name: String,
    //              Email:String,
    //              Password: String

    var user = req.body;

    var check_user = await users.find({ Email: user.Email }).exec();

    if (check_user.length == 1) {
        res.status(411).json(
            {
                message: "Email already taken / Incorrect inputs"
            }
        )
    } else {
        var save_user = await users.create({
            First_Name: user.First_Name,
            Second_Name: user.Second_Name,
            Email: user.Email,
            Password: user.Password
        })

        console.log(save_user);

        var userId = save_user._id;

        console.log(userId);

        await Account.create({
            userId,
            balance: 1 + Math.random() * 10000
        })

        var jwt_token = jwt.sign({ Email: user.Email }, jWT_SECRET_KEY);
        res.status(200).json(
            {
                message: "User created successfully",
                token: jwt_token
            }
        )
    }
});

user_router.post("/signin", async (req, res) => {

    var user = req.body;

    var check_user = await users.find({ Email: user.Email }).exec();

    if (check_user.length == 1 && check_user[0]["Password"] === user.Password) {
        const jwt_token = jwt.sign({ Email: user.Email }, jWT_SECRET_KEY);
        res.status(200).json(
            {
                token: jwt_token
            }
        )
    } else {
        res.status(411).json(
            {
                message: "Error while logging in"
            }
        )
    }
});

user_router.get("/usersdata", async (req, res) => {

    var header_token = req.headers['authorization'];
    console.log("header_token-->", header_token);
    const token = header_token.split(' ')[1];
    console.log("token-->", token);
    var decoded = jwt.verify(token, jWT_SECRET_KEY);
    console.log("decoded-->", decoded);


    var check_user = await users.find({}).exec();

    const filteredUsers = check_user.filter(user_data => user_data.Email !== decoded.Email);

    console.log(filteredUsers);

    return res.status(200).json({

        users: filteredUsers
    })

});






user_router.put("/update", authMiddleware, async (req, res) => {

    var user = req.body;

    console.log("user--->", user);

    var len = user.Password.length;
    console.log(len);

    if (len > 5) {
        var update_user = await users.updateOne({ Email: user.Email }, req.body);
        console.log(update_user);

        res.status(200).json(
            {
                message: "Updated successfully"
            }
        )
    } else {
        res.status(411).json(
            {
                message: "Error while updating information"
            }


        )
    }
});

export { user_router };