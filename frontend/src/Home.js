import { useEffect, useState } from "react";
import FoodList from "./FoodList";
import UserFoodList from "./UserFoodList";

const Home = () => {
  const [items, setItems] = useState(null);
  const [itemordered, setItemordered] = useState([]);

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
      <UserFoodList itemsalreadyadded={itemordered} removefromlist={removefromlist} />
    </div>
  );
};

export default Home;
