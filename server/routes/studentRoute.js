const express = require("express");
const {
  registerStudent,
  getStudents,
  getSingleStudent,
  getAcademics,
  getAttendances,
  editStudent,
  deleteStudent,
  loginStudent,
} = require("../controllers/studentController");

const router = express.Router();

router.post("/register", registerStudent);
router.get("/getAll", getStudents);
router.get("/get/:id", getSingleStudent);
router.post("/login", loginStudent);
router.put("/edit/:id", editStudent);
router.delete("/delete/:id", deleteStudent);

router.get("/getAcademics/:id", getAcademics);
router.get("/getAttendances/:id", getAttendances);

module.exports = router;
