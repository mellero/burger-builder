import React, { Fragment } from 'react';
import Button from '../../UI/Button/Button';

const orderSummary = ( props ) => {
    const ingredientSummary = [];
    for (let ing in props.ingredients) {
        ingredientSummary.push(<li key={ing}>{ing.toUpperCase()}: {props.ingredients[ing]}</li>)
    }

    return (
        <Fragment>
            <h3>Your Order:</h3>
            <p>Ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total: ${props.price.toFixed(2)}</strong></p>
            <p>Continue to checkout?</p>
            <Button btnType={"Danger"} clicked={props.cancel}>CANCEL</Button>
            <Button btnType={"Success"} clicked={props.continue}>CONTINUE</Button>
        </Fragment>
    );
}

export default orderSummary;