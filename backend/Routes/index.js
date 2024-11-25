import express from "express";
import {user_router} from './user.js'
import {account_router} from './account.js'

// Multiple routing
const router = express.Router();

router.use('/user',user_router);
router.use('/account',account_router);

export {router};