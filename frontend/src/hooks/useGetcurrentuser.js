import { useEffect, useState } from "react";
import { getCurrentUser } from "../services/AuthService";
import { useNavigate } from "react-router-dom";

// This is a custom hook for getting current user

const useGetcurrentuser = () => {
  const [currenUser, setcurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Runs after the first render() lifecycle
    const user = getCurrentUser();
    if (user) {
      setcurrentUser(user);
    } else {
      setcurrentUser(null);
      navigate("/Login");
    }
  }, [currenUser]);

  return { currenUser };
};

export default useGetcurrentuser;
