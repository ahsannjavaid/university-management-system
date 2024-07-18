import React, { useEffect, useState } from 'react';
import AttendanceTable from '../../../components/tables/AttendanceTable';
import { fetchResponse } from '../../../api/service';
import { instructorEndpoints } from '../../../api/endpoints/instructorEndpoints';
import { toastErrorObject, toastSuccessObject } from '../../../utility/toasts';
import { toast } from 'react-toastify';

export default function MarkAttendance({ data, date, courseId, instructorId }) {
  const [attendanceData, setAttendanceData] = useState(data);

  useEffect(() => {
    setAttendanceData(
      data?.filter((student) => student?.courseId === courseId)
    );
  }, [data, courseId]);

  async function postAttendance() {
    if (!courseId) {
      alert('Please Select a Course.');
      return;
    }
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
        return;
      }
      toast.success(res.message, toastSuccessObject);
      console.log('Log data', resData);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <button
        onClick={postAttendance}
        className='btn btn-sm btn-secondary w-100 mb-3'
      >
        Post
      </button>
      <AttendanceTable
        styles={'table-bordered'}
        headers={['Roll Number', 'Name', 'Attendance']}
        data={attendanceData}
        setData={setAttendanceData}
        dataAttributes={['rollNumber', 'name', 'status']}
      />
    </>
  );
}
