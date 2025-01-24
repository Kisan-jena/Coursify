const express = require("express");
const Router = express.Router;
const { userModel } = require("../database/db");
const {auth,JWT_SECRET}=require("../auth/auth")
const bcrypt=require("bcrypt")
const { z }=require("zod")

const jwt = require("jsonwebtoken");
const userRouter = Router();
userRouter.use(express.json());

userRouter.post("/signup", async(req, res) => {

    const requiredBody = z.object({
        firstname: z.string().min(3).max(100),
        lastname: z.string().min(3).max(100),
        email: z.string().min(3).max(100).email(),
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

    await userModel.create({
        email:email,
        password:hashpassword,
        firstname:firstname,
        lastname:lastname
    });
    res.status(201).json({ 
        message: " signed up successfully!" 
    });

});

userRouter.post("/signin", async(req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await userModel.findOne({ email });
  
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

userRouter.get("/coursePurchases", (req, res) => {
    res.json({
        message: "Here are your course purchases"
    });
});

module.exports = {
    userRouter: userRouter
};
