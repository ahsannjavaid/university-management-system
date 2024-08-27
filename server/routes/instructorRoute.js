const express = require("express");
const { registerInstructor, getInstructors, getSingleInstructor, getAcademics, postAcademics, postAttendance, getAttendances, editInstructor, deleteInstructor, loginInstructor, editAttendance, editAcademics } = require("../controllers/instructorController");

const router = express.Router();

router.post("/register", registerInstructor);
router.get("/getAll", getInstructors);
router.get("/get/:id", getSingleInstructor);
router.post("/login", loginInstructor);
router.put("/edit/:id", editInstructor);
router.delete("/delete/:id", deleteInstructor);

router.post("/postAcademics", postAcademics);
router.put("/editAcademics/:id", editAcademics);
router.get("/getAcademics", getAcademics);

router.post("/postAttendance", postAttendance);
router.put("/editAttendance/:id", editAttendance);
router.get("/getAttendances/:id/:courseId", getAttendances);

module.exports = router;