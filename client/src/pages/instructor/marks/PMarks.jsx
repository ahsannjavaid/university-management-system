import React, { useEffect, useState } from 'react';
import InstructorLayout from '../../../layouts/InstructorLayout';
import { fetchResponse } from '../../../api/service';
import { toast } from 'react-toastify';
import { toastErrorObject } from '../../../utility/toasts';
import { courseEndpoints } from '../../../api/endpoints/courseEndpoints';
import SelectField from '../../../components/inputs/SelectField';
// import UpdateMarks from "./UpdateMarks";
import MarkMarks from './MarkMarks';
import InputField from '../../../components/inputs/InputField';
import { examTypes } from '../../../utility/constants';

export default function PMarks() {
  const instructorId = JSON.parse(localStorage.getItem('instructor'))._id;
  const uniqueCourseIds = {};

  const [studentsMarks, setStudentsMarks] = useState([]);
  const [temporarySelection, setTemporarySelection] = useState({
    course: '',
    examType: '',
    activityNumber: '',
    totalMarks: '',
    weightage: '',
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
      <div className='row'>
        <div
          className='col-md col-md-3 overflow-auto'
          style={{ maxHeight: '83vh' }}
        >
          <div className='pt-2 p-3 mb-2 border rounded'>
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
          <div className='pt-2 p-3 mb-2 border rounded'>
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
          <div className='pt-2 p-3 mb-2 border rounded'>
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
              min={0}
            />
          </div>
          <div className='pt-2 p-3 mb-2 border rounded'>
            <InputField
              label={'Enter Total Points'}
              type={'number'}
              value={temporarySelection.totalMarks}
              onChange={(event) =>
                setTemporarySelection({
                  ...temporarySelection,
                  totalMarks: event.target.value,
                })
              }
              required={true}
              min={0}
            />
          </div>
          <div className='pt-2 p-3 border rounded'>
            <InputField
              label={'Enter Weightage'}
              type={'number'}
              value={temporarySelection.weightage}
              onChange={(event) =>
                setTemporarySelection({
                  ...temporarySelection,
                  weightage: event.target.value,
                })
              }
              required={true}
              min={0}
            />
          </div>
        </div>
        <div className='col-md col-md-9 pt-4 pt-md-0 overflow-auto'
          style={{ maxHeight: '83vh' }}>
          <MarkMarks
            data={studentsMarks.filter(
              (student) => student.courseId === temporarySelection.course
            )}
            setData={setStudentsMarks}
            courseId={temporarySelection.course}
            instructorId={instructorId}
            setIsLoading={setIsLoading}
            examType={temporarySelection.examType}
            activityNumber={temporarySelection.activityNumber}
            weightage={temporarySelection.weightage}
            totalMarks={temporarySelection.totalMarks}
          />
        </div>
      </div>
    </InstructorLayout>
  );
}
