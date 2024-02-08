const express = require("express");
const {
  registerCourse,
  getCourses,
  getSingleCourse,
  registerOfferedCourse,
  getOfferedCoursesOfInstructor,
  registerRegisteredCourse,
  getRegisteredCoursesOfStudent,
  editCourse,
  deleteCourse,
  getRegisteredStudentsOfInstructor,
  getOfferedCourses,
} = require("../controllers/courseController");

const router = express.Router();

router.post("/register", registerCourse);
router.get("/getAll", getCourses);
router.get("/get/:id", getSingleCourse);
router.put("/edit/:id", editCourse);
router.delete("/delete/:id", deleteCourse);

router.post("/offered/register", registerOfferedCourse);
router.get("/offered/getAll", getOfferedCourses);
router.get("/offered/getAll/:id", getOfferedCoursesOfInstructor);

router.post("/registered/register", registerRegisteredCourse);
router.get("/registered/getAll/:id", getRegisteredCoursesOfStudent);

router.get("/registeredStudents/getAll/:id", getRegisteredStudentsOfInstructor);

module.exports = router;
