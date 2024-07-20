import React, { useEffect, useState } from 'react';
import InstructorLayout from '../../../layouts/InstructorLayout';
import { fetchResponse } from '../../../api/service';
import { instructorEndpoints } from '../../../api/endpoints/instructorEndpoints';
import { toast } from 'react-toastify';
import { toastErrorObject } from '../../../utility/toasts';
import { courseEndpoints } from '../../../api/endpoints/courseEndpoints';
import SelectField from '../../../components/inputs/SelectField';
import UpdateMarks from './UpdateMarks';
import { examTypes } from '../../../utility/constants';
import InputField from '../../../components/inputs/InputField';

export default function ViewMarks() {
  const instructorId = JSON.parse(localStorage.getItem('instructor'))._id;
  const uniqueCourseIds = {};

  const [academics, setAcademics] = useState(null);
  const [students, setStudents] = useState([]);
  const [temporarySelection, setTemporarySelection] = useState({
    course: '',
    examType: '',
    activityNumber: '',
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
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
        console.log('Log data (Instructor Students)', resData);
        setStudents(resData);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    }
    fetchStudents();
  }, [instructorId]);

  useEffect(() => {
    async function fetchData() {
      try {
        let res;
        res = await fetchResponse(
          instructorEndpoints.getAcademics(
            instructorId,
            temporarySelection.course,
            temporarySelection.examType,
            temporarySelection.activityNumber
          ),
          0,
          null
        );
        const resData = res.data;
        if (!res.success) {
          toast.error(res.message, toastErrorObject);
          setIsLoading(false);
          return;
        }
        console.log('Log data (Academics)', resData);
        setAcademics(resData ? {
          ...resData,
          marks: resData?.marks?.map((m) => ({
            ...m,
            name: m.fname + ' ' + m.lname,
          })),
        } : null);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    }
    if (
      temporarySelection.course &&
      temporarySelection.examType &&
      temporarySelection.activityNumber
    )
      fetchData();
  }, [instructorId, temporarySelection]);

  return (
    <InstructorLayout isLoading={isLoading}>
      <div className='row mb-4'>
        <div className='col-md col-md-6'>
          <SelectField
            label={'Select Course'}
            options={students
              .filter((student) => {
                const courseId = student.courseId;
                if (!uniqueCourseIds[courseId]) {
                  uniqueCourseIds[courseId] = true;
                  return true;
                }
                return false;
              })
              .map((student) => ({
                value: student.courseId,
                title: student.courseTitle,
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
        <div className='col-md col-md-3'>
          <SelectField
            label={'Select Exam Type'}
            options={examTypes?.map((exam) => ({ value: exam, title: exam }))}
            value={temporarySelection?.examType}
            onChange={(event) =>
              setTemporarySelection({
                ...temporarySelection,
                examType: event.target.value,
              })
            }
          />
        </div>
        <div className='col-md col-md-3'>
          <InputField
            label={'Enter Activity Number'}
            type={'number'}
            value={temporarySelection.activityNumber}
            onChange={(event) =>
              setTemporarySelection({
                ...temporarySelection,
                activityNumber: event.target.value,
              })
            }
            required={true}
            min={1}
          />
        </div>
      </div>
      <UpdateMarks data={academics} setData={setAcademics} setIsLoading={setIsLoading} />
    </InstructorLayout>
  );
}
