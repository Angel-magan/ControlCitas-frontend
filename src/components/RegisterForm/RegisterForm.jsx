import React from "react";

const RegisterForm = ({ text, type, placeholder, value, onChange }) => {
  return (
    <div>
      <div className="d-flex align-items-center">
        <div className="me-5 w-25">
          <p className="me-3 fw-bold">{text}</p>
        </div>
        <div className="w-100">
          <input
            className="form-control mb-3"
            type={type}
            placeholder={`${placeholder}`}
            value={value}
            onChange={onChange}
          />
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
