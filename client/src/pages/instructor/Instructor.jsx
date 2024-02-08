import React from "react";
import InstructorLayout from "../../layouts/InstructorLayout";
import OneOnOneDynamicTable from "../../components/tables/OneOnOneDynamicTable";
import { useAuth } from "../../contexts/authContext";

export default function Instructor() {
  const { instructorData } = useAuth();

  return (
    <InstructorLayout>
      <OneOnOneDynamicTable
        data={[
          {
            title: "Name",
            value: instructorData.fname,
          },
          {
            title: "Email Address",
            value: instructorData.email,
          },
          {
            title: "Joining Date",
            value: instructorData.createdAt,
          },
        ]}
        styles={"bg-secondary text-white"}
      />
    </InstructorLayout>
  );
}
