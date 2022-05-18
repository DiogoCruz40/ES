
const FoodList = ({ fooditems,addtolist }) => {
    return (
      <div className="food">
        <div className='food-list'>
        {fooditems.map(fooditem => (
          <div className="food-preview" key={fooditem.id} >
            <h2>{ fooditem.title }</h2>
            <p>{ fooditem.description }</p>
            <p>{fooditem.price}€</p>
            <button onClick={() => addtolist(fooditem)}>Adicionar à lista</button>
          </div>
         
        ))}
         </div>
      </div>
    );
  }
   
  export default FoodList;