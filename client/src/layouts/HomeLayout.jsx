import React from 'react';
import Layout from './Layout';

export default function HomeLayout({ isLoading, children }) {
  return (
    <Layout isLoading={isLoading}>
      <div className='d-flex align-items-center justify-content-center flex-column flex-md-row gap-5 my-5 my-md-0'>
        {children}
      </div>
    </Layout>
  );
}
