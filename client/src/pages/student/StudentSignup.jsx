import React, { useState } from 'react';
import HomeLayout from '../../layouts/HomeLayout';
import GeneralCard from '../../components/cards/GeneralCard';
import SignupForm from '../../components/forms/SignupForm';
import { studentEndpoints } from '../../api/endpoints/studentEndpoints';
import { fetchResponse } from '../../api/service';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { toastSuccessObject, toastErrorObject } from '../../utility/toasts';

export default function StudentSignup() {
  const navigate = useNavigate();

  const [signupDetails, setSignupDetails] = useState({
    fname: '',
    lname: '',
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  async function handleSignup(event) {
    event.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetchResponse(
        studentEndpoints.registerStudent(),
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
      console.log('Log data', data);
      navigate('/student/login');
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }

  return (
    <HomeLayout isLoading={isLoading}>
      <GeneralCard header={'Student Signup'}>
        <SignupForm
          signupDetails={signupDetails}
          setSignupDetails={setSignupDetails}
          signup={handleSignup}
        />
      </GeneralCard>
    </HomeLayout>
  );
}
