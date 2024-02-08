import React from "react";
import AdminLayout from "../../layouts/AdminLayout";
import { useAuth } from "../../contexts/authContext";
import OneOnOneDynamicTable from "../../components/tables/OneOnOneDynamicTable";

export default function Admin() {
  const { adminData } = useAuth();

  return (
    <AdminLayout>
      <OneOnOneDynamicTable
        data={[
          {
            title: "Name",
            value: adminData.fname
          },
          {
            title: "Email Address",
            value: adminData.email
          },
          {
            title: "Joining Date",
            value: adminData.createdAt
          },
        ]}
        styles={"bg-secondary text-white"}
      />
    </AdminLayout>
  );
}
