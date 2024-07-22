import React from 'react';
import DynamicNavbar from '../components/navbars/DynamicNavbar';
import LoadingSpinner from '../components/spinners/LoadingSpinner';

export default function Layout({ isLoading, navbarOptions, navbarFunctionalItem, children }) {
  return (
    <div className='d-flex flex-column vh-100'>
      <div className='flex-shrink-0'>
        <DynamicNavbar options={navbarOptions} functionalItem={navbarFunctionalItem} />
      </div>
      <div className='row m-0 flex-grow-1 overflow-auto'>
        {isLoading ? <LoadingSpinner /> : <>{children}</>}
      </div>
    </div>
  );
}
