import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import useGetcurrentlogin from "../hooks/useGetcurrentlogin";
import { authlogout, getToken } from "../services/AuthService";

const Kitchen = () => {
  const { currenUser, currentToken } = useGetcurrentlogin();
  let { data: items, error } = useFetch("api/getfood/");
  let [objecturl, setObjecturl] = useState([]);
  let [objecturlfeitos, setObjecturlfeitos] = useState([]);
  const navigate = useNavigate();
  const logOut = () => {
    authlogout();
    navigate("/Login");
  };

  const urlsporfazer = () => {
    items.forEach((item) => {
      if (
        objecturl.indexOf(item.object_url) === -1 &&
        item.delivery === false
      ) {
        objecturl.push(item.object_url);
      }
    });
  };

  const urlsfeitos = () => {
    items.forEach((item) => {
      if (
        objecturlfeitos.indexOf(item.object_url) === -1 &&
        item.delivery === true
      ) {
        objecturlfeitos.push(item.object_url);
      }
    });
  };

  const handlepedido = (pedido) => {
    const abortCont = new AbortController();

    fetch("api/updateitems/", {
      method: "PUT",
      signal: abortCont.signal,
      headers: {
        "Authorization": getToken(),
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        pedido,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          // error coming back from server
          throw Error("Could not post this data.");
        }
        return res.json();
      })
      .then((data) => {
        items = items.map((item) => {
          if (item.object_url === pedido) {
            item.delivery = true;
          }
        });

        const newobj = objecturl.filter((obj) => obj !== pedido);
        setObjecturlfeitos((objfeito) => [...objfeito, pedido]);
        setObjecturl(newobj);
      })
      .catch((err) => {
        if (err.name === "AbortError") {
          console.log("fetch aborted");
        }
      });

    // abort the fetch
    return () => abortCont.abort();
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
        <h1 className="text-center">Pedidos para fazer</h1>
        {!items ? <p>Loading...</p> : urlsporfazer()}
        {objecturl.map((obj) => (
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
                <button
                  className="btn btn-primary"
                  onClick={() => handlepedido(obj)}
                >
                  Preparado
                </button>
              </div>
            </div>
          </div>
        ))}
        <div className="col-12">
          <hr></hr>
        </div>
      </div>
      <div className="container-fluid">
        <hr></hr>
        <h1 className="text-center">Pedidos feitos</h1>
        {!items ? <p>Loading...</p> : urlsfeitos()}
        {objecturlfeitos.map((obj) => (
          <div>
            <div className="row d-flex justify-content-center food-list">
              {items
                .filter(
                  (item) => obj === item.object_url && item.delivery === true
                )
                .map((item) => (
                  <div className="col" key={item.id_prato}>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <p>{item.price}€</p>
                  </div>
                ))}
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
