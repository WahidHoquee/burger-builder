import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import Input from "../../Components/UI/Input/Input";
import Button from "../../Components/UI/Button/Button";
import classes from "./Auth.css";
import * as actions from "../../store/actions/index";
import Spinner from "../../Components/UI/Spinner/Spinner";

const Auth = props => {
    const [controls, setControls] = useState({
        email: {
            elementType: "input",
            elementConfig: {
                type: "email",
                placeholder: "Mail Address"
            },
            value: "",
            validation: {
                required: true,
                isEmail: true
            },
            valid: false,
            touched: false
        },
        password: {
            elementType: "input",
            elementConfig: {
                type: "password",
                placeholder: "Password"
            },
            value: "",
            validation: {
                required: true,
                minLength: 6
            },
            valid: false,
            touched: false
        }
    });
    const [isSignUp, setIsSignUp] = useState(true);

    useEffect(() => {
        if (!props.buildingBurger && props.path !== "/") {
            props.setAuth();
        }
    }, []);

    const checkValidity = (value, rules) => {
        let isValid = true;
        if (!rules) {
            return true;
        }

        if (rules.required) {
            isValid = value.trim() !== "" && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid;
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid;
        }

        return isValid;
    };

    const inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...controls,
            [controlName]: {
                ...controls[controlName],
                value: event.target.value,
                valid: checkValidity(
                    event.target.value,
                    controls[controlName].validation
                ),
                touched: true
            }
        };
        setControls(updatedControls);
    };

    const submitHandler = event => {
        event.preventDefault();
        props.onAuth(controls.email.value, controls.password.value, isSignUp);
    };

    const authTypeChangeHandler = () => {
        setIsSignUp(!isSignUp);
    };

    const formElementsArray = [];
    for (let key in controls) {
        formElementsArray.push({
            id: key,
            config: controls[key]
        });
    }

    let form = formElementsArray.map(formElement => (
        <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            changed={event => inputChangedHandler(event, formElement.id)}
        />
    ));
    if (props.loading) {
        form = <Spinner />;
    }
    return (
        <div className={classes.Auth}>
            {props.isAuthenticated ? <Redirect to={props.path} /> : null}
            {props.error ? <p>{props.error.message}</p> : null}
            <form onSubmit={submitHandler}>
                {form}
                <Button btnType="Success">SUBMIT</Button>
            </form>
            <Button btnType="Danger" clicked={authTypeChangeHandler}>
                {isSignUp ? "SIGN IN" : "SIGN UP"}
            </Button>
        </div>
    );
};
const mapStateToProps = state => ({
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.idToken,
    path: state.auth.redirectLink,
    buildingBurger: state.burgerBuilder.buildingBurger
});
const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignUp) =>
            dispatch(actions.auth(email, password, isSignUp)),
        setAuth: path => dispatch(actions.setAuthRedirect("/"))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
