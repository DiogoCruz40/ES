import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useGetcurrentlogin from "../hooks/useGetcurrentlogin";

import { authlogout, getToken } from "../services/AuthService";

const Kitchen = () => {
  const { currenUser, currentToken } = useGetcurrentlogin();
  const [items, setItems] = useState([]);
  const [objurl, setObjurl] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const abortCont = new AbortController();

    fetch("api/getfood/", {
      signal: abortCont.signal,
      headers: {
        Authorization: getToken(),
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          if (res.status === 401) {
            logOut();
          }
          // error coming back from server
          throw Error("Could not fetch the data for that resource");
        }
        return res.json();
      })
      .then((data) => {
        setItems(JSON.parse(data));
      })
      .catch((err) => {
        if (err.name === "AbortError") {
          console.log("fetch aborted");
        }
      });

    // abort the fetch
    return () => abortCont.abort();
  }, []);

  const logOut = () => {
    authlogout();
    navigate("/Login");
  };

  const handlepedido = (pedido) => {
    console.log(pedido);
  };

  return (
    <div>
      <div className="container-fluid pt-2">
        <h1 className="display-1 d-inline-block ">Kitchen staff</h1>
        <button className="btn btn-primary float-end" onClick={logOut}>
          Logout
        </button>
        <hr></hr>
      </div>
      <div className="container-fluid">
          {items.length == 0 ? <p>Não existem pedidos.</p> :
          items.map((item) => {
            if (!(objurl.includes(item.object_url))) {
              let url = item.object_url;
              setObjurl((objurl) => [...objurl,url]);
            }
          })}
          <h1 className="text-center">Pedidos para fazer</h1>
          {objurl.map((obj) => (
            <div>
             
            <div className="row d-flex justify-content-center food-list">
              {items
                .filter(
                  (item) => obj === item.object_url && item.delivery !== true
                )
                .map((item) => (
                  <div className="col" key={item.id_prato}>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <p>{item.price}€</p>
                  </div>
                ))}
                <div className="col-12">
              <button className="btn btn-primary" onClick={() => handlepedido(obj)}>
                Preparado
              </button>
             </div>
            </div>
            <div className="col-12">
             <hr></hr> 
             </div>
             </div>
          ))}
       
      </div>
    </div>
  );
};

export default Kitchen;
