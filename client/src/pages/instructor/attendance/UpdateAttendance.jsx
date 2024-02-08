import React, { useEffect, useState } from "react";
import AttendanceTable from "../../../components/tables/AttendanceTable";
import { fetchResponse } from "../../../api/service";
import { instructorEndpoints } from "../../../api/endpoints/instructorEndpoints";
import { toast } from "react-toastify";
import { toastErrorObject, toastSuccessObject } from "../../../utility/toasts";

export default function UpdateAttendance({ data, setIsLoading, attendanceWhole }) {
  const [attendanceData, setAttendanceData] = useState(data);

  useEffect(() => {
    setAttendanceData(data);
  }, [data]);

  async function updateAttendance() {
    setIsLoading(true);
    try {
      let res;
      res = await fetchResponse(instructorEndpoints.editAttendance(attendanceWhole._id), 2, {
        ...attendanceWhole, attendance: attendanceData
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

  return (
    <>
    <button onClick={updateAttendance} className="btn btn-sm btn-secondary w-100 mb-3">Update</button>
    <AttendanceTable
      styles={"table-bordered"}
      headers={[
        "Roll Number",
        "First Name",
        "Last Name",
        "Attendance",
      ]}
      data={attendanceData}
      setData={setAttendanceData}
      dataAttributes={["rollNumber", "fname", "lname", "status"]}
    />
    </>
  );
}
