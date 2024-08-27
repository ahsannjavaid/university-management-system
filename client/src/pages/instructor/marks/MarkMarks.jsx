import React from 'react';
import { fetchResponse } from '../../../api/service';
import { instructorEndpoints } from '../../../api/endpoints/instructorEndpoints';
import { toastErrorObject, toastSuccessObject } from '../../../utility/toasts';
import { toast } from 'react-toastify';
import MarksTable from '../../../components/tables/MarksTable';

export default function MarkMarks({
  data,
  setData,
  courseId,
  instructorId,
  setIsLoading,
  examType,
  activityNumber,
  weightage,
  totalMarks,
}) {

  async function postMarks() {
    setIsLoading(true);
    try {
      let res;
      res = await fetchResponse(instructorEndpoints.postAcademics(), 1, {
        examType,
        totalMarks: parseFloat(totalMarks),
        activityNumber,
        weightage,
        marks: data?.map((marks) => ({
          studentId: marks._id,
          obtainedMarks: parseFloat(marks.obtainedMarks),
          isPublic: marks.isPublic,
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
      console.log('Log data', resData);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }

  return (
    <>
      <button
        onClick={postMarks}
        className='btn btn-sm btn-secondary w-100 mb-3'
      >
        Post
      </button>
      <MarksTable
        styles={'table-bordered'}
        headers={['Roll Number', 'Name', 'Marks']}
        data={data}
        setData={setData}
        dataAttributes={['rollNumber', 'name', 'obtainedMarks']}
        totalMarks={totalMarks}
      />
    </>
  );
}
