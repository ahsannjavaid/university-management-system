const mongoose = require("mongoose");

const offeredCourseSchema = new mongoose.Schema(
  {
    courseId: {
      type: String,
      required: true,
    },
    instructorId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("offeredCourse", offeredCourseSchema);
