import React from "react";

import classes from "./Toolbar.css";

import NavigationItems from "../NavigationItems/NavigationItems";
import Logo from "../../Logo/Logo";

const Toolbar = props => {
    let classList = [classes.MenuIcon];
    if(props.isSidedrawerVisible){
        classList = [classes.MenuIcon,classes.ClickedMenuIcon];
    }
    return (
        <div className={classes.Toolbar}>
            <div
                className={classes.Menu}
                onClick={props.backdropNoneVisibilityHandler}
            >
                <span className={classList.join(" ")}></span>
            </div>
            <div className={[classes.Logo, classes.DesktopVersion].join(" ")}>
                <Logo />
            </div>
            <nav className={classes.DesktopVersion}>
                <NavigationItems isAuthenticated={props.isAuth}/>
            </nav>
        </div>
    );
};

export default Toolbar;
