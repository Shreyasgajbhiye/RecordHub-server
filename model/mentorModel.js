import mongoose from "mongoose";

const mentorSchema = new mongoose.Schema({
    'fname' :{
        type:String,
        require:true
    },
    'lname' :{
        type:String,
        require:true
    },
    'email' :{
        type:String,
        require:true
    },
    'batch' :{
        type:String,
        require:true
    },
    'password' :{
        type:String,
        require:true
    },

})

export default mongoose.model("Mentor",mentorSchema);