import React from 'react';
import { ProfileForm } from 'app/pages/ProfileForm';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.min.css";

export const RegisterStep = ({ form, className, handlePassword, handleData }) => {

  return (
    <Container fluid="md">
    <Row justify-content="center">
      <Col className={`card card-custom ${className}`}>
        {/* Header */}
        <div className="card-header border-0">
          <h3 className="card-title font-weight-bolder text-dark">
            Create your Profile
          </h3>
        </div>
        {/* Body */}
        <ProfileForm form={form} handlePassword={handlePassword} handleData={handleData}/>
      </Col>
      </Row>
      </Container>
  );
};
