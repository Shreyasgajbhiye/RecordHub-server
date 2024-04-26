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
        default: "achievement"
    },
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
        require: true
    }
})

const Achievement = mongoose.model("Achievement", achievementSchema);

export default Achievement