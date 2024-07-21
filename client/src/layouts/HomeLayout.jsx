import React from 'react';
import DynamicNavbar from '../components/navbars/DynamicNavbar';
import LoadingSpinner from '../components/spinners/LoadingSpinner';

export default function HomeLayout({ isLoading, children }) {
  return (
    <>
      <DynamicNavbar options={[]} />
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div
          className='d-flex align-items-center justify-content-center flex-column flex-md-row'
          style={{ minHeight: '91vh' }}
        >
          {children}
        </div>
      )}
    </>
  );
}
