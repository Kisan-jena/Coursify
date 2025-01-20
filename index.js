const express = require("express");
const mongoose = require("mongoose");

const { userRouter } = require("./routes/user");
const { courseRouter } = require("./routes/course");
const { adminRouter } = require("./routes/admin")

const app = express();

app.use("/user", userRouter);
app.use("/course", courseRouter);
app.use("/admin", adminRouter);


async function main() {
    mongoose.connect("mongodb+srv://kisanjena40:kisanjena123@cluster0.pe5nz.mongodb.net/Coursify")
    app.listen(3000);
    console.log("listening on port 3000")
}

main()
