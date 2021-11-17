/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import { ProfileForm } from 'app/pages/ProfileForm';

export const UserProfilePage = ({ className }) => {

  const form = 'UserProfilePage';

  return (
    <>
      <div className={ `card card-custom ${className}` }>
        {/* Header */ }
        <div className="card-header border-0">
          <h3 className="card-title font-weight-bolder text-dark">
            Edit Your Profile
          </h3>
        </div>
        {/* Body */ }
        <ProfileForm form={ form } />
      </div>
    </>
  );
};
