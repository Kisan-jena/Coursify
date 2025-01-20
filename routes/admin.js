const express = require("express");
const Router = express.Router;
const {adminModel}=require("../database/db")

const adminRouter = Router();

adminRouter.post("/signup", (req, res) => {
    res.json({
        message: "signup success"
    });
});

adminRouter.post("/signin", (req, res) => {
    res.json({
        message: "signin success"
    });
});

// adminRouter.use("adminMiddleware");

adminRouter.post("/createcourse", (req, res) => {
    res.json({
        message: "Here are your course purchases"
    });
});

adminRouter.put("/editCourse", (req, res) => {
    res.json({
        message: "Here are your course purchases"
    });
});

adminRouter.get("/AllCoursePreview", (req, res) => {
    res.json({
        message: "Here are your course purchases"
    });
});

adminRouter.delete("/deletecourse", (req, res) => {
    res.json({
        message: "Here are your course purchases"
    });
});

module.exports = {
    adminRouter: adminRouter
};
