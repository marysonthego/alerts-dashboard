/* eslint-disable no-restricted-imports */
/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import objectPath from 'object-path';
import { useHtmlClassService } from 'app/components/layout/MetronicLayout';
import { DropdownTopbarItemToggler } from 'app/components/DropdownTopbarItemToggler';
import SVG from 'react-inlinesvg';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from 'app/redux/userSlice';

export function UserProfileDropdown () {
  const userState = useSelector(selectCurrentUser);
  const [user] = useState(userState);

  const uiService = useHtmlClassService();
  const layoutProps = useMemo(() => {
    return {
      light:
        objectPath.get(uiService.config, 'extras.user.dropdown.style') ===
        'light',
    };
  }, [uiService]);

  return (
    <Dropdown drop="down" alignRight>
      <Dropdown.Toggle
        as={ DropdownTopbarItemToggler }
        id="dropdown-toggle-user-profile">
        <div
          className={
            'btn btn-icon w-auto btn-clean d-flex align-items-center btn-lg px-2'
          }>
          <span className="symbol symbol-35 symbol-light-success">
            <span className="symbol-label font-size-h5 font-weight-bold">
            <div className="text-muted font-weight-bold font-size-base d-none d-md-inline mr-1">
            Hi,{ ' ' }{ user.firstname }!
          </div>
              <div
                className="symbol mt-1"
                style={{ width: '48px', height: '48px' }}>
                <SVG src="/media/a4g/hotairballoon.svg" />
              </div>
            </span>
          </span>
        </div>
      </Dropdown.Toggle>
      <Dropdown.Menu className="p-0 m-0 dropdown-menu-right dropdown-menu-anim dropdown-menu-top-unround dropdown-menu-xl">
        <>
          {/** ClassName should be 'dropdown-menu p-0 m-0 dropdown-menu-right dropdown-menu-anim dropdown-menu-top-unround dropdown-menu-xl' */ }
          { layoutProps.light && (
            <>
              <div className="d-flex align-items-center p-8 rounded-top">
                <div className="symbol symbol-md bg-light-primary mr-3 flex-shrink-0">
                  <img
                    src='/media/a4g/User.svg'
                    alt=""
                  />
                </div>
                <div className="text-dark m-0 flex-grow-1 mr-3 font-size-h5">
                  { user.firstname } {" "} { user.lastname }
                </div>
              </div>
              <div className="separator separator-solid"></div>
            </>
          ) }

          { !layoutProps.light && (
            <div
              className="d-flex align-items-center justify-content-between flex-wrap p-8 bgi-size-cover bgi-no-repeat rounded-top"
              style={ {
                backgroundImage: `url('/media/misc/invoice5bar.jpg')`,
              } }>
              <div className="symbol bg-white-o-15 mr-3">
                <span className="symbol-label text-success font-weight-bold font-size-h4">
                  <img
                    src='/media/a4g/User.svg'
                    alt=""
                  />
                </span>
              </div>
              <div className="text-white m-0 flex-grow-1 mr-3 font-size-h5">
              { user.firstname } {" "} { user.lastname }
              </div>
            </div>
          ) }
        </>

        <div className="navi navi-spacer-x-0 pt-5">
      
          <div className="navi-separator mt-3"></div>

          <div className="navi-footer  px-8 py-5">
          <Link to="/logout" className="navi-item px-8 cursor-pointer">
            <div className="navi-link">
              <div className="navi-icon mr-2">
                <i className="flaticon2-calendar-3 text-success" />
              </div>
              <div className="navi-text">
                <div className="font-weight-bold cursor-pointer">
                  Logout
                </div>
              </div>
            </div>
          </Link>
            <a href="#" className="btn btn-clean font-weight-bold">
              Upgrade Plan
            </a>
          </div>
        </div>
      </Dropdown.Menu>
    </Dropdown>
  );
}
