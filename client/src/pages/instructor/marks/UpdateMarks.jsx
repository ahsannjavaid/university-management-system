import React from 'react';
import MarksTable from '../../../components/tables/MarksTable';
import { fetchResponse } from '../../../api/service';
import { instructorEndpoints } from '../../../api/endpoints/instructorEndpoints';
import { toast } from 'react-toastify';
import { toastErrorObject, toastSuccessObject } from '../../../utility/toasts';
import InputField from '../../../components/inputs/InputField';

export default function UpdateMarks({ data, setData, setIsLoading }) {
  async function updateMarks() {
    setIsLoading(true);
    try {
      let res;
      res = await fetchResponse(
        instructorEndpoints.editAcademics(data._id),
        2,
        {
          ...data,
          marks: data?.marks,
        }
      );
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
        data={data?.marks}
        setData={setData}
        dataAttributes={['rollNumber', 'name', 'obtainedMarks']}
      />
    </>
  );
}
