import React from 'react';
import { useAuth } from '../contexts/authContext';
import Layout from './Layout';
import {
  instructorNavbarContent,
} from '../utility/navbar';

export default function InstructorLayout({ isLoading, children }) {
  const { setInstructorData } = useAuth();
  const { options, functionalItem } =
    instructorNavbarContent(setInstructorData);

  return (
    <Layout
      isLoading={isLoading}
      navbarOptions={options}
      navbarFunctionalItem={functionalItem}
    >
      <div className='container mt-4'>{children}</div>
    </Layout>
  );
}
