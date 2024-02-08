import React, { useState } from "react";
import HomeLayout from "../../layouts/HomeLayout";
import GeneralCard from "../../components/cards/GeneralCard";
import LoginForm from "../../components/forms/LoginForm";
import LoadingSpinner from "../../components/spinners/LoadingSpinner";
import { fetchResponse } from "../../api/service";
import { studentEndpoints } from "../../api/endpoints/studentEndpoints";
import { toastErrorObject, toastSuccessObject } from "../../utility/toasts";
import { toast } from "react-toastify";
import { useAuth } from "../../contexts/authContext";
import { useNavigate } from "react-router-dom";

export default function StudentLogin() {
  const { setStudentData } = useAuth();

  const navigate = useNavigate();

  const [loginDetails, setLoginDetails] = useState({
    email: "",
    rollNumber: null,
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  async function handleLogin(event) {
    event.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetchResponse(
        studentEndpoints.loginStudent(),
        1,
        loginDetails
      );
      const data = res.data;
      if (!res.success) {
        toast.error(res.message, toastErrorObject);
        setIsLoading(false);
        return;
      }
      toast.success(res.message, toastSuccessObject);
      console.log("Log data", data);
      setStudentData(data);
      localStorage.setItem("student", JSON.stringify(data));
      navigate("/student");
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }

  if (isLoading) return <LoadingSpinner />

  return (
    <HomeLayout>
      <GeneralCard header={"Student Login"}>
        <LoginForm loginDetails={loginDetails} setLoginDetails={setLoginDetails} login={handleLogin} domain={"student"} />
      </GeneralCard>
    </HomeLayout>
  );
}
