import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import PostRouter from "./routes/Posts.js";

dotenv.config();

const app = express();

app.use(express.json({limit:"50mb"}));
app.use(express.urlencoded({extended:true}));

//error handler

app.use((err,req,res,next)=>{
    const status=err.status || 500;
const message=err.message || "Something went wrong!";
return res.status(status).json({
    success:false,
    status,
    message,
});
});

app.use("/api/post",PostRouter);

//Default get
app.get("/",async (req,res)=>{
    res.status(200).json({
        message: "RAM RAM",
    });
});

//function to connect to mongodb
const connectDB=()=>{
    mongoose.set("strictQuery",true);
    mongoose
    .connect(process.env.MONGODB_URL)
    .then(()=>console.log("MongoDB connected"))
    .catch((err)=>{
        console.error("Failed to connect to DB");
        console.error(err);
    })
}

//function to start the server
const startServer=async()=>{
    try{
        connectDB();
        app.listen(8080,()=>console.log( "Server started listening on port 8080"));
    }
    catch(error){
        console.log(error);
    }
};


startServer();