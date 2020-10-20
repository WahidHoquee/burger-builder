import React from "react";
import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button";

import classes from "./CheckoutSummary.css";

const CheckoutSummary = props => (
    <div className={classes.CheckoutSummary}>
        <h1>We hope it taste's well</h1>
        <div>
            <Burger ingredients={props.ingredients} />
        </div>
        <div className = {classes.Button}>
            <Button clicked={props.cancelHandler} btnType="Danger">
                CANCEL
            </Button>
            <Button clicked={props.continueHandler} btnType="Success">
                CONTINUE
            </Button>
        </div>
    </div>
);

export default CheckoutSummary;
