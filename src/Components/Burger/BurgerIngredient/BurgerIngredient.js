import React, { Component } from "react";

import classes from "./BurgerIngredient.css";

class BurgerIngredients extends Component {
    render() {
        let ingredients = null;
        switch (this.props.type) {
            case "breadTop":
                ingredients = (
                    <div className={classes.BreadTop}>
                        <div className={classes.Seeds1}></div>
                        <div className={classes.Seeds2}></div>
                    </div>
                );
                break;
            case "breadBottom":
                ingredients = <div className={classes.BreadBottom}></div>;
                break;
            case "meat":
                ingredients = <div className={classes.Meat}></div>;
                break;
            case "cheese":
                ingredients = <div className={classes.Cheese}></div>;
                break;
            case "salad":
                ingredients = <div className={classes.Salad}></div>;
                break;
            case "bacon":
                ingredients = <div className={classes.Bacon}></div>;
                break;
            default:
                ingredients = null;
                break;
        }
        return ingredients;
    }
}

export default BurgerIngredients;
