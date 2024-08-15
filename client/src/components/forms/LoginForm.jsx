import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Switch from '../switches/Switch';

export default function LoginForm({
  loginDetails,
  setLoginDetails,
  login,
  domain,
}) {
  const [toggle, setToggle] = useState(true);

  return (
    <form onSubmit={(event) => login(event)}>
      {domain === 'student' ? (
        <>
          <Switch
            onChange={() => {
              setToggle(!toggle);
              if (toggle)
                setLoginDetails({
                  ...loginDetails,
                  rollNumber: null,
                });
              else
                setLoginDetails({
                  ...loginDetails,
                  email: '',
                });
            }}
            value={toggle}
          />
          {toggle ? (
            <>
              <label className='form-label'>Roll Number</label>
              <input
                className='form-control mb-4'
                type='text'
                value={loginDetails.rollNumber ?? ''}
                onChange={(event) =>
                  setLoginDetails({
                    ...loginDetails,
                    rollNumber: event.target.value,
                  })
                }
                required
              />
            </>
          ) : (
            <>
              <label className='form-label'>Email Address</label>
              <input
                className='form-control mb-4'
                type='email'
                value={loginDetails.email}
                onChange={(event) =>
                  setLoginDetails({
                    ...loginDetails,
                    email: event.target.value,
                  })
                }
                required
              />
            </>
          )}
        </>
      ) : (
        <>
          <label className='form-label'>Email Address</label>
          <input
            className='form-control mb-4'
            type='email'
            value={loginDetails.email}
            onChange={(event) =>
              setLoginDetails({ ...loginDetails, email: event.target.value })
            }
            required
          />
        </>
      )}
      <label className='form-label'>Password</label>
      <input
        className='form-control mb-4'
        type='password'
        value={loginDetails.password}
        onChange={(event) =>
          setLoginDetails({ ...loginDetails, password: event.target.value })
        }
        required
      />
      {domain !== 'instructor' ? (
        <Link to={domain === 'student' ? '/student/signup' : '/admin/signup'}>
          Signup instead?
        </Link>
      ) : null}
      <div className='d-flex justify-content-center'>
        <button className='btn btn-secondary'>Login</button>
      </div>
    </form>
  );
}
