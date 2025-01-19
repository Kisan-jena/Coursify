const express = require("express");
const Router = express.Router;

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

