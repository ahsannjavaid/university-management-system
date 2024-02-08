import React, { useEffect, useState } from 'react'
import StudentLayout from '../../layouts/StudentLayout'
import { fetchResponse } from '../../api/service';
import { studentEndpoints } from '../../api/endpoints/studentEndpoints';
import { toastErrorObject } from '../../utility/toasts';
import { toast } from 'react-toastify';
import LoadingSpinner from '../../components/spinners/LoadingSpinner';
import DynamicTable from '../../components/tables/DynamicTable';

export default function Marks() {
  const studentId = JSON.parse(localStorage.getItem("student"))._id;

  const [marksData, setMarksData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        let res;
        res = await fetchResponse(
          studentEndpoints.getAcademics(studentId),
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
        setMarksData(resData);
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
          "Instructor",
          "Course",
          "Exam Type",
          "Activity Number",
          "Weightage",
          "Total Marks",
          "Obtained Marks",
        ]}
        data={marksData}
        dataAttributes={["instructorName", "courseTitle", "examType", "activityNumber", "weightage", "totalMarks", "marks"]}
      />
    </StudentLayout>
  );
}
