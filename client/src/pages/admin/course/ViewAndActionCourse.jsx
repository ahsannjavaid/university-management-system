import React, { useEffect, useState } from 'react'
import AdminLayout from '../../../layouts/AdminLayout'
import { fetchResponse } from '../../../api/service';
import { courseEndpoints } from '../../../api/endpoints/courseEndpoints';
import { toastErrorObject } from '../../../utility/toasts';
import { toast } from 'react-toastify';
import ActionDynamicTable from "../../../components/tables/ActionDynamicTable";

export default function ViewAndActionCourse() {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        let res;
        res = await fetchResponse(
          courseEndpoints.getCourses(),
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
        setCourses(resData?.sort((a, b) => a.title.localeCompare(b.title)));
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  async function handleDelete(id) {
    let result = window.confirm("Are you sure to Delete this Course?");
    if (!result) return;
    setIsLoading(true);
    try {
      let res;
      res = await fetchResponse(
        courseEndpoints.deleteSingleCourse(id),
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
      let duplicateArray = [...courses];
      setCourses(duplicateArray.filter((item) => item._id !== id));
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
          "Title",
          "Code",
          "Type",
          "Credit Hours",
          "Fee",
          "Registeration Date",
          "Action"
        ]}
        data={courses}
        dataAttributes={["title", "code", "type", "creditHours", "fee", "createdAt", "action"]}
        handleAction={handleDelete}
      />
    </AdminLayout>
  );
}
