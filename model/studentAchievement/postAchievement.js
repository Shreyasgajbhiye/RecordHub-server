import mongoose from 'mongoose';


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
