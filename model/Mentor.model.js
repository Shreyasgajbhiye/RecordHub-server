import mongoose from "mongoose";

const mentorSchema = new mongoose.Schema({
    fname: {
        type: String,
        default: "",
        require: true,
    },
    mname: {
        type: String,
        default: "",
        require: true,
    },
    lname: {
        type: String,
        default: "",
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    batch: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Batch",
        },
    ],
    requests: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Student"
        }
    ]
});

const Mentor = mongoose.model("Mentor", mentorSchema);

export default Mentor;
