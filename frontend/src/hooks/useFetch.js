import { useEffect, useState } from "react";
import { authlogout, getToken } from "../services/AuthService";
import { useNavigate } from "react-router-dom";
// This is a custom hook for fetching data

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const abortCont = new AbortController();

    fetch(url, {
      signal: abortCont.signal,
      headers: {
        'Authorization': getToken(),
        'Accept': "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
      if (!res.ok) {
          // error coming back from server
          throw Error("Could not fetch the data for that resource");
        }
        return res.json();
      })
      .then((data) => {
        setData(JSON.parse(data));
        setError(null);
      })
      .catch((err) => {
        if (err.status === 401)
        {
          authlogout();
          navigate("/Login");
        }

        if (err.name === "AbortError") {
          console.log("fetch aborted");
        } else {
          setError(err.message);
        }
      });

    // abort the fetch
    return () => abortCont.abort();
  }, [url]);

  return { data, error };
};

export default useFetch;
