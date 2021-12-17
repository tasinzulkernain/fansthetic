import React, { createContext, useContext, useEffect, useState } from 'react';
import './styles/css/bootstrap.css';
import './styles/App.scss';
import { Switch, Route, Router, Redirect } from 'react-router-dom'
import { connect, Provider } from 'react-redux'
import Cookies from 'js-cookie';
import forge from 'node-forge'
import api from './api'
// import MessengerCustomerChat from 'react-messenger-customer-chat';

import { script_loaded } from './state/slices/scripts/scripts_slice';
import { fatal_error } from './state/slices/errors/errors';
import { logout, login } from './state/slices/auth/auth_slice';

import Home from './pages/home'
import Products from './pages/products'
import Product from './pages/product'
import Cart from './pages/cart'
import Header from './components/Header/Header'
import Footer from './components/Footer/footer'
import Checkout from './pages/checkout';
import Account from './pages/account'
import Orders from './pages/orders';
import Wishlist from './pages/wishlist';
import Profile from './pages/profile'
import NotFound from './pages/not_found';

import { show_alert, show_alert_done } from './state/slices/commands/commands_slice'

import { createBrowserHistory, createHashHistory } from 'history';
import OrderConfirm from './pages/order_confirm';

const mapStateToProps = state => {
    return {
        to_load_scripts: state.scripts.to_load_scripts,
        loaded_scripts: state.scripts.loaded_scripts,
        auth: state.auth,
        commands: state.commands
    }
}

const mapDispatchToProps = dispatch => {
    return {
        script_loaded: script => dispatch( script_loaded(script) ),
        fatal_error: (error_string, error) => dispatch( fatal_error({error_string, error}) ),
        logout: () => dispatch( logout() ),
        login: (username, password) => dispatch( login( {username, password} ) ),
        show_alert_done: () => dispatch( show_alert_done() ),
        show_alert: text => dispatch( show_alert( {text} ) )
    }
}

const authContext = createContext();

function PrivateRoute({ children, ...rest }) {
    let auth = useContext(authContext);
    console.log(auth);
    return (
        <Route
            {...rest}
            render={() => {
                console.log("auth ", auth);
                if(!auth.logged_in) show_alert( "you need to be logged in");
                return (
                    auth.logged_in ? (
                        children
                    ) : (
                        // <></>
                        <Redirect to="/account?no_auth_redirect=1" />
                    )
                )
            }}
        />
    );
}

const history = createHashHistory();

const App = props => {
    const { to_load_scripts, script_loaded, auth, fatal_error, login, logout, commands, show_alert } = props;

    

    useEffect(() => {
        Promise.all(to_load_scripts.map(async script_src => {
            // if (document.querySelector(`script[src="${script_src}"]`)) {
            //     console.log("Removing ", script_src);
            //     document.querySelector(`script[src="${script_src}"]`).remove();
            // }0
            const script_elem = document.createElement('script');
            script_elem.type = 'text/javascript';
            script_elem.src = script_src;
            document.body.appendChild(script_elem);
            document.body.removeChild(document.body.lastChild);
            console.log("loaded script ", script_src);
            script_loaded(script_src);
        }))

    }, [to_load_scripts]);

    useEffect( () => {
        // if(commands.alert_item.text === "initial"){
        //     return;
        // } 
        const container = document.querySelector('.alert-container');
        container.classList.add('alert-active');
        container.querySelector('span').textContent = commands.alert_item.text;
        setTimeout( () => {
            document.querySelector('.alert-container').classList.remove('alert-active');
            show_alert_done();
        }, commands.alert_item.timeout );
    }, [commands.alert_item] )

    useEffect( () => {
        const auth_header = Cookies.get("Authorization");
        if( auth_header ) {
            const auth = forge.util.decode64(auth_header.split(' ')[1]).split(':');
            console.log("auth - ", auth);
            login( auth[0], auth[1] )
        }
    }, [] )


    return (
        <div className="App">
            <div className="alert-primary alert-container alert-active" >
                <span className="" >Product addedd to cart</span>
            </div>
            <authContext.Provider value={{logged_in: Cookies.get('Authorization') !== undefined}}>
            
            <Router history={history} >
                <Header />
                <Switch>
                    <Route path="/" exact>
                        <Home />
                    </Route>
                    <Route path="/products">
                        <Products />
                    </Route>
                    <Route path="/products/">
                        <Products />
                    </Route>
                    <Route path="/product/">
                        <Product />
                    </Route>
                    <Route path="/cart">
                        <Cart />
                    </Route>
                    <PrivateRoute path="/checkout">
                        <Checkout />
                    </PrivateRoute>
                    <Route path="/account">
                        <Account />
                    </Route>
                    <PrivateRoute path="/order/confirm" exact>
                        <OrderConfirm />
                    </PrivateRoute>
                    <PrivateRoute path="/orders">
                        <Orders />
                    </PrivateRoute>
                    <PrivateRoute path="/wishlist">
                        <Wishlist />
                    </PrivateRoute>
                    <PrivateRoute path="/profile">
                        <Profile />
                    </PrivateRoute>
                    <Route path="*">
                        <NotFound />
                    </Route>
                </Switch>
                <Footer />
                <div id="toTop"></div>
            </ Router>
            </authContext.Provider>
            
            {/* <div>
                <MessengerCustomerChat
                    pageId="1493331417562328"
                    appId="846143616299880"
                />
            </div> */}
        </div>
    );
}


export { history };
export default connect(mapStateToProps, mapDispatchToProps)( App );
