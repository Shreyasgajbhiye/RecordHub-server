import mongoose from "mongoose";

const achievementSchema = new mongoose.Schema({
    name: {
        type: String,
        
        require: true,
    },
    description: {
        type: String,
        require: true,
    },
    pdf: {
        type: String,
        require: true,
    },
    year: {
        type: String,
        require: true,
    },
    date: {
        type: String,
        default: Date.now
    },
    status: {
        type: String,
        default: "pending"
    },
    type: {
        type: String,
        require: true
    }
})

const Achievement = mongoose.model("Achievement", achievementSchema);

export default Achievement