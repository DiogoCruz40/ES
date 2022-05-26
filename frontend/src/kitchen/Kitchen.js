import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useGetcurrentlogin from "../hooks/useGetcurrentlogin";

import { authlogout, getToken } from "../services/AuthService";

const Kitchen = () => {
  const { currenUser, currentToken } = useGetcurrentlogin();
  const navigate = useNavigate();

  const logOut = () => {
    authlogout();
    navigate("/Login");
  };

  return (
    <div>
    <div className="container-fluid pt-2">
      <h1 className=" d-inline-block ">Kitchen staff</h1>
      <button className="btn btn-primary float-end" onClick={logOut}>Logout</button>
    </div>
    <div className="container-fluid">
   
    </div>
    </div>
  );
};

export default Kitchen;
