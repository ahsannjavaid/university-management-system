import React, { useEffect, useState } from "react";
import StudentLayout from "../../layouts/StudentLayout";
import { fetchResponse } from "../../api/service";
import { studentEndpoints } from "../../api/endpoints/studentEndpoints";
import { toast } from "react-toastify";
import { toastErrorObject } from "../../utility/toasts";
import DynamicTable from "../../components/tables/DynamicTable";
import SelectField from "../../components/inputs/SelectField";

export default function Attendance() {
  const studentId = JSON.parse(localStorage.getItem("student"))._id;

  const [attendanceData, setAttendanceData] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchCourseAndExamTypeNames() {
      try {
        let res;
        res = await fetchResponse(
          studentEndpoints.getCourseAndExamTypeNames(studentId),
          0,
          null
        );
        const resData = res.data;
        if (!res.success) {
          toast.error(res.message, toastErrorObject);
          return;
        }
        console.log("Log data", resData);
        setCourses(resData?.courses);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    setIsLoading(true);
    fetchCourseAndExamTypeNames();
  }, [studentId]);

  async function handleFetchAttendances(courseId) {
    setIsLoading(true);
    try {
      let res;
      res = await fetchResponse(
        studentEndpoints.getAttendances(studentId, courseId),
        0,
        null
      );
      const resData = res.data;
      if (!res.success) {
        toast.error(res.message, toastErrorObject);
        return;
      }
      console.log("Log data", resData);
      const sortedAttendances = resData?.sort((a, b) => {
        // Convert date strings to Date objects for accurate comparison
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateA - dateB;
      });
      setAttendanceData(sortedAttendances);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <StudentLayout isLoading={isLoading}>
      <SelectField
        label={"Course | Instructor"}
        options={courses?.map((course) => ({
          title: course.title + " | " + course.instructor,
          value: course.courseId,
        }))}
        value={selectedCourse}
        onChange={(event) => {
          setAttendanceData([]);
          setSelectedCourse(event.target.value);
          handleFetchAttendances(event.target.value);
        }}
      />
      <div className="pt-3">
        <DynamicTable
          styles={"table-bordered"}
          headers={["Date", "Status"]}
          data={attendanceData}
          dataAttributes={["date", "attendance"]}
        />
      </div>
    </StudentLayout>
  );
}
