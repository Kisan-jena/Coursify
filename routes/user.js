const express = require("express");
const Router = express.Router;

const userRouter = Router();

userRouter.post("/signup", (req, res) => {
    res.json({
        message: "signup success"
    });
});

userRouter.post("/signin", (req, res) => {
    res.json({
        message: "signin success"
    });
});

userRouter.get("/coursePurchases", (req, res) => {
    res.json({
        message: "Here are your course purchases"
    });
});

module.exports = {
    userRouter: userRouter
};
