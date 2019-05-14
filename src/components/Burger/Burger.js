import React from 'react';
import classes from './Burger.css'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';


const burger = ( props ) => {
    // const transformedIngredients = 
    //     Object.keys(props.ingredients)
    //     .map(igKey => {
    //         return [...Array(props.ingredients[igKey])].map((_, i) => {
    //             return <BurgerIngredient key={igKey + i} type={igKey}/>
    //         });
    //     });

    let transformedIngredients = [];
    for (let ig in props.ingredients) {
        for (let i = 0; i < props.ingredients[ig]; i++) {
            transformedIngredients.push(<BurgerIngredient key={ig + i} type={ig}/>);
        }
    }

    if (transformedIngredients.length === 0) transformedIngredients = <p>Please add ingredients!</p>

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
}

export default burger;