const mongoose = require("mongoose");

const academicSchema = new mongoose.Schema(
  {
    examType: {
      type: String,
      required: true,
    },
    weightage: {
      type: Number,
      required: true,
    },
    totalMarks: {
      type: Number,
      required: true,
    },
    marks: [
      {
        obtainedMarks: {
          type: Number,
          required: true,
        },
        studentId: {
          type: String,
          required: true,
        },
      },
    ],
    activityNumber: {
      type: Number,
    },
    instructorId: {
      type: String,
      required: true,
    },
    courseId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("academics", academicSchema);
