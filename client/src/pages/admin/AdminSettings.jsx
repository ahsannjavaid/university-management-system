import React, { useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import GeneralCard from "../../components/cards/GeneralCard";
import SignupForm from "../../components/forms/SignupForm";
import LoadingSpinner from "../../components/spinners/LoadingSpinner";
import { adminEndpoints } from "../../api/endpoints/adminEndpoints";
import { fetchResponse } from "../../api/service";
import { toastErrorObject, toastSuccessObject } from "../../utility/toasts";
import { toast } from "react-toastify";
import { useAuth } from "../../contexts/authContext";

export default function AdminSettings() {
  const adminId = JSON.parse(localStorage.getItem("admin"))._id;

  const { adminData, setAdminData } = useAuth();

  const [adminDetails, setAdminDetails] = useState({
    fname: adminData?.fname,
    lname: adminData?.lname,
    email: adminData?.email,
    password: adminData?.password,
  });
  const [isLoading, setIsLoading] = useState(false);

  async function handleUpdate(event) {
    event.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetchResponse(
        adminEndpoints.editAdmin(adminId),
        2,
        adminDetails
      );
      const data = res.data;
      if (!res.success) {
        toast.error(res.message, toastErrorObject);
        setIsLoading(false);
        return;
      }
      toast.success(res.message, toastSuccessObject);

      // state update
      let updatedData = {
        ...adminData,
        fname: adminDetails.fname,
        lname: adminDetails.lname,
        email: adminDetails.email,
        password: adminDetails.password,
      }
      setAdminData(updatedData);
      localStorage.setItem("admin", JSON.stringify(updatedData));
      console.log("Log data", data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }

  if (isLoading) return <LoadingSpinner />;

  return (
    <AdminLayout>
      <div
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "81vh" }}
      >
        <GeneralCard header={"Edit Information"}>
          <SignupForm
            signupDetails={adminDetails}
            setSignupDetails={setAdminDetails}
            signup={handleUpdate}
            update={true}
          />
        </GeneralCard>
      </div>
    </AdminLayout>
  );
}
