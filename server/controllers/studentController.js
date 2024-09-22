const studentSchema = require("../models/studentModel");
const instructorSchema = require("../models/instructorModel");
const courseSchema = require("../models/courseModel");
const academicSchema = require("../models/academicModel");
const attendanceSchema = require("../models/attendanceModel");
const registeredCourseSchema = require("../models/registeredCourseModel");

const registerStudent = async (req, res) => {
  try {
    const { fname, lname, email, password } = req.body;

    // validation
    switch (true) {
      case !fname:
        return res.status(400).send({
          success: false,
          message: "First name is mandatory!",
        });
      case !lname:
        return res.status(400).send({
          success: false,
          message: "Last name is mandatory!",
        });
      case !email:
        return res.status(400).send({
          success: false,
          message: "Email is mandatory!",
        });
      case !password:
        return res.status(400).send({
          success: false,
          message: "Password is mandatory!",
        });
      default:
        break;
    }

    // ensuring unique email
    const studentExists = await studentSchema.find({ email });
    if (studentExists.length) {
      return res.status(400).send({
        success: false,
        message: `We already have a student named ${
          studentExists[0].fname + " " + studentExists[0].lname
        } against this email.`,
      });
    }

    let rollNumber;
    while (true) {
      // generating 4-digit roll number
      const randomDecimal = Math.random();
      rollNumber = Math.floor(randomDecimal * (9999 - 1000 + 1) + 1000);

      // ensuring unique roll number
      const rollNumberExists = await studentSchema.find({ rollNumber });
      if (!rollNumberExists.length) break;
    }

    // registration
    const newStudent = new studentSchema({
      fname,
      lname,
      email,
      rollNumber,
      password,
    });
    const result = await newStudent.save();

    if (result) {
      res.status(200).send({
        success: true,
        message: "Student registered successfully!",
        data: newStudent,
      });
    } else {
      res.status(500).send({
        success: false,
        message: "Something went wrong while registering the student.",
        error,
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Something went wrong while registering the student.",
      error,
    });
  }
};

const getStudents = async (req, res) => {
  try {
    const students = await studentSchema.find();
    if (students.length) {
      res.status(200).send({
        success: true,
        message: "Students fetched successfully!",
        count: students.length,
        data: students,
      });
    } else {
      res.status(204).send({
        success: true,
        message: "No students so far.",
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Something went wrong while fetching the students.",
      error,
    });
  }
};

const getSingleStudent = async (req, res) => {
  try {
    const id = req.params.id;
    const student = await studentSchema.findById(id);
    if (student) {
      res.status(200).send({
        success: true,
        message: "Student fetched successfully!",
        data: student,
      });
    } else {
      res.status(404).send({
        success: false,
        message: "Student not found.",
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Something went wrong while fetching the student.",
      error,
    });
  }
};

const loginStudent = async (req, res) => {
  try {
    const { email, rollNumber, password } = req.body;

    // validation
    switch (true) {
      case !email && !rollNumber:
        return res.status(400).send({
          success: false,
          message: "Please provide Email or Roll number.",
        });
      case !password:
        return res.status(400).send({
          success: false,
          message: "Password is mandatory!",
        });
      default:
        break;
    }

    const student = await studentSchema.findOne({
      $or: [
        { email, password },
        { rollNumber, password },
      ],
    });

    if (student) {
      res.status(200).send({
        success: true,
        message: "Login successfully!",
        data: student,
      });
    } else {
      res.status(404).send({
        success: false,
        message: "Wrong credentials.",
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Something went wrong while loging in the student.",
      error,
    });
  }
};

const editStudent = async (req, res) => {
  try {
    const id = req.params.id;
    const { fname, lname, email, password } = req.body;

    const student = await studentSchema.findById(id);
    if (!student) {
      res.status(404).send({
        success: false,
        message: "Student not found.",
      });
    }

    // validation
    switch (true) {
      case !fname:
        return res.status(400).send({
          success: false,
          message: "First name cannot be empty!",
        });
      case !lname:
        return res.status(400).send({
          success: false,
          message: "Last name cannot be empty!",
        });
      case !email:
        return res.status(400).send({
          success: false,
          message: "Email cannot be empty!",
        });
      case !password:
        return res.status(400).send({
          success: false,
          message: "Password cannot be empty!",
        });
      default:
        break;
    }

    // editing
    const editedStudent = await studentSchema.findByIdAndUpdate(
      id,
      {
        fname,
        lname,
        email,
        password,
      },
      { new: true }
    );
    if (editedStudent) {
      res.status(200).send({
        success: true,
        message: "Student's information edited successfully!",
        data: editedStudent,
      });
    } else {
      res.status(500).send({
        success: false,
        message: "Something went wrong while editing the student.",
        error,
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Something went wrong while editing the student.",
      error,
    });
  }
};

const getAcademics = async (req, res) => {
  try {
    const { studentId, courseId, examType } = req.query;

    const academics = await academicSchema
      .find({
        marks: { $elemMatch: { studentId } },
        courseId,
        examType,
      })
      .select("activityNumber weightage totalMarks marks");

    if (academics.length) {
      let academicDetails = [];

      for (let i = 0; i < academics.length; i++) {
        const element = academics[i];

        // fetching the required records only
        const requiredStudentMarks = element.marks.find(
          (record) => record.studentId === studentId
        );

        if (
          requiredStudentMarks?.isPublic ||
          requiredStudentMarks?.isPublic === undefined
        )
          academicDetails.push({
            ...element._doc,
            marks: requiredStudentMarks.obtainedMarks,
          });
      }
      if (academicDetails.length) {
        res.status(200).send({
          success: true,
          message: "Academics fetched successfully!",
          count: academicDetails.length,
          data: academicDetails,
        });
      } else {
        res.status(404).send({
          success: false,
          message: "Academics against this student not found.",
        });
      }
    } else {
      res.status(404).send({
        success: false,
        message: "Academics against this student not found.",
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Something went wrong while fetching academics.",
      error,
    });
  }
};

const getCourseAndExamTypeNames = async (req, res) => {
  try {
    const id = req.params.id;

    const examTypes = await academicSchema.distinct("examType", {
      marks: { $elemMatch: { studentId: id } },
    });

    const courses = await registeredCourseSchema
      .find({ studentId: id })
      .select("courseId instructorId -_id")
      .populate({
        path: "courseId instructorId",
        select: "courseId title fname lname",
      });

    const formattedCourses = courses?.map((record) => ({
      courseId: record.courseId._id,
      title: record.courseId.title,
      instructor: record.instructorId.fname + " " + record.instructorId.lname,
    }));

    if (examTypes.length || courses.length) {
      res.status(200).send({
        success: true,
        message: "Exam Types and Courses of this student fetched successfully!",
        data: {
          examTypes,
          courses: formattedCourses,
        },
      });
    } else {
      res.status(404).send({
        success: false,
        message: "Exam Types and Courses against this student not found.",
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Something went wrong while fetching Exam Types and Courses.",
      error,
    });
  }
};

const getAttendances = async (req, res) => {
  try {
    const { studentId, courseId } = req.query;

    const attendances = await attendanceSchema
      .find({
        attendance: { $elemMatch: { studentId } },
        courseId,
      })
      .select("date attendance _id");

    if (attendances.length) {
      let attendanceDetails = [];

      for (let i = 0; i < attendances.length; i++) {
        const element = attendances[i];

        // fetching the required records only
        const requiredStudentAttendance = element.attendance.find(
          (record) => record.studentId === studentId
        );

        if (
          requiredStudentAttendance?.isPublic === undefined ||
          requiredStudentAttendance?.isPublic
        )
          attendanceDetails.push({
            ...element._doc,
            attendance: requiredStudentAttendance.status,
          });
      }
      if (attendanceDetails.length) {
        res.status(200).send({
          success: true,
          message: "Attendances fetched successfully!",
          count: attendanceDetails.length,
          data: attendanceDetails,
        });
      } else {
        res.status(404).send({
          success: false,
          message: "Attendances against this student not found.",
        });
      }
    } else {
      res.status(404).send({
        success: false,
        message: "Attendances against this student not found.",
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Something went wrong while fetching attendances.",
      error,
    });
  }
};

const deleteStudent = async (req, res) => {
  try {
    const id = req.params.id;

    const student = await studentSchema.findById(id);
    if (!student) {
      res.status(404).send({
        success: false,
        message: "Student not found.",
      });
    }

    // deleting data in referenced documents (if needed...)
    // deleting
    const deletedStudent = await studentSchema.findByIdAndDelete(id);
    if (deletedStudent) {
      res.status(200).send({
        success: true,
        message: "Student deleted successfully!",
        data: deletedStudent,
      });
    } else {
      res.status(500).send({
        success: false,
        message: "Something went wrong while deleting the student.",
        error,
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Something went wrong while deleting the student.",
      error,
    });
  }
};

module.exports = {
  registerStudent,
  getStudents,
  getSingleStudent,
  loginStudent,
  editStudent,
  deleteStudent,
  getAcademics,
  getAttendances,
  getCourseAndExamTypeNames,
};
