import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import * as actions from "../../store/actions/index";

import Burger from "../../Components/Burger/Burger";
import BuildControl from "../../Components/Burger/BuildControls/BuildControls";
import OrderInfo from "../../Components/Burger/OrderInfo/OrderInfo";
import Spinner from "../../Components/UI/Spinner/Spinner";

import Modal from "../../Components/UI/Modal/Modal";
import axios from "../../axios-order";
import withErrorHandler from "../../HOC/withErrorHandler/withErrorHandler";
import Aux from "../../HOC/Auxilary/Auxilary";

const BurgerBuilder = props => {
    const [modalVisibility, setModalVisibility] = useState(false);

    useEffect(() => {
        props.syncIngredients();
    }, []);

    //When the user changes the ingredient we need to update the cost balance
    const updatePurchaseState = () => {
        const ingredients = { ...props.ingredients };
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                sum += el;
                return sum;
            }, 0);
        return sum > 0;
    };

    const orderInfoScreenHandler = () => {
        if (props.isAuthenticated) {
            setModalVisibility(true);
        } else {
            props.setAuthRedirect("/checkout");
            props.history.push("/auth");
        }
    };

    const orderCancelHandler = () => {
        setModalVisibility(false);
    };

    const orderContinueHandler = () => {
        props.onPurchaseDone();
        props.history.push("/checkout");
    };

    const disableInfo = { ...props.ingredients };
    for (const key in disableInfo) {
        disableInfo[key] = disableInfo[key] <= 0;
    }

    let burgerLayout = props.error ? (
        <p>Unable to load ingredients</p>
    ) : (
        <Spinner />
    );
    let modalChild = null;

    if (props.ingredients) {
        burgerLayout = (
            <Aux>
                <div style={{ margin: "155px" }}>
                    <Burger ingredients={props.ingredients} />
                </div>
                <BuildControl
                    cost={props.total}
                    addIngredient={props.addIngredients}
                    removeIngredients={props.removeIngredients}
                    disableInfo={disableInfo}
                    isOrderable={updatePurchaseState()}
                    isAuthenticated={props.isAuthenticated}
                    modalVisibilityChange={orderInfoScreenHandler}
                />
            </Aux>
        );
        modalChild = (
            <OrderInfo
                ingredients={props.ingredients}
                totalPrice={props.total}
                orderContinueHandler={orderContinueHandler}
                orderCancelHandler={orderCancelHandler}
            />
        );
    }
    return (
        <div>
            <Modal
                modalVisibility={modalVisibility}
                orderCancelHandler={orderCancelHandler}
            >
                {modalChild}
            </Modal>
            {burgerLayout}
        </div>
    );
};
const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        total: state.burgerBuilder.totalCost,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.idToken
    };
};
const mapDispatchToProps = dispatch => {
    return {
        addIngredients: ingredientType =>
            dispatch(actions.addIngredients(ingredientType)),
        removeIngredients: ingredientType =>
            dispatch(actions.removeIngredients(ingredientType)),
        syncIngredients: () => dispatch(actions.syncIngredients()),
        onPurchaseDone: () => dispatch(actions.orderSubmitDone()),
        setAuthRedirect: path => dispatch(actions.setAuthRedirect(path))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
