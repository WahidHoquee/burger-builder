import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import * as actionTypes from "../../../store/actions/actionTypes";

const Logout = props => {
    useEffect(() => {
        props.onLogOut();
    }, []);
    return (
        <div>
            <Redirect to="/" />
        </div>
    );
};
const mapDispatchToProps = dispatch => ({
    onLogOut: () => dispatch({ type: actionTypes.SESSION_TIMEOUT })
});
export default connect(null, mapDispatchToProps)(Logout);
