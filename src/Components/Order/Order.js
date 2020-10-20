import React from "react";

import classes from "./Order.css";

const Order = props => {
    const ingredients = [];
    for (let ingredientName in props.order.ingredients) {
        console.log(ingredientName);
        ingredients.push({
            name: ingredientName,
            ammount: props.order.ingredients[ingredientName]
        });
    }
    let items = ingredients.map(igkey => {
        return (
            <span key={igkey.name}>
                {igkey.name} ({igkey.ammount})
            </span>
        );
    });
    return (
        <div className={classes.Order}>
            <p>Ingredients: {items}</p>
            <p>
                Total Price: $
                <strong>{Number.parseFloat(props.order.totalCost).toFixed(2)}</strong> 
            </p>
        </div>
    );
};

export default Order;
