import React, { useEffect, useState } from 'react'
import StudentLayout from '../../layouts/StudentLayout'
import { fetchResponse } from '../../api/service';
import { courseEndpoints } from '../../api/endpoints/courseEndpoints';
import { toastErrorObject, toastSuccessObject } from '../../utility/toasts';
import { toast } from 'react-toastify';
import LoadingSpinner from '../../components/spinners/LoadingSpinner';
import RegisterCourseTable from '../../components/tables/RegisterCourseTable';

export default function RegisterCourse() {
    const studentId = JSON.parse(localStorage.getItem("student"))._id;

    const [courses, setCourses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
      async function fetchOfferedCoursesData() {
        try {
          let res;
          res = await fetchResponse(
            courseEndpoints.getOfferedCourses(),
            0,
            null
          );
          const resData = res.data;
          if (!res.success) {
            toast.error(res.message, toastErrorObject);
            setIsLoading(false);
            return;
          }
          console.log("Log data", resData);
          setCourses(resData);
          setIsLoading(false);
        } catch (error) {
          console.log(error);
          setIsLoading(false);
        }
      }
      fetchOfferedCoursesData();
    }, [studentId]);
  
    async function registerCourse(item) {
      let result = window.confirm("Are you sure to Register this Course?");
      if (!result) return;
      setIsLoading(true);
      try {
        let res;
        res = await fetchResponse(
          courseEndpoints.registerCourseByStudent(),
          1,
          {studentId, courseId: item._id, instructorId: item.instructorId}
        );
        const resData = res.data;
        if (!res.success) {
          toast.error(res.message, toastErrorObject);
          setIsLoading(false);
          return;
        }
        console.log("Log data", resData);
        toast.success(res.message, toastSuccessObject);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    }
  
    if (isLoading) return <LoadingSpinner />;
  
    return (
      <StudentLayout>
        <RegisterCourseTable
          styles={"table-bordered"}
          headers={[
            "Title",
            "Code",
            "Type",
            "Credit Hours",
            "Fee",
            "Instructor",
            "Offer Date",
            "Action"
          ]}
          data={courses}
          dataAttributes={["title", "code", "type", "creditHours", "fee", "instructorName", "createdAt", "action"]}
          handleAction={registerCourse}
        />
      </StudentLayout>
    );
  
}
