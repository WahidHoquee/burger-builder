import React, { useState } from "react";
import { connect } from "react-redux";

import Auxilary from "../Auxilary/Auxilary";
import Toolbar from "../../Components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../Components/Navigation/SideDrawer/SideDrawer";

const Layout = (props) => {
    const [sideDrawerVisible, setSideDrawerVisible] = useState(false);
    const backdropVisibilityHandler = () => {
        setSideDrawerVisible(false);
    };
    const backdropNoneVisibilityHandler = () => {
        setSideDrawerVisible(!sideDrawerVisible);
    };
    return (
        <Auxilary>
            <Toolbar
                isAuth={props.isAuthenticated}
                isSidedrawerVisible={sideDrawerVisible}
                backdropNoneVisibilityHandler={backdropNoneVisibilityHandler}
            />
            <SideDrawer
                isAuth={props.isAuthenticated}
                isBackdropVisible={sideDrawerVisible}
                backdropVisibilityHandler={backdropVisibilityHandler}
            />
            <main>{props.children}</main>
        </Auxilary>
    );
};
const mapStateToProps = state => ({
    isAuthenticated: state.auth.idToken
});

export default connect(mapStateToProps)(Layout);
