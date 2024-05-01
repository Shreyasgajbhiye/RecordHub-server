import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
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
        unique: true,
    },
    password: {
        type: String,
        require: true,
    },
    role: {
        type: String,
        default: "admin"
    }
})

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;