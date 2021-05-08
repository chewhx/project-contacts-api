import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarTogglerDemo01"
          aria-controls="navbarTogglerDemo01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <a className="navbar-brand" href="/">
            PROJECT-CONTACTS-API
          </a>
          <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
            <NavLink to={"/"}>
              <li className="nav-item nav-link active">GET</li>
            </NavLink>
            <NavLink to={"/post"}>
              <li className="nav-item nav-link active">POST</li>
            </NavLink>

            <NavLink to={"/put"}>
              <li className="nav-item nav-link active">PUT</li>
            </NavLink>

            <NavLink to={"/delete"}>
              <li className="nav-item nav-link active">DELETE</li>
            </NavLink>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
