import React from 'react';
import DynamicNavbar from '../components/navbars/DynamicNavbar';
import { useAuth } from '../contexts/authContext';
import LoadingSpinner from '../components/spinners/LoadingSpinner';

export default function InstructorLayout({ isLoading, children }) {
  const { setInstructorData } = useAuth();

  return (
    <>
      <DynamicNavbar
        options={[
          {
            title: 'Home',
            path: '/instructor',
          },
          {
            title: 'Students',
            path: '/instructor/students',
          },
          {
            title: 'Marks',
            path: [
              '/instructor/marks/post',
              '/instructor/marks/view-or-update',
            ],
            children: [
              {
                title: 'Post',
                path: '/instructor/marks/post',
              },
              {
                title: 'View/Update',
                path: '/instructor/marks/view-or-update',
              },
            ],
          },
          {
            title: 'Attendance',
            path: '/instructor/attendance',
          },
          {
            title: 'Courses',
            path: '/instructor/courses',
          },
          {
            title: 'Settings',
            path: '/instructor/settings',
          },
        ]}
        functionalItem={{
          title: 'Logout',
          function: () => {
            setInstructorData(null);
            localStorage.removeItem('instructor');
          },
        }}
      />
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className='container mt-4'>{children}</div>
      )}
    </>
  );
}
