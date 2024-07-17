import React, { useEffect, useState } from 'react'
import InstructorLayout from '../../layouts/InstructorLayout';
import { courseEndpoints } from "../../api/endpoints/courseEndpoints";
import { fetchResponse } from "../../api/service";
import { toast } from "react-toastify";
import { toastErrorObject } from "../../utility/toasts";
import LoadingSpinner from "../../components/spinners/LoadingSpinner";
import DynamicTable from "../../components/tables/DynamicTable";

export default function InstructorStudents() {
  const instructorId = JSON.parse(localStorage.getItem("instructor"))._id;

  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        let res;
        res = await fetchResponse(
          courseEndpoints.getStudentsOfInstructor(instructorId),
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
        setStudents(resData?.map(student => ({ ...student, name: student.fname + " " + student.lname })));
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    }
    fetchData();
  }, [instructorId]);

  if (isLoading) return <LoadingSpinner />;

  return (
    <InstructorLayout>
      <DynamicTable
        styles={"table-bordered"}
        headers={[
          "Roll Number",
          "Name",
          "Email Address",
          "Course",
          "Joining Date",
        ]}
        data={students}
        dataAttributes={["rollNumber", "name", "email", "courseTitle", "createdAt"]}
      />
    </InstructorLayout>
  );
}
