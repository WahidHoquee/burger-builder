import React from "react";

import classes from "./Modal.css";

import Aux from "../../../HOC/Auxilary/Auxilary";
import Backdrop from "../Backdrop/Backdrop";

const Modal = props => (
    <Aux>
        <Backdrop show={props.modalVisibility} clicked={props.orderCancelHandler}/>
        <div
            className={classes.Modal}
            style={{
                transform: props.modalVisibility
                    ? "translateY(0)"
                    : "translateY(-100vh)",
                opacity: props.modalVisibility ? 1 : 0
            }}
        >
            {props.children}
        </div>
    </Aux>
);

export default Modal;
