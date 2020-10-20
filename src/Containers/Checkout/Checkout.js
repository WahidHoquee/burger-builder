import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import Contact from "./Contact/Contact";
import CheckoutSummary from "../../Components/Order/CheckoutSummary/CheckoutSummary";
import Aux from "../../HOC/Auxilary/Auxilary";

const Checkout = props => {
    const continueHandler = () => {
        props.history.replace("/checkout/contact");
    };

    const cancelHandler = () => {
        props.history.goBack();
    };

    let checkout = <Redirect to="/" />;

    if (props.ingredients) {
        const redirect = props.purchased ? <Redirect to="/" /> : null;
        checkout = (
            <Aux>
                {redirect}
                <CheckoutSummary
                    continueHandler={continueHandler}
                    cancelHandler={cancelHandler}
                    ingredients={props.ingredients}
                />
                <Route
                    path={props.match.path + "/contact"}
                    render={() => (
                        <Contact
                            ingredients={props.ingredients}
                            totalCost={props.totalCost}
                            {...props}
                        />
                    )}
                />
            </Aux>
        );
    }
    return checkout;
};
const mapStateToProps = state => ({
    ingredients: state.burgerBuilder.ingredients,
    totalCost: state.burgerBuilder.totalCost,
    purchased: state.order.purchased
});

export default connect(mapStateToProps)(Checkout);
