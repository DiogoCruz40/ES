import { useState,useEffect } from "react";
import useGetcurrentuser from "../hooks/useGetcurrentuser";
import { authlogout } from "../services/AuthService";

const Kitchen = () => {
  const { currenUser } = useGetcurrentuser();
 
  const logOut = () => {
    authlogout();
    // useGetcurrentuser();
  }

    return (
    <h1>Kitchen staff</h1>
    );
}
 
export default Kitchen;


