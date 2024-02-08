import React, { useEffect, useState } from 'react'
import InstructorLayout from '../../../layouts/InstructorLayout'
import { fetchResponse } from '../../../api/service';
import { instructorEndpoints } from '../../../api/endpoints/instructorEndpoints';
import { toast } from 'react-toastify';
import { toastErrorObject } from '../../../utility/toasts';
import { courseEndpoints } from '../../../api/endpoints/courseEndpoints';
import LoadingSpinner from '../../../components/spinners/LoadingSpinner';
import SelectField from '../../../components/inputs/SelectField';
import UpdateMarks from "./UpdateMarks";
import MarkMarks from "./MarkMarks";

export default function PostMarks() {
  const instructorId = JSON.parse(localStorage.getItem("instructor"))._id;
  const uniqueCourseIds = {};
  const uniqueExamTypes = {};
  const uniqueActivityNumbers = {};

  const [academics, setAcademics] = useState([]);
  const [studentsMarks, setStudentsMarks] = useState([]);
  const [selectedMarks, setSelectedMarks] = useState(null);
  const [temporarySelection, setTemporarySelection] = useState({
    examType: "",
    activityNumber: "",
    course: "",
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        let res;
        res = await fetchResponse(
          instructorEndpoints.getAcademics(instructorId),
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
        setAcademics(resData);
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
        setStudentsMarks(
          resData.map((student) => ({
            ...student,
            studentId: student._id,
            obtainedMarks: 0,
          }))
        );
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    }
    fetchStudents();
    if (temporarySelection.examType && temporarySelection.activityNumber && temporarySelection.course) {
      let duplicateObject = academics.filter(
        (marks) =>
        marks?.examType === temporarySelection.examType &&
        marks?.activityNumber === temporarySelection.activityNumber &&
        marks?.course._id === temporarySelection.course
      )[0];
      setSelectedMarks(duplicateObject);
    } else {
      setSelectedMarks(null);
    }
    // eslint-disable-next-line
  }, [instructorId, selectedMarks, temporarySelection]);
console.log("check", selectedMarks)
  if (isLoading) return <LoadingSpinner />;

  return (
    <InstructorLayout>
      <div className="row mb-4">
      <div className="col">
        <SelectField
            label={"Select Exam Type"}
            options={academics
              .filter((marks) => {
                const examType = marks.examType;
                if (!uniqueExamTypes[examType]) {
                  uniqueExamTypes[examType] = true;
                  return true;
                }
                return false;
              })
              .map((marks) => ({
                value: marks.examType,
                title: marks.examType,
              }))}
            value={temporarySelection?.examType}
            onChange={(event) =>
              setTemporarySelection({
                ...temporarySelection,
                examType: event.target.value,
              })
            }
          />
        </div>
        <div className="col">
        <SelectField
            label={"Select Activity Number"}
            options={academics
              .filter((marks) => {
                const activityNumber = marks.activityNumber;
                if (!uniqueActivityNumbers[activityNumber]) {
                  uniqueActivityNumbers[activityNumber] = true;
                  return true;
                }
                return false;
              })
              .map((marks) => ({
                value: marks.activityNumber,
                title: marks.activityNumber,
              }))}
            value={temporarySelection?.activityNumber}
            onChange={(event) =>
              setTemporarySelection({
                ...temporarySelection,
                activityNumber: event.target.value,
              })
            }
          />
        </div>
        <div className="col">
        <SelectField
            label={"Select Course"}
            options={academics
              .filter((marks) => {
                const courseId = marks.course._id;
                if (!uniqueCourseIds[courseId]) {
                  uniqueCourseIds[courseId] = true;
                  return true;
                }
                return false;
              })
              .map((marks) => ({
                value: marks.course._id,
                title: marks.course.title,
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
      {selectedMarks ? (
        <UpdateMarks data={selectedMarks?.marks} marksWhole={selectedMarks} setIsLoading={setIsLoading} />
      ) : (
        <MarkMarks
          data={studentsMarks}
          date={temporarySelection.date}
          courseId={temporarySelection.course}
          instructorId={instructorId}
          setIsLoading={setIsLoading}
        />
      )}
    </InstructorLayout>
  )
}
