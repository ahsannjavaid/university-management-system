import React, { useEffect, useState } from 'react';
import InstructorLayout from '../../../layouts/InstructorLayout';
import { fetchResponse } from '../../../api/service';
import { instructorEndpoints } from '../../../api/endpoints/instructorEndpoints';
import { toast } from 'react-toastify';
import { toastErrorObject } from '../../../utility/toasts';
import { courseEndpoints } from '../../../api/endpoints/courseEndpoints';
import SelectField from '../../../components/inputs/SelectField';
// import UpdateMarks from "./UpdateMarks";
import MarkMarks from './MarkMarks';

export default function PMarks() {
  const instructorId = JSON.parse(localStorage.getItem('instructor'))._id;
  const uniqueCourseIds = {};
  const uniqueExamTypes = {};
  const uniqueActivityNumbers = {};

  const [academics, setAcademics] = useState([]);
  const [studentsMarks, setStudentsMarks] = useState([]);
  const [temporarySelection, setTemporarySelection] = useState({
    examType: '',
    activityNumber: '',
    course: '',
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
        console.log('Log data', resData);
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
        console.log('Log data', resData);
        setStudentsMarks(
          resData.map((student) => ({
            ...student,
            studentId: student._id,
            name: student.fname + ' ' + student.lname,
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
  }, [instructorId]);

  return (
    <InstructorLayout isLoading={isLoading}>
      <div className='row mb-4'>
        <div className='col col-4'>
          <SelectField
            label={'Select Exam Type'}
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
        <div className='col col-2'>
          <SelectField
            label={'Select Activity Number'}
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
        <div className='col col-6'>
          <SelectField
            label={'Select Course'}
            options={studentsMarks
              .filter((marks) => {
                const courseId = marks.courseId;
                if (!uniqueCourseIds[courseId]) {
                  uniqueCourseIds[courseId] = true;
                  return true;
                }
                return false;
              })
              .map((marks) => ({
                value: marks.courseId,
                title: marks.courseTitle,
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
      {/* {selectedMarks ? (
        <UpdateMarks data={selectedMarks?.marks} marksWhole={selectedMarks} setIsLoading={setIsLoading} />
      ) : ( */}
      <MarkMarks
        data={studentsMarks.filter(
          (student) => student.courseId === temporarySelection.course
        )}
        date={temporarySelection.date}
        courseId={temporarySelection.course}
        instructorId={instructorId}
        setIsLoading={setIsLoading}
      />
      {/* )} */}
    </InstructorLayout>
  );
}
