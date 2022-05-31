import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login_api } from "../services/AuthService";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const tryLogin = async (e) => {
    e.preventDefault();
    // console.log("Loggin in with", username, password);
    if (username.trim() !== "" && password.trim() !== "") {
     const {success,err} = await login_api(username, password);
     if(success === "")
     {
       setMessage(err);
     }
     else{
       setMessage("");
       navigate("/kitchen");
     }
      }
     else {
      setMessage("Preencha todos os campos!");
    }
  };

  return (
    <div
      style={{
        width: "400px",
        margin: "auto",
        marginTop: "200px",
        boxShadow: "5px 5px 20px #cccccccc",
        padding: "1em",
      }}
    >
      <form>
        <div className="mb-3">
          <label htmlFor="username" className="form-label fw-bold">
            Username
          </label>
          <input
            autoFocus
            type="text"
            className="form-control"
            id="username"
            placeholder="username"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            value={username}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label fw-bold">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
          />
        </div>
        <button type="submit" className="btn btn-primary" onClick={tryLogin}>
          Login
        </button>
        <div style={{ margin: "1em", color: "red" }}>{message}</div>
      </form>
    </div>
  );
};

export default Login;
