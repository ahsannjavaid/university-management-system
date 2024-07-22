export const instructorNavbarContent = (setInstructorData) => ({
  options: [
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
      path: ['/instructor/marks/post', '/instructor/marks/view-or-update'],
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
  ],
  functionalItem: {
    title: 'Logout',
    function: () => {
      setInstructorData(null);
      localStorage.removeItem('instructor');
    },
  },
});

export const studentNavbarContent = (setStudentData) => ({
  options: [
    {
      title: 'Home',
      path: '/student',
    },
    {
      title: 'Courses',
      path: '/student/courses',
    },
    {
      title: 'Register Course',
      path: '/student/register/course',
    },
    {
      title: 'Attendance',
      path: '/student/attendance',
    },
    {
      title: 'Marks',
      path: '/student/marks',
    },
    {
      title: 'Settings',
      path: '/student/settings',
    },
  ],
  functionalItem: {
    title: 'Logout',
    function: () => {
      setStudentData(null);
      localStorage.removeItem('student');
    },
  },
});

export const adminNavbarContent = (setAdminData) => ({
  options: [
    {
      title: 'Home',
      path: '/admin',
    },
    {
      title: 'Register Instructor',
      path: '/admin/instructors/register',
    },
    {
      title: 'Instructors',
      path: '/admin/instructors/action',
    },
    {
      title: 'Register Course',
      path: '/admin/courses/register',
    },
    {
      title: 'Courses',
      path: '/admin/courses/action',
    },
    {
      title: 'Settings',
      path: '/admin/settings',
    },
  ],
  functionalItem: {
    title: 'Logout',
    function: () => {
      setAdminData(null);
      localStorage.removeItem('admin');
    },
  },
});
