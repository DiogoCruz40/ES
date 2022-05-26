import { useState } from "react";
import Webcam from "react-webcam";

const UserFoodList = ({
  itemsalreadyadded,
  removefromlist,
  handlesubmit,
  webcamRef,
  capture,
  videoConstraints,
  image,
  totalprice
}) => {
  const [inputValue, setInputValue] = useState("");
  const [IsInvalid, setIsInvalid] = useState(false);
  const onChangeHandler = (event) => {
    setInputValue(event.target.value);
  };
  return (
    <div className="food">
      <h1>Lista do utilizador:</h1>
      <div className="food-list">
        {itemsalreadyadded.map((fooditem) => (
         
          <div className="food-preview" key={fooditem.id}>
            <h2>{fooditem.title}</h2>
            <p>{fooditem.description}</p>
            <p>{fooditem.price}€</p>
            <button onClick={() => removefromlist(fooditem)}>
              Remover da lista
            </button>
          </div>
        ))}
      </div>

      {itemsalreadyadded.length > 0 && (
        <div>
          <h1 className="p-3">Preço total: {totalprice}€</h1>
          <div style={{marginTop:'15px'}}>
            {image ? (
              <img src={image}  alt="User_capture_img"/>
            ) : (
              <div>
                <Webcam
                  audio={false}
                  height={200}
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  width={220}
                  videoConstraints={videoConstraints}
                />
                <br></br>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    capture();
                  }}
                >
                  Capture
                </button>
              </div>
            )}
          </div>
          <div>
            <p className="pt-2">Número da Location tag</p>
            <input
              min={1}
              type="number"
              name="number"
              onChange={onChangeHandler}
              value={inputValue}
            />{" "}
            <br></br>
            <button
              onClick={() =>
                handlesubmit(
                  inputValue,
                  setInputValue,
                  itemsalreadyadded,
                  setIsInvalid
                )
              }
              className="btnsubmit btn-primary"
            >
              Submit
            </button>
            {IsInvalid && (
              <p className="mt-2 fw-bold" style={{ color: "red" }}>
                Did you forget to input the number of the location tag or
                capture the image?
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserFoodList;
