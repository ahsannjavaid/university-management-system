import React from 'react';
import { useAuth } from '../contexts/authContext';
import Layout from './Layout';
import { adminNavbarContent } from '../utility/navbar';

export default function AdminLayout({ isLoading, children }) {
  const { setAdminData } = useAuth();
  const { options, functionalItem } = adminNavbarContent(setAdminData);

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
