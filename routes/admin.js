const { Router } = require("express");
const { auth, JWT_SECRET } = require("../auth/auth");
const { adminModel } = require("../database/db");
const bcrypt = require("bcrypt");
const { z } = require("zod");
const jwt = require("jsonwebtoken");
const express = require("express");

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
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      
      const isPasswordValid = await bcrypt.compare(password, user.password);
  
      if (isPasswordValid) {
        
        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });
  
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
