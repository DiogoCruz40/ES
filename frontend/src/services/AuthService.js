const API_Auth_URL = "http://localhost:8000/api/token/";
const TOKEN_KEY = "token";
const USER_KEY = "user";

export const authlogout = () => {
   return window.sessionStorage.clear();
};

export const getCurrentUser = () => {
  const user = window.sessionStorage.getItem(USER_KEY);
  if (user) {
    return JSON.parse(user);
  }
  return null;
};

export const saveToken  = (token) => {
  window.sessionStorage.removeItem(TOKEN_KEY);
  window.sessionStorage.setItem(TOKEN_KEY, token);
}
export const getToken  = () => {
  return window.sessionStorage.getItem(TOKEN_KEY);
}

export const saveUser  = (user) => {
  window.sessionStorage.removeItem(USER_KEY);
  window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
}

export const isLoggedIn  = () => {
  const authToken = window.sessionStorage.getItem(TOKEN_KEY);
  return (authToken !== null) ? true : false;
}

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
    const text = await response.json();
    if (response.status === 200) {
      // console.log("success", JSON.parse(text));
      saveToken("JWT " + text.access);
      saveUser(username);
    } else {
      console.log("failed", text);
      Object.entries(JSON.parse(text)).forEach(([key, value])=>{
        fail(`${key}: ${value}`);
      });
    }
  };
