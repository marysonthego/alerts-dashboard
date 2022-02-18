/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { checkIsActive } from "app/helpers/RouterHelpers";
import { useSelector } from 'react-redux';
import { selectCurrentUser } from 'app/redux/userSlice';
import SVG from "react-inlinesvg";

export function HeaderMenu({ layoutProps }) {
    const location = useLocation();
    const user = useSelector(selectCurrentUser);
    const getMenuItemActive = (url) => {
        return checkIsActive(location, url) ? "menu-item-active" : "";
    }

    return <div
        id="kt_header_menu"
        className={`header-menu header-menu-mobile ${layoutProps.ktMenuClasses}`}
        {...layoutProps.headerMenuAttributes}>

      <ul className={ `menu-nav ${layoutProps.ulClasses}` }>
        <li
          className={ `menu-item menu-item-rel ${getMenuItemActive("/dashboard")}` }>
          <NavLink className="menu-link" to="/dashboard">
            <span className="svg-icon menu-icon">
              <SVG src="/media/a4g/Display1.svg" title="Dashboard"/>
            </span>
            <span className="menu-text">Dashboard</span>
          </NavLink>
        </li>

        <li
          className={ `menu-item ${getMenuItemActive("/latest-alerts", false)}` }>
          <NavLink className="menu-link" to="/latest-alerts">
            <span className="svg-icon menu-icon">
              <SVG src="/media/a4g/marker1.svg" title="Latest Alerts"/>
            </span>
            <span className="menu-text">Latest Alerts</span>
          </NavLink>
        </li>

        <li
          className={ `menu-item ${getMenuItemActive("/user-profile", true)}` }>
          <NavLink className="menu-link" to="/user-profile">
            <span className="svg-icon menu-icon">
              <SVG src="/media/a4g/Commit.svg" title="Edit Profile"/>
            </span>
            <span className="menu-text">Edit Profile</span>
          </NavLink>
        </li>

        <li
          className={ `menu-item ${getMenuItemActive("/password", true)}` }>
          <NavLink className="menu-link" to="/password">
            <span className="svg-icon menu-icon">
              <SVG src="/media/a4g/Commit.svg" title="Change Password"/>
            </span>
            <span className="menu-text">Change Password</span>
          </NavLink>
        </li>

        <li
          className={ `menu-item ${getMenuItemActive("/locations-list", true)}` }>
          <NavLink className="menu-link" to="/locations-list">
            <span className="svg-icon menu-icon">
              <SVG src="/media/a4g/marker1.svg" title="Alert Locations"/>
            </span>
            <span className="menu-text">Alert Locations</span>
          </NavLink>
        </li>

        <li
          className={ `menu-item ${getMenuItemActive("/friends-list", false)}` }>
          <NavLink className="menu-link" to="/friends-list">
            <span className="svg-icon menu-icon">
              <SVG src="/media/a4g/Smile.svg" title="Friends"/>
            </span>
            <span className="menu-text">Friends</span>
          </NavLink>
        </li>

        <li
          className={ `menu-item ${getMenuItemActive("/logout", true)}` }>
          <NavLink className="menu-link" to="/logout">
            <span className="svg-icon menu-icon">
              <SVG src="/media/a4g/Sign-out.svg" title="Logout"/>
            </span>
            <span className="menu-text">Logout</span>
          </NavLink>
        </li>

        { user.usertype === 'admin' ? (
          <>
            <li
              className={ `menu-item menu-item-submenu ${getMenuItemActive("/list-customers",
                true
              )}` }>
              <NavLink className="menu-link" to="/list-customers">
                <span className="svg-icon menu-icon">
                  <SVG src="/media/a4g/Clipboard.svg" title="Customers"/>
                </span>
                <span className="menu-text">Customers</span>
              </NavLink>
            </li>
          </>
        ) : (null) }
      </ul>
    </div>;
}
