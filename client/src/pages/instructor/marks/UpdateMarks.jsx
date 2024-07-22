import React, { useEffect, useState } from 'react';
import MarksTable from '../../../components/tables/MarksTable';
import { fetchResponse } from '../../../api/service';
import { instructorEndpoints } from '../../../api/endpoints/instructorEndpoints';
import { toast } from 'react-toastify';
import { toastErrorObject, toastSuccessObject } from '../../../utility/toasts';
import InputField from '../../../components/inputs/InputField';

export default function UpdateMarks({ data, setData }) {
  const [ marksData, setMarksData ] = useState(data?.marks);

  useEffect(() => {
    const sortedStudents = data?.marks?.sort((a, b) => {
      const fnameComparison = a.fname.localeCompare(b.fname);
      if (fnameComparison !== 0) {
        return fnameComparison;
      }
      return a.lname.localeCompare(b.lname);
    });
    setMarksData(sortedStudents);
  }, [data?.marks]);

  async function updateMarks() {
    try {
      let res;
      res = await fetchResponse(
        instructorEndpoints.editAcademics(data._id),
        2,
        {
          ...data,
          marks: marksData,
        }
      );
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
        onClick={updateMarks}
        className='btn btn-sm btn-secondary w-100 mb-3'
      >
        Update
      </button>
      {data ? (
        <div className='row mb-4'>
          <div className='col-md'>
            <InputField
              label={'Total Marks'}
              type={'number'}
              value={data?.totalMarks ?? ''}
              onChange={(event) =>
                setData({
                  ...data,
                  totalMarks: event.target.value,
                })
              }
              required={true}
              min={1}
            />
          </div>
          <div className='col-md'>
            <InputField
              label={'Weightage'}
              type={'number'}
              value={data?.weightage ?? ''}
              onChange={(event) =>
                setData({
                  ...data,
                  weightage: event.target.value,
                })
              }
              required={true}
              min={0}
            />
          </div>
        </div>
      ) : null}
      <MarksTable
        styles={'table-bordered'}
        headers={['Roll Number', 'Name', 'Obtained Marks']}
        data={marksData}
        setData={setMarksData}
        dataAttributes={['rollNumber', 'name', 'obtainedMarks']}
      />
    </>
  );
}
