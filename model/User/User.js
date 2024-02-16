import mongoose from 'mongoose';
import passport from 'passport';
import passportLocalMongoose from "passport-local-mongoose"

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  batch: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Batch',
    },
  ],
});

// studentSchema.plugin(passportLocalMongoose)

const Student = mongoose.model("Student", studentSchema);

// passport.use(Student.createStrategy()); 
  

// passport.serializeUser(Student.serializeUser()); 
// passport.deserializeUser(Student.deserializeUser())


export default Student
