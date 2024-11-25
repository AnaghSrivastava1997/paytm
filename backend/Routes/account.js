import express from "express";
import { jWT_SECRET_KEY } from '../config.js'
import { users, Account } from '../db.js';
import jwt from 'jsonwebtoken';
import { authMiddleware } from '../middleware.js'
import { startSession } from "mongoose";

// Multiple routing
const account_router = express.Router();


account_router.get("/balance", async (req, res) => {

   
    var header_token = req.headers['authorization'];
    console.log("header_token-->", header_token);
    const token = header_token.split(' ')[1];
    console.log("token-->", token);
    var decoded = jwt.verify(token, jWT_SECRET_KEY);
    console.log("decoded-->", decoded);

    var check_user = await users.findOne({ Email: decoded.Email }).exec();

    console.log(check_user);

    var user_id = check_user._id;

    console.log(user_id);

    var user_acoount = await Account.findOne({ userId: user_id }).exec();

    console.log(user_acoount);

    return res.status(200).json({
        message: "balance succesfully showing",
        balance: user_acoount.balance
    })

})

account_router.post("/transfer", authMiddleware, async (req, res) => {

    var user_value = req.body;

    const session = await startSession();

    session.startTransaction();

    var user_to_send = await users.findOne({ Email: user_value.to }).exec();

    console.log("user_to_send-->", user_to_send);

    var header_token = req.headers['authorization'];
    console.log("header_token-->", header_token);
    const token = header_token.split(' ')[1];
    console.log("token-->", token);
    var decoded = jwt.verify(token, jWT_SECRET_KEY);
    console.log("decoded-->", decoded);

    var user_from_send = await users.findOne({ Email: decoded.Email }).exec();

    console.log("user_from_send-->", user_from_send);

    var userId = user_from_send._id;

    console.log("userId-->", userId);

    var account_from_send = await Account.findOne({ userId: user_from_send._id }).exec();
    var account_to_send = await users.findOne({ Email: user_value.to }).exec();

    console.log("account_from_send-->", user_from_send);

    if (user_from_send) {

        if (account_from_send.balance > user_value.balance) {

            await Account.updateOne({ userId: account_to_send._id }, { $inc: { balance: user_value.balance } }).session(session);;
            await Account.updateOne({ userId: user_from_send._id }, { $inc: { balance: -user_value.balance } }).session(session);;

            await session.commitTransaction();
            return res.status(200).json({
                message: "balance succesfully showing"
            })
        } else {
            await session.abortTransaction();
            return res.status(400).json({
                message: "insufficient balance"
            })
        }
    } else {
        await session.abortTransaction();
        return res.status(400).json({
            message: "invalid account"
        })
    }
})

export { account_router };