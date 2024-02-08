import React from "react";
import { Link, NavLink } from "react-router-dom";

export default function DynamicNavbar({ options, functionalItem }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-secondary">
      <div className="container">
        <Link to={"/"} className="navbar-brand">
          UMS
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 mx-auto">
            {options.map((option, index) => {
              return (
                <li key={index} className="nav-item">
                  <NavLink
                    to={option.path}
                    className="nav-link"
                    aria-current="page"
                  >
                    {option.title}
                  </NavLink>
                </li>
              );
            })}
            {functionalItem ? (
              <li onClick={functionalItem.function} className="nav-item">
                <Link className="nav-link" aria-current="page">
                  {functionalItem.title}
                </Link>
              </li>
            ) : null}
          </ul>
        </div>
      </div>
    </nav>
  );
}
