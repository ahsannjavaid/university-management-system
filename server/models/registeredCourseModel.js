const mongoose = require("mongoose");

const registeredCourseSchema = new mongoose.Schema(
  {
    courseId: {
      type: String,
      ref: "courses",
      required: true,
    },
    instructorId: {
      type: String,
      ref: "instructors",
      required: true,
    },
    studentId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("registeredCourse", registeredCourseSchema);
