import React from "react";

const RegisterForm = ({ text, type, placeholder, value, onChange }) => {
  return (
    <div>
      <div className="d-flex align-items-center">
        <div className="m-2">
          <p className="fw-bold text-white">{text}</p>
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
