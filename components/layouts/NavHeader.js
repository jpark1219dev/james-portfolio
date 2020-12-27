import React from "react";
import NavLink from "../shared/NavLink";
import auth0 from "../../services/auth0";

const NavHeader = ({ isAdmin, isAuthenticated }) => {
  return (
    <div className="nav-header">
      <div className="nav-left">
        <div className="nav-header__options mb-sm">
          <NavLink route="/about">
            <span className="heading-tertiary nav-link mr-lg">About</span>
          </NavLink>
          {/* <NavLink route="/projects">
            <span className="heading-tertiary nav-link mr-lg">Projects</span>
          </NavLink> */}
          <NavLink route="/blogs">
            <span className="heading-tertiary nav-link mr-lg">Blogs</span>
          </NavLink>
          {isAdmin && (
            <NavLink route="/blogs/dashboard">
              <span className="heading-tertiary nav-link mr-lg">Blog Dashboard</span>
            </NavLink>
          )}
          <NavLink route="/contact">
            <span className="heading-tertiary nav-link mr-lg">Contact</span>
          </NavLink>
        </div>
      </div>
      <div className="nav-right">
        {isAuthenticated ? (
          <div className="heading-tertiary nav-link" onClick={auth0.logout}>
            Log Out
          </div>
        ) : (
          <div className="heading-tertiary nav-link" onClick={auth0.login}>
            Log In
          </div>
        )}
      </div>
    </div>
  );
};

export default NavHeader;
