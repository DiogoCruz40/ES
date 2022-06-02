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
  const [success, setSuccess] = useState(null);
  const [exec_name, setExec_name] = useState(null);
  const [exec_Arn, setExec_Arn] = useState(null);
  const [confirmpayment, setConfirmpayment] = useState(null);
  const [errorpayment, setErrorpayment] = useState(null);
  const [confirmdelivery, setConfirmdelivery] = useState(null);
  const [messagedelivery, setMessagedelivery] = useState(null);
  const [checkfinal,setCheckfinal] = useState(null);
  const [messagecheckfinal,setMessagecheckfinal] = useState(null);

  let id_interval,id_interval2,id_interval3;

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
    if (itemordered === []) {
      setTotalprice(0);
    }
  };

  const handlecalcprice = (postdata) => {
    const abortCont = new AbortController();

    fetch("api/calcprice/", {
      method: "POST",
      signal: abortCont.signal,
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ postdata }),
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
  };

  const handlesubmit = (
    inputnumber,
    setInputNumber,
    itemsalreadyadded,
    setIsInvalid
  ) => {
    if (inputnumber !== 0 && image) {
      const abortCont = new AbortController();
      // faço um post aqui da image, dos items e do numero de location tag
      fetch("api/requestfood/", {
        method: "POST",
        signal: abortCont.signal,
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image: image,
          items: itemsalreadyadded,
          locationtag: inputnumber,
          Request: "makerequest",
        }),
      })
        .then((res) => {
          if (!res.ok) {
            throw Error("Could not POST this.");
          }
          return res.json();
        })
        .then((data) => {
          //console.log(data.status);
          setItemordered([]);
          setInputNumber(0.0);
          setIsInvalid(false);
          setImage("");
          setTotalprice(0.0);
          setSuccess("sucess");
          setExec_Arn(data.execArn);
          setExec_name(data.exec_name);
          setConfirmpayment("letstryit");
        })
        .catch((err) => {
          alert(err.message + " Try again later.");
        });
      return () => abortCont.abort();
    } else {
      setIsInvalid(true);
    }
    // abort the fetch
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

  const handlepayment = () => {

   id_interval = setInterval(() => {
      const abortCont = new AbortController();
      // faço um post aqui da image, dos items e do numero de location tag
      fetch("api/getpayment/", {
        method: "POST",
        signal: abortCont.signal,
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          exec_name: exec_name,
        }),
      })
        .then((res) => {
          if (!res.ok) {
            throw Error("Could not Get this.");
          }
          return res.json();
        })
        .then((data) => {
          if (data.statusoforder === "matched") {
            setConfirmpayment(null);
            setConfirmdelivery('notyetconfirmed');
            setMessagedelivery("Pagamento confirmado!\n Aguarde pelo pedido na sua mesa...")
            clearInterval(id_interval);
          } else if (data.statusoforder === "nomatched") {
            setConfirmpayment(null);
            setErrorpayment("Go to the customer support");
            clearInterval(id_interval);
          }
        })
        .catch((err) => {
          alert(err.message + " Try again later.");
        });
            // abort the fetch
      return () => abortCont.abort();
    }, 5000);
  };

const handledelivery = () => {

  id_interval2 = setInterval(() => {
      const abortCont = new AbortController();
      // faço um post aqui da image, dos items e do numero de location tag
      fetch("api/getdelivery/", {
        method: "POST",
        signal: abortCont.signal,
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          exec_name: exec_name,
        }),
      })
        .then((res) => {
          if (!res.ok) {
            throw Error("Could not Get this.");
          }
          return res.json();
        })
        .then((data) => {
          if (data.delivery === true) {
            setConfirmdelivery(null);
            setMessagedelivery("Já recebeu o pedido?");
            setCheckfinal('showbutton');
            clearInterval(id_interval2);
          }
        })
        .catch((err) => {
          alert(err.message + " Try again later.");
        });
            // abort the fetch
      return () => abortCont.abort();
    }, 5000);
  };

const checkphoto = () => {
      const abortCont = new AbortController();
      // faço um post aqui da image, dos items e do numero de location tag
      fetch("api/checkphoto/", {
        method: "POST",
        signal: abortCont.signal,
        headers: {
         "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          execArn: exec_Arn,
        }),
      })
        .then((res) => {
          if (!res.ok) {
            throw Error("Could not Post this.");
          }
          return res.json();
        })
        .then((data) => {
          if (data.status === "SUCCEEDED") {
            setMessagecheckfinal("Desfrute da comida!!");
          }
          else if(data.status === "FAILED")
          {
            setMessagecheckfinal("Este pedido não é seu!!");
          }
          setConfirmdelivery(null);
          setMessagedelivery(null);
          setCheckfinal(null);
        })
        .catch((err) => {
          alert(err.message + " Try again later.");
        });
            // abort the fetch
      return () => abortCont.abort();
  };

  return (
    <div className="Home">
      {success ? (
        <div className="pedido d-flex justify-content-center align-items-center">
          {errorpayment && (
            <div
              style={{ color: "red", fontSize: "1.4rem", fontWeight: "bold" }}
            >
              <h1>{errorpayment}</h1>
            </div>
          )}
          <div>
          {confirmpayment && <h1>A confirmar o pagamento...</h1>}
          {confirmpayment && handlepayment()}
          {messagedelivery && <h1>{messagedelivery}</h1>}
          {confirmdelivery && handledelivery()}
          {checkfinal && <button className="btn btn-primary" onClick={() => checkphoto()}>Confirm</button>}
          {messagecheckfinal && <h1>{messagecheckfinal}</h1>}
          </div>
        </div>
      ) : (
        <div>
          <h1>Menu</h1>
          {error && (
            <div
              style={{ color: "red", fontSize: "1.4rem", fontWeight: "bold" }}
            >
              {error}
            </div>
          )}
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
          />{" "}
        </div>
      )}
    </div>
  );
};

export default Home;
