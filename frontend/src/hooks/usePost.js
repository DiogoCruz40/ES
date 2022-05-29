import { useEffect, useState } from "react";
import { getToken } from "../services/AuthService";

// This is a custom hook for fetching data

const usePost = (url,postdata) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortCont = new AbortController();

    fetch(url, {
      method: 'POST',
      signal: abortCont.signal,
      headers: {
        'Authorization': getToken,
        'Accept': "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        postdata
      })
    })
      .then((res) => {
        if (!res.ok) {
          // error coming back from server
          throw Error("Could not post this data.");
        }
        return res.json();
      })
      .then((data) => {
        setData(JSON.parse(data));
        setError(null);
      })
      .catch((err) => {
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

export default usePost;
