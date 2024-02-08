import React, { useState } from "react";
import HomeLayout from "../../layouts/HomeLayout";
import GeneralCard from "../../components/cards/GeneralCard";
import SignupForm from "../../components/forms/SignupForm";
import LoadingSpinner from "../../components/spinners/LoadingSpinner";
import { adminEndpoints } from "../../api/endpoints/adminEndpoints";
import { fetchResponse } from "../../api/service";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { toastSuccessObject, toastErrorObject } from "../../utility/toasts";

export default function AdminSignup() {
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
        adminEndpoints.registerAdmin(),
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
      navigate("/admin/login");
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }

  if (isLoading) return <LoadingSpinner />;

  return (
    <HomeLayout>
      <GeneralCard header={"Admin Signup"}>
        <SignupForm
          signupDetails={signupDetails}
          setSignupDetails={setSignupDetails}
          signup={handleSignup}
        />
      </GeneralCard>
    </HomeLayout>
  );
}
