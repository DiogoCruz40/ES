import './App.css';
import { useEffect, useState } from "react";
import BlogList from "./BlogList";

function App() {

  const [items, setItems] = useState(null)

  useEffect(() => {
    fetch('http://localhost:8000/items')
      .then(res => {
        return res.json();
      })
      .then(data => {
        setItems(data);
      })
  }, [])

  return (
    <div className="App">
      {items && <BlogList blogs={items} />}
    </div>
  );
}

export default App;
