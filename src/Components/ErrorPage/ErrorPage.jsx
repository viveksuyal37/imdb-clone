import React from "react";
import ErrorPng from '../../assets/Error.png'
import "./ErrorPage.css";

const ErrorPage = () => {
  return (
    <div className="error">
      <img src={ErrorPng} alt="error_img"/>
    </div>
  );
};

export default ErrorPage;
