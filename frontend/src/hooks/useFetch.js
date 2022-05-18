import { useEffect, useState } from "react";

// This is a custom hook for fetching data

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortCont = new AbortController();

    fetch(url, { signal: abortCont.signal })
      .then((res) => {
        if (!res.ok) {
          // error coming back from server
          throw Error("could not fetch the data for that resource");
        }
        return res.json();
      })
      .then((data) => {
        setData(data);
        setError(null);
      })
      .catch((err) => {
        if (err.name === 'AbortError') {
          console.log('fetch aborted')
        } else {
        setError(err.message);
        }
      });

      // abort the fetch
    return () => abortCont.abort();
  }, [url]);

  return {data,error};
};

export default useFetch;
