const express= require("express")
const Router=express.Router;

const courseRouter=Router();

courseRouter.post("/signup",function(req,res){
    res.json({
        message: "signup sucess"
    })
})

courseRouter.post("/signin",function(req,res){
    res.json({
        message: "signin sucess"
    })
})

courseRouter.get("/CoursePurchases",function(req,res){
    res.json({
        message: ""
    })
})

module.exports-{
    courseRouter:courseRouter
}