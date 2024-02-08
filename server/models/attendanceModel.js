const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    attendance: [
      {
        studentId: {
          type: String,
          required: true,
        },
        status: {
          type: String,
          required: true,
          maxlength: 3,
        },
      },
    ],
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

module.exports = mongoose.model("attendances", attendanceSchema);
