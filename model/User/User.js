import mongoose from 'mongoose'

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

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;