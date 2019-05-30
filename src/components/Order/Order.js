import React from 'react';
import classes from './Order.css';

const order = ( props ) => {
    const ingredients = [];
    for (let k in props.ingredients) {
        ingredients.push(
            <span 
                key={k}
                style={{
                    textTransform: "capitalize",
                    display: "inline-block",
                    listStyle: "none",
                    border: "1px solid #ccc",
                    padding: "5px",
                    margin: "2px"
                }}>{k}: {props.ingredients[k]}
            </span>
        )
    }

    return (
      <div className={classes.Order}>
        <p>Ingredients: {ingredients}</p>
        <p>
          Price: <strong>${props.price}</strong>
        </p>
      </div>
    );
}
    

export default order;