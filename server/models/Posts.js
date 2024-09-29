import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    prompt: {
        type:String,
        requried:true,
    },
    photo:{
        type:String,
        required:true,
    },
});


const Post = mongoose.model("Post",PostSchema);

export default Post;