import { useEffect, useState } from "react";
import { getCurrentUser, getToken } from "../services/AuthService";
import { useNavigate } from "react-router-dom";

// This is a custom hook for getting current user

const useGetcurrentlogin = () => {
  const [currenUser, setcurrentUser] = useState(null);
  const [currentToken, setcurrentToken] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Runs after the first render() lifecycle
    const user = getCurrentUser();
    const token = getToken();

    if (user && token) {
      setcurrentUser(user);
      setcurrentToken(token);
    } else {
      setcurrentUser(null);
      setcurrentToken(null);
      navigate("/Login");
    }
  }, [currenUser,currentToken]);

  return { currenUser,currentToken };
};

export default useGetcurrentlogin;
