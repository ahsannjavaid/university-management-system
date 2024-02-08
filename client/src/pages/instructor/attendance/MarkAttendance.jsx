import React, { useEffect, useState } from "react";
import AttendanceTable from "../../../components/tables/AttendanceTable";
import { fetchResponse } from "../../../api/service";
import { instructorEndpoints } from "../../../api/endpoints/instructorEndpoints";
import { toastErrorObject, toastSuccessObject } from "../../../utility/toasts";
import { toast } from "react-toastify";

export default function MarkAttendance({
  data,
  date,
  courseId,
  instructorId,
  setIsLoading,
}) {
  const [attendanceData, setAttendanceData] = useState(data);

  useEffect(() => {
    setAttendanceData(data);
  }, [data]);

  async function postAttendance() {
    if (!courseId) {
      alert("Please Select a Course.");
      return;
    }
    setIsLoading(true);
    try {
      let res;
      res = await fetchResponse(instructorEndpoints.postAttendance(), 1, {
        date,
        attendance: attendanceData?.map((attendance) => ({
          studentId: attendance._id,
          status: attendance.status,
        })),
        instructorId,
        courseId,
      });
      const resData = res.data;
      if (!res.success) {
        toast.error(res.message, toastErrorObject);
        setIsLoading(false);
        return;
      }
      toast.success(res.message, toastSuccessObject);
      console.log("Log data", resData); 
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }

  console.log(attendanceData);
  return (
    <>
      <button
        onClick={postAttendance}
        className="btn btn-sm btn-secondary w-100 mb-3"
      >
        Post
      </button>
      <AttendanceTable
        styles={"table-bordered"}
        headers={["Roll Number", "First Name", "Last Name", "Attendance"]}
        data={attendanceData}
        setData={setAttendanceData}
        dataAttributes={["rollNumber", "fname", "lname", "status"]}
      />
    </>
  );
}
