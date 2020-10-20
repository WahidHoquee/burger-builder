import React, { useEffect } from "react";
import { connect } from "react-redux";

import * as actions from "../../store/actions/index";

import Order from "../../Components/Order/Order";

import classes from "./Orders.css";
import Axios from "../../axios-order";
import withErrorHandler from "../../HOC/withErrorHandler/withErrorHandler";

const Orders = props => {
    useEffect(() => {
        props.fetchOrder(props.token, props.userId);
    }, []);

    let orders = (
        <div className={classes.Orders}>
            {props.orders.map(order => {
                return <Order key={order.id} order={order} />;
            })}
        </div>
    );

    if (props.loading) {
        orders = <spinner />;
    }
    return orders;
};

const mapStateToProps = state => ({
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.idToken,
    userId: state.auth.userId
});

const mapDispatchToProps = dispatch => ({
    fetchOrder: (token, userId) => dispatch(actions.fetchOrder(token, userId))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withErrorHandler(Orders, Axios));
