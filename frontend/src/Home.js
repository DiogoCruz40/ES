import { useEffect, useState,useRef,useCallback } from "react";
import FoodList from "./FoodList";
import UserFoodList from "./UserFoodList";

const Home = () => {
  const [items, setItems] = useState(null);
  const [itemordered, setItemordered] = useState([]);
  const [image,setImage]=useState('');

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
    const newItems = itemordered.filter(item => item.id !== fooditem.id);
    setItemordered(newItems);
  }

  const handlesubmit = (inputnumber,setInputNumber,itemsalreadyadded,setIsInvalid) => {
    if(inputnumber !== "" && image)
    {
      setItemordered([]);
      setInputNumber("");
      setIsInvalid(false);
      setImage("");
      // faço um post aqui da image, dos items e do numero de location tag
    }
    else
    {
      setIsInvalid(true);
    }

  }

  const videoConstraints = {
    width: 220,
    height: 200,
    facingMode: "user"
  };

  const webcamRef = useRef(null);
  
    const capture = useCallback(
      () => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImage(imageSrc);
      },
      [webcamRef]
    );

  useEffect(() => {
    fetch("http://localhost:8000/items")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setItems(data);
      });
  }, []);

  return (
    <div className="Home">
      {items && <FoodList fooditems={items} addtolist={addtolist} />}
      <hr></hr>
      <UserFoodList itemsalreadyadded={itemordered} removefromlist={removefromlist} handlesubmit={handlesubmit} webcamRef={webcamRef} capture={capture} videoConstraints={videoConstraints} image={image} />
    </div>
  );
};

export default Home;
