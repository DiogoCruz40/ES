import { useState, useRef, useCallback } from "react";
import FoodList from "./FoodList";
import useFetch from "../hooks/useFetch";
import UserFoodList from "./UserFoodList";

const Home = () => {
  const [itemordered, setItemordered] = useState([]);
  const [image, setImage] = useState("");
  const { data: items, error } = useFetch("http://localhost:8000/api/items/");
  const {errPost,setErrPost} = useState(null);

  const addtolist = (fooditem) => {
    let existe = false;
    itemordered.forEach((item) => {
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
  };

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
          "Content-Type": "application/json",
        },
        body: JSON.stringify(Object),
      }).then((data) => {
        console.log('post success' + data.status);
        setItemordered([]);
        setInputNumber("");
        setIsInvalid(false);
        setImage("");
        setErrPost(null);
      }).catch((err) => {
        setErrPost(err.message);
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
        webcamRef={webcamRef}
        capture={capture}
        videoConstraints={videoConstraints}
        image={image}
      />
    </div>
  );
};

export default Home;
