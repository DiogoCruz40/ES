import { useState, useRef, useCallback } from "react";
import FoodList from "./FoodList";
import useFetch from "../hooks/useFetch";
import UserFoodList from "./UserFoodList";
import { getToken } from "../services/AuthService";



const Home = () => {
  const [itemordered, setItemordered] = useState([]);
  const [image, setImage] = useState("");
  const { data: items, error } = useFetch("api/getitems/");
  const [totalprice, setTotalprice] = useState(0);

  const addtolist = (fooditem) => {
    let existe = false;
    itemordered.map((item) => {
      if (item.id === fooditem.id) {
        existe = true;
      }
    });
    if (!existe) {
      setItemordered((itemordered) => [...itemordered, fooditem]);
    }
  };
  const removefromlist = (fooditem) => {
    const newItems = itemordered.filter((item) => item.id !== fooditem.id);
    setItemordered(newItems);
    if(itemordered === [])
    {
      setTotalprice(0);
    }
  };

  const handlecalcprice = ((postdata) => {
    
    const abortCont = new AbortController();

    fetch('api/calcprice/', {
      method: 'POST',
      signal: abortCont.signal,
      headers: {
        'Authorization': getToken,
        'Accept': "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({postdata})
    })
      .then((res) => {
        if (!res.ok) {
          // error coming back from server
          throw Error("Could not post this data.");
        }
        return res.json();
      })
      .then((data) => {
        setTotalprice(JSON.parse(data.body));
        // setError(null);
      })
      .catch((err) => {
        if (err.name === "AbortError") {
          console.log("fetch aborted");
        } else {
          // setError(err.message);
        }
      });

    // abort the fetch
    return () => abortCont.abort();


  });

  const handlesubmit = (
    inputnumber,
    setInputNumber,
    itemsalreadyadded,
    setIsInvalid
  ) => {
    if (inputnumber !== "" && image) {
      // faço um post aqui da image, dos items e do numero de location tag
      fetch("http://localhost:8000/api/items/", {
        method: "POST",
        headers: {
          'Accept': "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({data:"ola"}),
      }).then((res) => {
        if(!res.ok)
        {
          throw Error('Could not POST this.')
        }
        return res.json();
      }).then((data) => {
        console.log(data.status);
        setItemordered([]);
        setInputNumber("");
        setIsInvalid(false);
        setImage("");
        setTotalprice(0.00);

      }).catch((err) => {
         alert(err.message + ' Try again later.');
      }); 
    } else {
      setIsInvalid(true);
    }
  };

  const videoConstraints = {
    width: 220,
    height: 200,
    facingMode: "user",
  };

  const webcamRef = useRef(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImage(imageSrc);
  }, [webcamRef]);

  return (
    <div className="Home">
      <h1>Menu</h1>
      {error && <div style={{color:"red",fontSize:"1.4rem",fontWeight:"bold"}}>{error}</div>}
      {items && <FoodList fooditems={items} addtolist={addtolist} />}
      <hr></hr>
      <UserFoodList
        itemsalreadyadded={itemordered}
        removefromlist={removefromlist}
        handlesubmit={handlesubmit}
        handlecalcprice={handlecalcprice}
        webcamRef={webcamRef}
        capture={capture}
        videoConstraints={videoConstraints}
        image={image}
        totalprice={totalprice}
      />
    </div>
  );
};

export default Home;
