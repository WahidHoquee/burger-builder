import React, { useState } from "react";
import axios from "../../../axios-order";
import { connect } from "react-redux";

import withErrorHandler from "../../../HOC/withErrorHandler/withErrorHandler";
import * as action from "../../../store/actions/index";

import Button from "../../../Components/UI/Button/Button";
import classes from "./Contact.css";
import Spinner from "../../../Components/UI/Spinner/Spinner";
import Input from "../../../Components/UI/Input/Input";

const Contact = props => {
    const [orderForm, setOrderForm] = useState({
        name: {
            elementType: "input",
            elementConfig: {
                type: "text",
                placeholder: "Your Name"
            },
            value: "",
            validation: {
                required: true
            },
            isValid: false,
            touched: false
        },
        house: {
            elementType: "input",
            elementConfig: {
                type: "text",
                placeholder: "House No"
            },
            value: "",
            validation: {
                required: true,
                maxLength: 5
            },
            isValid: false,
            touched: false
        },
        road: {
            elementType: "input",
            elementConfig: {
                type: "text",
                placeholder: "Road No"
            },
            value: "",
            validation: {
                required: true
            },
            isValid: false,
            touched: false
        },
        city: {
            elementType: "input",
            elementConfig: {
                type: "text",
                placeholder: "City Name"
            },
            value: "",
            validation: {
                required: true
            },
            isValid: false,
            touched: false
        },
        email: {
            elementType: "input",
            elementConfig: {
                type: "email",
                placeholder: "Email Address"
            },
            value: "",
            validation: {
                required: true
            },
            isValid: false,
            touched: false
        },
        deliveryMethod: {
            elementType: "select",
            elementConfig: {
                options: [
                    { value: "fastest", displayValue: "Fastest" },
                    { value: "cheapest", displayValue: "Cheapest" }
                ]
            },
            value: "",
            isValid: true
        }
    });

    const [formValid, setFormValid] = useState(false);

    const validityCheck = (rules, value) => {
        let valid = true;

        if (rules.required) {
            valid = value.trim() !== "" && valid;
        }
        if (rules.minLength) {
            valid = value.length >= rules.minLength && valid;
        }
        if (rules.maxLength) {
            valid = value.length <= rules.maxLength && valid;
        }

        return valid;
    };

    const confirmHandler = e => {
        e.preventDefault();

        //To Convert the Contact Form's data into an object,And we send it to firebase
        const orderUserInfo = {};
        for (let key in orderForm) {
            orderUserInfo[key] = orderForm[key].value;
        }

        //Order obj is to be send on firebase
        const order = {
            ingredients: props.ingredients,
            totalCost: props.totalCost,
            userInfo: orderUserInfo,
            userId: props.userId
        };

        props.orderSubmitHandler(order, props.token);
    };

    const inputChangedHandler = (e, inputElement) => {
        //Although destructuring the parent objcet, the child obj still refers to the past adress so we have to destructure the child objcet also.
        const updatedOrderForm = { ...orderForm };
        const updatedInputElement = { ...updatedOrderForm[inputElement] };
        updatedInputElement.value = e.target.value;

        //Input validation Check
        if (updatedInputElement.validation) {
            updatedInputElement.isValid = validityCheck(
                updatedInputElement.validation,
                updatedInputElement.value
            );
            updatedInputElement.touched = true;
        }
        
        //To check if the overall form is Valid or not
        let isFormValid = true;
        for (let inputKey in updatedOrderForm) {
            isFormValid = updatedOrderForm[inputKey].isValid && isFormValid;
        }

        updatedOrderForm[inputElement] = updatedInputElement;
        setOrderForm(updatedOrderForm);
        setFormValid(isFormValid)
    };

    //To render the form elements.We are converting the orderForm to our desired Array format so that we can render using map.
    let orderInput = [];
    for (let key in orderForm) {
        orderInput.push({
            id: key,
            config: orderForm[key]
        });
    }

    let form;
    form = (
        <form onSubmit={confirmHandler}>
            {orderInput.map(formInput => {
                return (
                    <Input
                        key={formInput.id}
                        elementType={formInput.config.elementType}
                        elementConfig={formInput.config.elementConfig}
                        value={formInput.config.value}
                        valid={formInput.config.isValid}
                        shouldValidate={formInput.config.validation}
                        touched={formInput.config.touched}
                        changed={e => inputChangedHandler(e, formInput.id)}
                    />
                );
            })}
            <Button
                label=""
                style={{ textAlign: "center" }}
                btnType="Danger"
                disabled={!formValid}
            >
                CONFIRM
            </Button>
        </form>
    );

    if (props.loading) {
        form = <Spinner />;
    }

    return (
        <div className={classes.Contact}>
            <h1 className={classes.Headline}>Enter Your Contact Data</h1>
            {form}
        </div>
    );
};
const mapStateToProps = state => ({
    loading: state.order.loading,
    token: state.auth.idToken,
    userId: state.auth.userId
});
const mapDispatchToProps = dispatch => ({
    orderSubmitHandler: (orderData, token) =>
        dispatch(action.orderSubmit(orderData, token))
});
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withErrorHandler(Contact, axios));
