import './App.css'

const UserFoodList = ({ itemsalreadyadded,removefromlist }) => {
    return (
      <div className="food">
        <h1>Lista do utilizador:</h1>
        <div className='food-list'>
        {itemsalreadyadded.map(fooditem => (
          <div className="food-preview" key={fooditem.id} >
            <h2>{ fooditem.title }</h2>
            <p>{ fooditem.description }</p>
            <p>{fooditem.price}€</p>
            <button onClick={() => removefromlist(fooditem)}>Remover da lista</button>
          </div>
         
        ))}
         </div>
      </div>
    );
  }
   
  export default UserFoodList;