import React from 'react';
import { ProfileForm } from 'app/pages/ProfileForm';

export const RegisterStep = ({ form, className, handlePassword, handleData }) => {

  return (
    <>
      <div className={`card card-custom ${className}`} style={{justifyContent: 'center'}}>
        {/* Header */}
        <div className="card-header border-0">
          <h3 className="card-title font-weight-bolder text-dark">
            Create your Profile
          </h3>
        </div>
        {/* Body */}
        <ProfileForm form={form} handlePassword={handlePassword} handleData={handleData}/>
      </div>
    </>
  );
};
