const { Router } = require("express");
const { admin_auth_middleware,JWT_SECRET } = require("../authMiddleware/admin");
const { adminModel, courseModel } = require("../database/db");
const bcrypt = require("bcrypt");
const { z } = require("zod");
const jwt = require("jsonwebtoken");
const express = require("express");
const course = require("./course");

const adminRouter = Router();

adminRouter.use(express.json());

adminRouter.post("/signup", async(req, res) => {

    const requiredBody = z.object({
        email: z.string().min(3).max(100).email(),
        firstname: z.string().min(3).max(100),
        lastname: z.string().min(3).max(100),
        password: z.string().min(3).max(30),
      });
    
      const parsedDataWithSuccess = requiredBody.safeParse(req.body);
      console.log(parsedDataWithSuccess)

      if (!parsedDataWithSuccess.success) {
        return res.status(400).json({
          message: "Incorrect format",
          error:parsedDataWithSuccess.error
        });
      }

    const firstname=req.body.firstname;
    const lastname=req.body.lastname;
    const email=req.body.email;
    const password=req.body.password;

    const hashpassword= await bcrypt.hash(password,7);

    await adminModel.create({
        email:email,
        password:hashpassword,
        firstname:firstname,
        lastname:lastname
    });
    res.status(201).json({ 
        message: "Admin signed up successfully!" 
    });

});

adminRouter.post("/signin", async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = await adminModel.findOne({ email });

      console.log(user)
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      
      const isPasswordValid = await bcrypt.compare(password, user.password);
  
      if (isPasswordValid) {
        
        const token = jwt.sign({ id: user._id }, JWT_SECRET);
  
        res.status(200).json({
          message: "Login successful",
          token,
        });
      } else {
        res.status(403).json({ message: "Invalid credentials" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error during signin", error: error.message });
    }
});

adminRouter.post("/createcourse",admin_auth_middleware, async(req, res) => { 
  const {title,description,imageUrl,price}=req.body

  const admin_id=req.userId

  const course = await courseModel.create({
    title,
    description,
    imageUrl,
    price,
    creator_id:admin_id
  })
  res.json({
    message: "created course",
    course:course,
    courseId:course._id,
  });
});

adminRouter.put("/editCourse",admin_auth_middleware, async(req, res) => {

  const admin_id=req.userId
  const {course_id,title,description,imageUrl,price}=req.body

  const course = await courseModel.updateOne({
    _id:course_id,
    creator_id:admin_id
  },{
    title:title,
    description:description,
    imageUrl:imageUrl,
    price:price,
  });


  if (course) {
    res.json({
        message: " updated successfully",
        course_id:course._id,
        updated_course:course
    });
} else {
    res.status(404).json({
        message: "course not found"
    });
}
  
});

adminRouter.get("/AllCoursePreview",admin_auth_middleware, async(req, res) => {

  const admin_id=req.userId
  const courses = await courseModel.find(
    {creator_id:admin_id}
  );

  if (courses) {
    res.json({
        message: "ALL courses of ",
        courses:courses
    });
} else {
    res.status(404).json({
        message: "course of creaator  not found"
    });
}
});

adminRouter.delete("/deletecourse",admin_auth_middleware, async(req, res) => {

  const course_id=req.body.course_id
  const admin_id=req.userId

  const course=await courseModel.findOneAndDelete({
    _id:course_id,
    creator_id:admin_id
  })

  if (course) {
    res.json({
        message: "course deleted successfully"
    });
} else {
    res.status(404).json({
        message: "course not found"
    });
}
});

module.exports = {
    adminRouter: adminRouter
};
