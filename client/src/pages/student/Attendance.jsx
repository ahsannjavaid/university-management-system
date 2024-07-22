import React, { useEffect, useState } from 'react'
import StudentLayout from '../../layouts/StudentLayout'
import { fetchResponse } from '../../api/service';
import { studentEndpoints } from '../../api/endpoints/studentEndpoints';
import { toast } from 'react-toastify';
import { toastErrorObject } from '../../utility/toasts';
import DynamicTable from '../../components/tables/DynamicTable';

export default function Attendance() {
  const studentId = JSON.parse(localStorage.getItem("student"))._id;

  const [attendanceData, setAttendanceData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        let res;
        res = await fetchResponse(
          studentEndpoints.getAttendances(studentId),
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
        const sortedAttendances = resData?.sort((a, b) => {
          const courseComparison = a.courseTitle.localeCompare(b.courseTitle);
          if (courseComparison !== 0) {
            return courseComparison;
          }
          // Convert date strings to Date objects for accurate comparison
          const dateA = new Date(a.date);
          const dateB = new Date(b.date);
          return dateA - dateB;
        });
        setAttendanceData(sortedAttendances);        
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    }
    fetchData();
  }, [studentId]);

  return (
    <StudentLayout isLoading={isLoading}>
      <DynamicTable
        styles={"table-bordered"}
        headers={[
          "Instructor",
          "Course",
          "Date",
          "Status",
        ]}
        data={attendanceData}
        dataAttributes={["instructorName", "courseTitle", "date", "attendance"]}
      />
    </StudentLayout>
  );
}
