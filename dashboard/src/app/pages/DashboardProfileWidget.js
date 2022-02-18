/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from 'app/redux/userSlice';
import SVG from 'react-inlinesvg';
import { Dropdown } from 'react-bootstrap';
import { DropdownMenu2 } from 'app/components/DropdownMenu2';
import { UserProfileDropdown } from 'app/pages/UserProfileDropdown';

export function DashboardProfileWidget ({ className }) {
  const user = useSelector(selectCurrentUser);
  console.log(`user: `, user);
  if (user.custid === 0) {
    return null;
  }
  return (
    <div className={ `card card-custom bg-gray-100 ${className}` }>
      {/* Header */ }
      <div className="card-header border-0 bg-gray-200 py-5">
        <h3 className="card-title font-weight-bolder text-warning">
          Your Profile
        </h3>

        <div className="text-muted font-weight-bold font-size-lg">
          <UserProfileDropdown />
        </div>

        <div className="card-toolbar">
          
        </div>
      </div>
      {/* Body */ }
      <div className="card-body p-0 position-relative overflow-hidden bg-gray-200">

        {/* Stat */ }
        <div className="card-spacer mt-0">
          <div className="row mt-5">
            <div className="col bg-default px-6 py-8 rounded-xl mr-7 mb-7">
              <Link
                to="/user-profile"
                className="text-primary font-weight-bold font-size-h6 mt-2">
                <div className="col bg-gray-100 px-6 py-8 rounded-xl mr-7 mb-7">
                  <span className="svg-icon svg-icon-3x svg-icon-warning d-block my-2">
                    <SVG
                      src='/media/a4g/Settings4.svg' title="Your Account">
                    </SVG>
                  </span>
                  Account
                </div>
              </Link>
            </div>
            <div className="col bg-default px-6 py-8 rounded-xl mb-7">
              <Link
                to="/friends-list"
                className="text-primary font-weight-bold font-size-h6 mt-2">
                <div className="col bg-gray-100 px-6 py-8 rounded-xl mr-7 mb-7">
                  <span className="svg-icon svg-icon-3x svg-icon-warning d-block my-2">
                    <SVG
                      src='/media/a4g/Group.svg' title="Friends List">
                    </SVG>
                  </span>
                  Friends
                </div>
              </Link>
            </div>
          </div>
          <div className="row mt-5">
            <div className="col bg-default px-6 py-8 rounded-xl mr-7 mb-7">
              <Link
                to="/locations-list"
                className="text-primary font-weight-bold font-size-h6 mt-2">
                <div className="col bg-gray-100 px-6 py-8 rounded-xl mr-7 mb-7">
                  <span className="svg-icon svg-icon-3x svg-icon-warning d-block my-2">
                    <SVG
                      src='/media/a4g/Flag.svg' title="Alert Locations"></SVG>
                  </span>
                  Alert Locations
                </div>
              </Link>
            </div>
            <div className="col bg-default px-6 py-8 rounded-xl mb-7">
              <Link
                to="/latest-alerts"
                className="text-primary font-weight-bold font-size-h6 mt-2">
                <div className="col bg-gray-100 px-6 py-8 rounded-xl mr-7">
                  <span className="svg-icon svg-icon-3x svg-icon-warning d-block my-2">
                    <SVG
                      src='/media/a4g/Highvoltage.svg' title="Latest Alerts"></SVG>
                  </span>
                  Latest Alerts
                </div>
              </Link>
            </div>
          </div>
          
          {user.usertype === 'admin' ? (
          <div className="row mt-5">
            <div className="col bg-default px-6 py-8 rounded-xl mb-7">
              <Link
                to="/list-customers"
                className="text-primary font-weight-bold font-size-h6 mt-2">
                <div className="col bg-gray-100 px-6 py-8 rounded-xl mr-7">
                  <span className="svg-icon svg-icon-3x svg-icon-warning d-block my-2">
                    <SVG
                      src='/media/a4g/Clipboard.svg' title="Customers"></SVG>
                  </span>
                  Customer List
                </div>
              </Link>
            </div>
            {/* <div className="col bg-default px-6 py-8 rounded-xl mb-7">
              <Link
                to="/rss-page"
                className="text-primary font-weight-bold font-size-h6 mt-2">
                <div className="col bg-gray-100 px-6 py-8 rounded-xl mr-7">
                  <span className="svg-icon svg-icon-3x svg-icon-warning d-block my-2">
                    <SVG
                      src={ (
                        '/media/a4g/Clipboard.svg'
                      ) }></SVG>
                  </span>
                  Set RSS
                </div>
              </Link>
            </div> */}
          </div>
          ) : (null)}
        </div>
      </div>

      {/* Resize */ }
      <div className="resize-triggers">
        <div className="expand-trigger">
          <div style={ { width: '411px', height: '461px' } } />
        </div>
        <div className="contract-trigger" />
      </div>
    </div>
  );
}
