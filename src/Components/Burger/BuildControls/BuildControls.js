import React from "react";

import BuildControl from "./BuildControl/BuildControl";
import classes from "./BuildControls.css";

const Controls = [
    { label: "Meat", type: "meat" },
    { label: "Cheese", type: "cheese" },
    { label: "Bacon", type: "bacon" },
    { label: "Salad", type: "salad" }
];

const BuildControls = props => {
    return (
        <div className={classes.BuildControls}>
            <p>Price: <strong>{props.cost.toFixed(2)}</strong></p>
            {Controls.map(control => {
                return (
                    <BuildControl
                        key={control.type}
                        added={() => props.addIngredient(control.type)}
                        removed={() => props.removeIngredients(control.type)}
                        label={control.label}
                        isDisabled = {props.disableInfo[control.type]}
                    />
                );
            })}
            <button className={classes.OrderButton} onClick={props.modalVisibilityChange} disabled={!props.isOrderable}>
                {props.isAuthenticated ? 'ORDER NOW' : 'SIGN IN TO ORDER'}
            </button>
        </div>
    );
};

export default BuildControls;
