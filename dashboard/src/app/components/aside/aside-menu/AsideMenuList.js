/* eslint-disable jsx-a11y/role-supports-aria-props */
/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import { useSelector } from 'react-redux';
import { selectCurrentUser } from 'app/redux/userSlice';
import { NavLink, useLocation } from "react-router-dom";
import { checkIsActive } from "app/helpers/RouterHelpers";
import SVG from "react-inlinesvg";

export function AsideMenuList ({ layoutProps }) {
  const user = useSelector(selectCurrentUser);
  const location = useLocation();
  const getMenuItemActive = (url, hasSubmenu = false) => {
        return checkIsActive(location, url) ? "menu-item-active" : "";
    };

  return (
    <>
      <ul className={ `menu-nav ${layoutProps.ulClasses}` }>
        <li
          className={ `menu-item ${getMenuItemActive("/dashboard", false)}` }
          aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/dashboard">
            <span className="svg-icon menu-icon">
              <SVG src="/media/a4g/Display1.svg" title="Dashboard"/>
            </span>
            <span className="menu-text">Dashboard</span>
          </NavLink>
        </li>
        <li
          className={ `menu-item ${getMenuItemActive("/latest-alerts", false)}` }
          aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/latest-alerts">
            <span className="svg-icon menu-icon">
              <SVG src="/media/a4g/marker1.svg" title="Latest Alerts"/>
            </span>
            <span className="menu-text">Latest Alerts</span>
          </NavLink>
        </li>
        <li className="menu-section ">
          <h4 className="menu-text">Profile</h4>
          <i className="menu-icon flaticon-more-v2"></i>
        </li>
        <li
          className={ `menu-item menu-item-submenu ${getMenuItemActive("/user-profile",
            true
          )}` }
          aria-haspopup="true"
          data-menu-toggle="hover"
        >
          <NavLink className="menu-link menu-toggle" to="/user-profile">
            <span className="svg-icon menu-icon">
              <SVG src="/media/a4g/Commit.svg" title="Edit Profile"/>
            </span>
            <span className="menu-text">Edit Profile</span>
            <i className="menu-arrow" />
          </NavLink>
        </li>
        <li
          className={ `menu-item menu-item-submenu ${getMenuItemActive("/password",
            true
          )}` }
          aria-haspopup="true"
          data-menu-toggle="hover"
        >
          <NavLink className="menu-link menu-toggle" to="/password">
            <span className="svg-icon menu-icon">
              <SVG src="/media/a4g/Commit.svg" title="Change Password"/>
            </span>
            <span className="menu-text">Change Password</span>
            <i className="menu-arrow" />
          </NavLink>
        </li>
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
              <SVG src="/media/a4g/marker1.svg" title="Alert Locations"/>
            </span>
            <span className="menu-text">Alert Locations</span>
            <i className="menu-arrow" />
          </NavLink>
        </li>
        <li
          className={ `menu-item ${getMenuItemActive("/friends-list", false)}` }
          aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/friends-list">
            <span className="svg-icon menu-icon">
              <SVG
                src="/media/a4g/Smile.svg" title="Friends"
              />
            </span>
            <span className="menu-text">Friends</span>
          </NavLink>
        </li>
        <li
          className={ `menu-item menu-item-submenu ${getMenuItemActive("/logout",
            true
          )}` }
          aria-haspopup="true"
          data-menu-toggle="hover"
        >
          <NavLink className="menu-link menu-toggle" to="/logout">
            <span className="svg-icon menu-icon">
              <SVG src="/media/a4g/Sign-out.svg" title="Logout"/>
            </span>
            <span className="menu-text">Logout</span>
            <i className="menu-arrow" />
          </NavLink>
        </li>
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
                  <SVG src="/media/a4g/Clipboard.svg" title="Customers"/>
                </span>
                <span className="menu-text">Customers</span>
                <i className="menu-arrow" />
              </NavLink>
            </li>
            {/* <li
              className={ `menu-item menu-item-submenu ${getMenuItemActive("/rss-page",
                true
              )}` }
              aria-haspopup="true"
              data-menu-toggle="hover"
            >
              <NavLink className="menu-link menu-toggle" to="/rss-page">
                <span className="svg-icon menu-icon">
                  <SVG src="/media/a4g/Clipboard.svg" />
                </span>
                <span className="menu-text">RSS</span>
                <i className="menu-arrow" />
              </NavLink>
            </li> */}
          </>
        ) : (null) }
      </ul>
    </>
  );
}
