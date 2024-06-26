import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: true,
  },
  mname: {
    type: String,
    required: true,
  },
  lname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "student"
},
  year: {
    type: Number,
    required: true,
  },
  isApproved: {
    type: Boolean,
    default: false,
    required: true
  },
  isVerified: {
    type: Boolean,
    default: false,
    required: true
  },
  batch: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Batch',
    },
  ],
  achievement: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Achievement',
    },
  ],
});



const Student = mongoose.model("Student", studentSchema);



export default Student
