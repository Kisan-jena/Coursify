const {Router}=require("express")
           // above one line and below 2 line do same thing
// const express = require("express");
// const Router = express.Router;

const courseRouter = Router();

courseRouter.get("/preview", (req, res) => {
    res.json({
        message: "course preview"
    });
});

courseRouter.post("/purchase", (req, res) => {
    res.json({
        message: "course purchase successful"
    });
});

module.exports = {
    courseRouter: courseRouter
};

