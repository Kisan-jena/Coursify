const express = require("express");
const Router = express.Router;
const { purchaseModel,courseModel } = require("../database/db");
const {user_auth_middleware,JWT_SECRET}=require("../authMiddleware/user")


const courseRouter = Router();

courseRouter.get("/preview",user_auth_middleware, async(req, res) =>{
    
    const courses = await courseModel.find({});

    
    res.status(200).json({
        courses: courses,
    });
}); 

courseRouter.post("/purchase",   async(req, res) => {
    
    const userId = req.userId;

    
    const courseId = req.body.courseId;
   
    if(!courseId){
        return res.status(400).json({
            message: "Please provide a courseId",
        });
    }

    
    const existingPurchase = await purchaseModel.findOne({
        courseId: courseId,
        userId: userId,     
    });

    
    if(existingPurchase){
        return res.status(400).json({
            message:"You have already bought this course",
        });
    }

    
    await purchaseModel.create({
        courseId: courseId, 
        userId: userId, 
    });

   
    res.status(201).json({
        message: "You have successfully bought the course"
    });
});

module.exports = {
    courseRouter: courseRouter
};

