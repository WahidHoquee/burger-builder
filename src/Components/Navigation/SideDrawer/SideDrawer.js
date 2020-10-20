import React from "react";

import classes from "./SideDrawer.css";

import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import Backdrop from "../../UI/Backdrop/Backdrop";
import Aux from "../../../HOC/Auxilary/Auxilary";

const SideDrawer = (props) => {
    let classLogical = [classes.SideDrawer,classes.close];
    if(props.isBackdropVisible){
        classLogical = [classes.SideDrawer,classes.open];
    }
    return (
        <Aux>
            <Backdrop show={props.isBackdropVisible} clicked={props.backdropVisibilityHandler}/>
            <div className={classLogical.join(" ")} onClick={props.backdropVisibilityHandler}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <NavigationItems isAuthenticated={props.isAuth}/>
            </div>
        </Aux>
    );
};

export default SideDrawer;
