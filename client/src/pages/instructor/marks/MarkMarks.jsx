import React, { useEffect, useState } from "react";
import { fetchResponse } from "../../../api/service";
import { instructorEndpoints } from "../../../api/endpoints/instructorEndpoints";
import { toastErrorObject, toastSuccessObject } from "../../../utility/toasts";
import { toast } from "react-toastify";
import MarksTable from "../../../components/tables/MarksTable";

export default function MarkMarks({
  data,
  date,
  courseId,
  instructorId,
  setIsLoading,
  examType,
  activityNumber,
  weightage,
  totalMarks,
}) {
  const [marksData, setMarksData] = useState(data);

  useEffect(() => {
    setMarksData(data);
  }, [data]);

  async function postAttendance() {
    if (!courseId) {
      alert("Please Select a Course.");
      return;
    }
    setIsLoading(true);
    try {
      let res;
      res = await fetchResponse(instructorEndpoints.postAcademics(), 1, {
        examType,
        totalMarks,
        activityNumber,
        weightage,
        marks: marksData?.map((marks) => ({
          studentId: marks._id,
          obtainedMarks: marks.obtainedMarks,
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

  console.log(marksData);
  return (
    <>
      <button
        onClick={postAttendance}
        className="btn btn-sm btn-secondary w-100 mb-3"
      >
        Post
      </button>
      <MarksTable
        styles={"table-bordered"}
        headers={["Roll Number", "First Name", "Last Name", "Marks"]}
        data={marksData}
        setData={setMarksData}
        dataAttributes={["rollNumber", "fname", "lname", "obtainedMarks"]}
      />
    </>
  );
}
