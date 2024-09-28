const express = require("express");
const {
    registerUser,
    loginUser
} = require("../../../controller/controller");

const userRouter = express.Router();

userRouter.post('/user-register', registerUser);
userRouter.post('/login-user',loginUser)

module.exports = userRouter;
