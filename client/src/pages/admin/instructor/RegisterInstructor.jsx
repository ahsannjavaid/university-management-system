import React, { useState } from "react";
import GeneralCard from "../../../components/cards/GeneralCard";
import SignupForm from "../../../components/forms/SignupForm";
import LoadingSpinner from "../../../components/spinners/LoadingSpinner";
import { fetchResponse } from "../../../api/service";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { toastSuccessObject, toastErrorObject } from "../../../utility/toasts";
import AdminLayout from "../../../layouts/AdminLayout";
import { instructorEndpoints } from "../../../api/endpoints/instructorEndpoints";

export default function RegisterInstructor() {
  const navigate = useNavigate();

  const [signupDetails, setSignupDetails] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  async function handleSignup(event) {
    event.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetchResponse(
        instructorEndpoints.registerInstructor(),
        1,
        signupDetails
      );
      const data = res.data;
      if (!res.success) {
        toast.error(res.message, toastErrorObject);
        setIsLoading(false);
        return;
      }
      toast.success(res.message, toastSuccessObject);
      console.log("Log data", data);
      navigate("/admin/instructors/action");
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
        <GeneralCard header={"Instructor Registration"}>
          <SignupForm
            signupDetails={signupDetails}
            setSignupDetails={setSignupDetails}
            signup={handleSignup}
          />
        </GeneralCard>
      </div>
    </AdminLayout>
  );
}
