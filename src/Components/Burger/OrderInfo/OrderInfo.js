import React from "react";

import Aux from "../../../HOC/Auxilary/Auxilary";
import Button from '../../UI/Button/Button';

const OrderInfo = props => {
    const orderedIngredients = Object.keys(props.ingredients).map(igKey => {
        return (
            <li key={igKey}>
                <span style={{ textTransform: "uppercase" }}>{igKey}</span> :{" "}
                {props.ingredients[igKey]}
            </li>
        );
    });
    return (
        <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients</p>
            <ul>{orderedIngredients}</ul>
            <p>Total Price: <strong>{props.totalPrice.toFixed(2)}</strong></p>
            <p>Want to check out?</p>
            <Button btnType="Success" clicked={props.orderContinueHandler}>CONTINUE</Button>
            <Button btnType="Danger" clicked={props.orderCancelHandler}>CANCEL</Button>
        </Aux>
    );
};

export default (OrderInfo);
