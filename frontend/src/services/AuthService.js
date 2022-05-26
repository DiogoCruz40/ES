const API_Auth_URL = "http://localhost:8000/api/token/";

export const authlogout = () => {
   return localStorage.removeItem("user");
};

export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};


export const login_api = async (username, password, success, fail) => {
  const response = await fetch(
        API_Auth_URL,
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              "username": username,
              "password": password,
            })
        }
    );
    const text = await response.text();
    if (response.status === 200) {
      console.log("success", JSON.parse(text));
      success(JSON.parse(text));
    } else {
      console.log("failed", text);
      Object.entries(JSON.parse(text)).forEach(([key, value])=>{
        fail(`${key}: ${value}`);
      });
    }
  };
