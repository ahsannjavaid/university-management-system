import React from "react";

export default function SignupForm({
  signupDetails,
  setSignupDetails,
  signup,
  update
}) {
  console.log(signupDetails)
  return (
    <form onSubmit={(event) => signup(event)}>
      <div className="row">
        <div className="col">
          <label className="form-label">First Name</label>
          <input
            className="form-control mb-4"
            type="text"
            value={signupDetails.fname}
            onChange={(event) =>
              setSignupDetails({
                ...signupDetails,
                fname: event.target.value,
              })
            }
            required
          />
        </div>
        <div className="col">
          <label className="form-label">Last Name</label>
          <input
            className="form-control mb-4"
            type="text"
            value={signupDetails.lname}
            onChange={(event) =>
              setSignupDetails({
                ...signupDetails,
                lname: event.target.value,
              })
            }
            required
          />
        </div>
      </div>
      <label className="form-label">Email</label>
      <input
        className="form-control mb-4"
        type="email"
        value={signupDetails.email}
        onChange={(event) =>
          setSignupDetails({ ...signupDetails, email: event.target.value })
        }
        required
      />
      <label className="form-label">Password</label>
      <input
        className="form-control mb-4"
        type="password"
        value={signupDetails.password}
        onChange={(event) =>
          setSignupDetails({
            ...signupDetails,
            password: event.target.value,
          })
        }
        required
      />
      <div className="d-flex justify-content-center">
        <button className="btn btn-secondary">{update ? "Update" : "Register"}</button>
      </div>
    </form>
  );
}
