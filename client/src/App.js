import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Instructor from "./pages/instructor/Instructor";
import Student from "./pages/student/Student";
import Admin from "./pages/admin/Admin";
import InstructorLogin from "./pages/instructor/InstructorLogin";
import StudentLogin from "./pages/student/StudentLogin";
import StudentSignup from "./pages/student/StudentSignup";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminSignup from "./pages/admin/AdminSignup";
import ViewAndActionInstructor from "./pages/admin/instructor/ViewAndActionInstructor";
import RegisterInstructor from "./pages/admin/instructor/RegisterInstructor";
import ViewAndActionCourse from "./pages/admin/course/ViewAndActionCourse";
import RegisterCourse from "./pages/admin/course/RegisterCourse";
import AdminSettings from "./pages/admin/AdminSettings";
import { useAuth } from "./contexts/authContext";
import ErrorPage from "./pages/ErrorPage";
import InstructorCourses from "./pages/instructor/InstructorCourses";
import InstructorSettings from "./pages/instructor/InstructorSettings";
import PostAttendance from "./pages/instructor/attendance/PostAttendance";
import PostMarks from "./pages/instructor/marks/PostMarks";
import InstructorStudents from "./pages/instructor/InstructorStudents";
import Courses from "./pages/student/Courses";
import RegisterCourseStudent from "./pages/student/RegisterCourse";
import StudentSettings from "./pages/student/StudentSettings";
import Marks from "./pages/student/Marks";
import Attendance from "./pages/student/Attendance";
import ViewMarks from "./pages/instructor/marks/ViewMarks";

export default function App() {
  const { studentData, instructorData, adminData } = useAuth();

  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />

          <Route
            exact
            path="/instructor"
            element={instructorData ? <Instructor /> : <InstructorLogin />}
          />
          <Route
            path="/instructor/students"
            element={instructorData ? <InstructorStudents /> : <InstructorLogin />}
          />
          <Route
            path="/instructor/marks/post"
            element={instructorData ? <PostMarks /> : <InstructorLogin />}
          />
          <Route
            path="/instructor/marks/view-or-update"
            element={instructorData ? <ViewMarks /> : <InstructorLogin />}
          />
          <Route
            path="/instructor/attendance"
            element={instructorData ? <PostAttendance /> : <InstructorLogin />}
          />
          <Route
            path="/instructor/courses"
            element={instructorData ? <InstructorCourses /> : <InstructorLogin />}
          />
          <Route
            path="/instructor/settings"
            element={instructorData ? <InstructorSettings /> : <InstructorLogin />}
          />
          <Route path="/instructor/login" element={<InstructorLogin />} />

          <Route
            exact
            path="/student"
            element={studentData ? <Student /> : <StudentLogin />}
          />
          <Route
            path="/student/courses"
            element={studentData ? <Courses /> : <StudentLogin />}
          />
          <Route
            path="student/register/course"
            element={studentData ? <RegisterCourseStudent /> : <StudentLogin />}
          />
          <Route
            path="/student/attendance"
            element={studentData ? <Attendance /> : <StudentLogin />}
          />
          <Route
            path="/student/marks"
            element={studentData ? <Marks /> : <StudentLogin />}
          />
          <Route
            path="/student/settings"
            element={studentData ? <StudentSettings /> : <StudentLogin />}
          />
          <Route path="/student/login" element={<StudentLogin />} />
          <Route path="/student/signup" element={<StudentSignup />} />
         
          <Route
            path="/admin"
            element={adminData ? <Admin /> : <AdminLogin />}
          />
          <Route
            path="/admin/instructors/action"
            element={adminData ? <ViewAndActionInstructor /> : <AdminLogin />}
          />
          <Route
            path="/admin/instructors/register"
            element={adminData ? <RegisterInstructor /> : <AdminLogin />}
          />
          <Route
            path="/admin/courses/action"
            element={adminData ? <ViewAndActionCourse /> : <AdminLogin />}
          />
          <Route
            path="/admin/courses/register"
            element={adminData ? <RegisterCourse /> : <AdminLogin />}
          />
          <Route
            path="/admin/settings"
            element={adminData ? <AdminSettings /> : <AdminLogin />}
          />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/signup" element={<AdminSignup />} />
          
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
