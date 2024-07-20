import React, { useEffect, useState } from "react";
import AdminLayout from "../../../layouts/AdminLayout";
import { instructorEndpoints } from "../../../api/endpoints/instructorEndpoints";
import { fetchResponse } from "../../../api/service";
import { toast } from "react-toastify";
import { toastErrorObject } from "../../../utility/toasts";
import ActionDynamicTable from "../../../components/tables/ActionDynamicTable";

export default function ViewAndActionInstructor() {
  const [instructors, setInstructors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        let res;
        res = await fetchResponse(
          instructorEndpoints.getInstructors(),
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
        setInstructors(resData);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  async function handleDelete(id) {
    let result = window.confirm("Are you sure to Delete this Instructor?");
    if (!result) return;
    setIsLoading(true);
    try {
      let res;
      res = await fetchResponse(
        instructorEndpoints.deleteSingleInstructor(id),
        3,
        null
      );
      const resData = res.data;
      if (!res.success) {
        toast.error(res.message, toastErrorObject);
        setIsLoading(false);
        return;
      }
      console.log("Log data", resData);
      
      // updating state
      let duplicateArray = [...instructors];
      setInstructors(duplicateArray.filter((item) => item._id !== id));
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }

  return (
    <AdminLayout isLoading={isLoading}>
      <ActionDynamicTable
        styles={"table-bordered"}
        headers={[
          "First Name",
          "Last Name",
          "Email  Address",
          "Joining Date",
          "Action",
        ]}
        data={instructors}
        dataAttributes={["fname", "lname", "email", "createdAt", "action"]}
        handleAction={handleDelete}
      />
    </AdminLayout>
  );
}
