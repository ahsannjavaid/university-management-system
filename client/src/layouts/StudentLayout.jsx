import React from 'react';
import { useAuth } from '../contexts/authContext';
import Layout from './Layout';
import { studentNavbarContent } from '../utility/navbar';

export default function StudentLayout({ isLoading, children }) {
  const { setStudentData } = useAuth();
  const { options, functionalItem } = studentNavbarContent(setStudentData);

  return (
    <Layout
      isLoading={isLoading}
      navbarOptions={options}
      navbarFunctionalItem={functionalItem}
    >
      <div className='mt-4'>{children}</div>
    </Layout>
  );
}
