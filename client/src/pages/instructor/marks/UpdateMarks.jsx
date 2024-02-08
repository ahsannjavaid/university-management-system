import React, { useEffect, useState } from "react";
import MarksTable from "../../../components/tables/MarksTable";
import { fetchResponse } from "../../../api/service";
import { instructorEndpoints } from "../../../api/endpoints/instructorEndpoints";
import { toast } from "react-toastify";
import { toastErrorObject, toastSuccessObject } from "../../../utility/toasts";

export default function UpdateMarks({ data, setIsLoading, marksWhole }) {
  const [marksData, setMarksData] = useState(data);

  useEffect(() => {
    setMarksData(data);
  }, [data]);

  async function updateMarks() {
    setIsLoading(true);
    try {
      let res;
      res = await fetchResponse(instructorEndpoints.editAcademics(marksWhole._id), 2, {
        ...marksWhole, marks: marksData
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

  return (
    <>
    <button onClick={updateMarks} className="btn btn-sm btn-secondary w-100 mb-3">Update</button>
    <MarksTable
      styles={"table-bordered"}
      headers={[
        "Roll Number",
        "First Name",
        "Last Name",
        "Marks",
      ]}
      data={marksData}
      setData={setMarksData}
      dataAttributes={["rollNumber", "fname", "lname", "obtainedMarks"]}
    />
    </>
  );
}
