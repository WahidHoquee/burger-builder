import React, { Suspense, useEffect } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch, withRouter } from "react-router-dom";
import Logout from "./Containers/Auth/Logout/Logout";
import BurgerBuilder from "./Containers/BurgerBuilder/BurgerBuilder";
import Layout from "./HOC/Layout/Layout";
import * as actions from "./store/actions/index";



const Checkout = React.lazy(() => import("./Containers/Checkout/Checkout"));
const Orders = React.lazy(() => import("./Containers/Orders/Orders"));
const Auth = React.lazy(() => import("./Containers/Auth/Auth"));

const App = ({ localLogin, isAuthenticated }) => {
    useEffect(() => {
        localLogin();
    }, []);

    let route = (
        <Switch>
            <Route path="/auth" render={(props) => <Auth {...props}/>} />
            <Route path="/" exact component={BurgerBuilder} />
            irect to="/" />
        </Switch>
    );
    if (isAuthenticated) {
        route = (
            <Switch>
                <Route path="/checkout" render={(props) => <Checkout {...props}/>} />
                <Route path="/orders" render={(props) => <Orders {...props}/>} />
                <Route path="/logout" component={Logout} />
                <Route path="/auth" render={(props) => <Auth {...props}/>} />
                <Route path="/" exact component={BurgerBuilder} />
                irect to="/" />
            </Switch>
        );
    }
    return (
        <Layout>
            <Suspense fallback={<p>Loading.......</p>}>{route}</Suspense>
        </Layout>
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.idToken !== null
});

const mapDispatchToProps = dispatch => ({
    localLogin: () => dispatch(actions.fetchLocalStorage())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
