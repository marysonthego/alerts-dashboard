/* eslint-disable jsx-a11y/role-supports-aria-props */
/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import { useSelector } from 'react-redux';
import { selectCurrentUser } from 'app/redux/userSlice';
import { NavLink } from "react-router-dom";
import SVG from "react-inlinesvg";

export function AsideMenuList ({ layoutProps }) {
  const user = useSelector(selectCurrentUser);

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

        {/*begin::1 Level*/ }
        <li
          className={ `menu-item menu-item-submenu ${getMenuItemActive("/password",
            true
          )}` }
          aria-haspopup="true"
          data-menu-toggle="hover"
        >
          <NavLink className="menu-link menu-toggle" to="/password">
            <span className="svg-icon menu-icon">
              <SVG src="/media/svg/icons/Code/Commit.svg" />
            </span>
            <span className="menu-text">Change Password</span>
            <i className="menu-arrow" />
          </NavLink>
        </li>



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
        </li>
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
        {/*begin::1 Level*/ }
        <li
          className={ `menu-item menu-item-submenu ${getMenuItemActive("/logout",
            true
          )}` }
          aria-haspopup="true"
          data-menu-toggle="hover"
        >
          <NavLink className="menu-link menu-toggle" to="/logout">
            <span className="svg-icon menu-icon">
              <SVG src="/media/svg/icons/Navigation/Sign-out.svg" />
            </span>
            <span className="menu-text">Logout</span>
            <i className="menu-arrow" />
          </NavLink>
        </li>
        {/*begin::1 Level*/ }
        { user.usertype === 'admin' ? (
          <>
            <li className="menu-section ">
              <h4 className="menu-text">Admin</h4>
              <i className="menu-icon flaticon-more-v2"></i>
            </li>
            <li
              className={ `menu-item menu-item-submenu ${getMenuItemActive("/list-customers",
                true
              )}` }
              aria-haspopup="true"
              data-menu-toggle="hover"
            >
              <NavLink className="menu-link menu-toggle" to="/list-customers">
                <span className="svg-icon menu-icon">
                  <SVG src="/media/a4g/Clipboard.svg" />
                </span>
                <span className="menu-text">Customers</span>
                <i className="menu-arrow" />
              </NavLink>
            </li>
          </>
        ) : (null) }
      </ul>
      {/* end::Menu Nav */ }
    </>
  );
}
