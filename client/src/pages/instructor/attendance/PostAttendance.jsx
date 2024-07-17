import React, { useEffect, useState } from "react";
import InstructorLayout from "../../../layouts/InstructorLayout";
import { instructorEndpoints } from "../../../api/endpoints/instructorEndpoints";
import { courseEndpoints } from "../../../api/endpoints/courseEndpoints";
import { fetchResponse } from "../../../api/service";
import { toast } from "react-toastify";
import { toastErrorObject } from "../../../utility/toasts";
import LoadingSpinner from "../../../components/spinners/LoadingSpinner";
import UpdateAttendance from "./UpdateAttendance";
import SelectField from "../../../components/inputs/SelectField";
import InputField from "../../../components/inputs/InputField";
import moment from "moment";
import MarkAttendance from "./MarkAttendance";

export default function PostAttendance() {
  const instructorId = JSON.parse(localStorage.getItem("instructor"))._id;
  const uniqueCourseIds = {};

  const [attendances, setAttendances] = useState([]);
  const [studentsAttendance, setStudentsAttendance] = useState([]);
  const [selectedAttendance, setSelectedAttendance] = useState(null);
  const [temporarySelection, setTemporarySelection] = useState({
    date: moment(Date.now()).format("YYYY-MM-DD"),
    course: "",
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        let res;
        res = await fetchResponse(
          instructorEndpoints.getAttendances(instructorId),
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
        setAttendances(resData);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    }
    fetchData();
    async function fetchStudents() {
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
        setStudentsAttendance(
          resData.map((student) => ({
            ...student,
            studentId: student._id,
            name: student.fname + " " + student.lname,
            status: "N/A",
          }))
        );
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    }
    fetchStudents();
    if (temporarySelection.date && temporarySelection.course) {
      let duplicateObject = attendances.filter(
        (attendance) =>
          moment(attendance?.date).format("YYYY-MM-DD") ===
            temporarySelection.date &&
          attendance?.course._id === temporarySelection.course
      )[0];
      setSelectedAttendance(duplicateObject);
    } else {
      setSelectedAttendance(null);
    }
    // eslint-disable-next-line
  }, [instructorId, selectedAttendance, temporarySelection]);

  if (isLoading) return <LoadingSpinner />;

  return (
    <InstructorLayout>
      <div className="row mb-4">
        <div className="col">
          <InputField
            label={"Select Date"}
            type={"date"}
            value={temporarySelection?.date}
            onChange={(event) =>
              setTemporarySelection({
                ...temporarySelection,
                date: event.target.value,
              })
            }
          />
        </div>
        <div className="col">
          <SelectField
            label={"Select Course"}
            options={attendances
              .filter((attendance) => {
                const courseId = attendance.course._id;
                if (!uniqueCourseIds[courseId]) {
                  uniqueCourseIds[courseId] = true;
                  return true;
                }
                return false;
              })
              .map((attendance) => ({
                value: attendance.course._id,
                title: attendance.course.title,
              }))}
            value={temporarySelection?.course}
            onChange={(event) =>
              setTemporarySelection({
                ...temporarySelection,
                course: event.target.value,
              })
            }
          />
        </div>
      </div>
      {selectedAttendance ? (
        <UpdateAttendance data={selectedAttendance?.attendance?.map(attendance => ({ ...attendance, name: attendance.fname + " " + attendance.lname }))} attendanceWhole={selectedAttendance} setIsLoading={setIsLoading} />
      ) : (
        <MarkAttendance
          data={studentsAttendance}
          date={temporarySelection.date}
          courseId={temporarySelection.course}
          instructorId={instructorId}
          setIsLoading={setIsLoading}
        />
      )}
    </InstructorLayout>
  );
}
