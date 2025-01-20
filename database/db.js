const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

console.log("connect to")
mongoose.connect("mongodb+srv://kisanjena40:kisanjena123@cluster0.pe5nz.mongodb.net/Coursify")

const userSchema=new Schema({
    email:{type:String,unique:true},
    password:String,
    firstname:String,
    lastname:String
});

const adminSchema=new Schema({
    email:{type:String,unique:true},
    password:String,
    firstname:String,
    lastname:String
})

const courseSchema=new Schema({
    title:String,
    description:String,
    price:Number,
    imageUrl:String,
    creator_id:ObjectId
})

const purchaseSchema=new Schema({
    userId:ObjectId,
    courseId:ObjectId
})

const userModel=mongoose.model("user",userSchema);
const adminModel=mongoose.model("admin",adminSchema);
const courseModel=mongoose.model("course",courseSchema);
const purchaseModel=mongoose.model("purchase",purchaseSchema);

module.exports={
    userModel,
    adminModel,
    courseModel,
    purchaseModel,
}