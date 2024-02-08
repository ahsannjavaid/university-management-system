import React, { useEffect, useState } from 'react'
import StudentLayout from '../../layouts/StudentLayout'
import { fetchResponse } from '../../api/service';
import { courseEndpoints } from '../../api/endpoints/courseEndpoints';
import { toastErrorObject } from '../../utility/toasts';
import { toast } from 'react-toastify';
import LoadingSpinner from '../../components/spinners/LoadingSpinner';
import DynamicTable from '../../components/tables/DynamicTable';

export default function Courses() {
    const studentId = JSON.parse(localStorage.getItem("student"))._id;

    const [courses, setCourses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
      async function fetchData() {
        try {
          let res;
          res = await fetchResponse(
            courseEndpoints.getCoursesOfStudent(studentId),
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
      fetchData();
    }, [studentId]);
  
    if (isLoading) return <LoadingSpinner />;
  
    return (
      <StudentLayout>
        <DynamicTable
          styles={"table-bordered"}
          headers={[
            "Title",
            "Code",
            "Type",
            "Credit Hours",
            "Fee",
            "Instructor",
            "Registeration Date",
          ]}
          data={courses}
          dataAttributes={["title", "code", "type", "creditHours", "fee", "instructorName", "createdAt"]}
        />
      </StudentLayout>
    );
}
