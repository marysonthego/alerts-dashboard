/* eslint-disable jsx-a11y/role-supports-aria-props */
/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
//import { useLocation } from "react-router";
import { NavLink } from "react-router-dom";
import SVG from "react-inlinesvg";

export function AsideMenuList ({ layoutProps }) {
  //const location = useLocation();

  const getMenuItemActive = (url, hasSubmenu = false) => {
    return `menu-item-open menu-item-not-hightlighted`;
  };

  return (
    <>
      {/* begin::Menu Nav */ }
      <ul className={ `menu-nav ${layoutProps.ulClasses}` }>
        {/*begin::1 Level*/ }
        <li
          className={ `menu-item ${getMenuItemActive("/dashboard", false)}` }
          aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/dashboard">
            <span className="svg-icon menu-icon">
              <SVG src="/media/svg/icons/Devices/Display1.svg" />
            </span>
            <span className="menu-text">Dashboard</span>
          </NavLink>
        </li>
        {/*end::1 Level*/ }

        {/*begin::1 Level*/ }
        <li
          className={ `menu-item ${getMenuItemActive("/locations-list", false)}` }
          aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/locations-list">
            <span className="svg-icon menu-icon">
              <SVG src="/media/a4g/marker1.svg" />
            </span>
            <span className="menu-text">Alert Locations</span>
          </NavLink>
        </li>
        {/*end::1 Level*/ }

        {/* begin::section */ }
        <li className="menu-section ">
          <h4 className="menu-text">Profile</h4>
          <i className="menu-icon flaticon-more-v2"></i>
        </li>
        {/* end:: section */ }
        {/*begin::1 Level*/ }
        <li
          className={ `menu-item menu-item-submenu ${getMenuItemActive("/user-profile",
            true
          )}` }
          aria-haspopup="true"
          data-menu-toggle="hover"
        >
          <NavLink className="menu-link menu-toggle" to="/user-profile">
            <span className="svg-icon menu-icon">
              <SVG src="/media/svg/icons/Code/Commit.svg" />
            </span>
            <span className="menu-text">Edit Profile</span>
            <i className="menu-arrow" />
          </NavLink>
        </li>
        <div className="menu-submenu ">
          <i className="menu-arrow" />
        </div>
        <ul className="menu-subnav">
          <li className="menu-item  menu-item-parent" aria-haspopup="true">
            <span className="menu-link">
              <span className="menu-text">Edit Profile</span>
            </span>
          </li>
        </ul>
        {/*begin::1 Level*/ }
        <li
          className={ `menu-item menu-item-submenu ${getMenuItemActive(
            "/locations-list",
            true
          )}` }
          aria-haspopup="true"
          data-menu-toggle="hover"
        >
          <NavLink className="menu-link menu-toggle" to="/locations-list">
            <span className="svg-icon menu-icon">
              <SVG src="/media/a4g/marker1.svg" />
            </span>
            <span className="menu-text">Alert Locations</span>
            <i className="menu-arrow" />
          </NavLink>
          <div className="menu-submenu ">
            <ul className="menu-subnav">
              <ul className="menu-subnav">
                <li
                  className="menu-item  menu-item-parent"
                  aria-haspopup="true"
                >
                  <span className="menu-link">
                    <span className="menu-text">Alert Locations</span>
                  </span>
                </li>
              </ul>

              {/*begin::1 Level*/ }
              <li
                className={ `menu-item ${getMenuItemActive("/friends-list", false)}` }
                aria-haspopup="true"
              >
                <NavLink className="menu-link" to="/friends-list">
                  <span className="svg-icon menu-icon">
                    <SVG
                      src="/media/svg/icons/General/Smile.svg"
                    />
                  </span>
                  <span className="menu-text">Friends</span>
                </NavLink>
              </li>
              {/*end::1 Level*/ }

              {/* Custom */ }
              {/* begin::section */ }
              <li className="menu-section ">
                <h4 className="menu-text">Friends</h4>
                <i className="menu-icon flaticon-more-v2"></i>
              </li>
              {/* end:: section */ }

              {/* Error Pages */ }
              {/*begin::1 Level*/ }
              <li
                className={ `menu-item menu-item-submenu ${getMenuItemActive(
                  "/error",
                  true
                )}` }
                aria-haspopup="true"
                data-menu-toggle="hover"
              >
              </li>
            </ul>
          </div>
        </li>
        {/*end::1 Level*/ }
      </ul>

      {/* end::Menu Nav */ }
    </>
  );
}
