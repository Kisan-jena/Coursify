const express= require("express")
const Router=express.Router;

const userRouter=Router();

userRouter.post("/signup",function(req,res){
    res.json({
        message: "signup sucess"
    })
})

userRouter.post("/signin",function(req,res){
    res.json({
        message: "signin sucess"
    })
})

userRouter.get("/CoursePurchases",function(req,res){
    res.json({
        message: ""
    })
})

module.exports-{
    userRouter:userRouter
}