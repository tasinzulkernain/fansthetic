import React, { createContext, useContext, useEffect, useState } from 'react';
import './styles/css/bootstrap.css';
import './styles/App.scss';
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom'
import { connect, Provider } from 'react-redux'
import Cookies from 'js-cookie';
import forge from 'node-forge'
import api from './api'

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
        login: (username, password) => dispatch( login( {username, password} ) )
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
                console.log(auth);
                return (
                    auth.logged_in !== undefined ? (
                        children
                    ) : (
                        <></>
                        // <Redirect to="/account" />
                    )
                )
            }}
        />
    );
}

const App = props => {
    const { to_load_scripts, script_loaded, auth, fatal_error, login, logout, commands } = props;
    
    useEffect(() => {
        Promise.all(to_load_scripts.map(async script_src => {
            if (document.querySelector(`script[src="${script_src}"]`)) {
                console.log("Removing ", script_src);
                document.querySelector(`script[src="${script_src}"]`).remove();
            }
            const script_elem = document.createElement('script');
            script_elem.src = script_src;
            document.body.appendChild(script_elem);
            console.log("loaded script ", script_src);
            script_loaded(script_src);
        }))

    }, [to_load_scripts])

    useEffect( () => {
        const auth_header = Cookies.get("Authorization");
        if( auth_header ) {
            const auth = forge.util.decode64(auth_header.split(' ')[1]).split(':');
            console.log("auth - ", auth);
            login( auth[0], auth[1] )
        }
    }, [] )


    // useEffect( () => {
    //     if(commands.re_initalize) {
    //         window.location.reload();
    //     }
    // }, [commands] )


    api.interceptors.request.use( config => {
        config.headers['Authorization'] = Cookies.get("Authorization");
        return config;
    }, error => {
        fatal_error("couldn't attach/remove auth credentials to request", error);
    } )

    // window.api = api;

    return (
        <div className="App">
            <authContext.Provider value={{logged_in: Cookies.get('Authorization') !== undefined}}>
            <BrowserRouter

            >
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
                    <PrivateRoute path="/cart">
                        <Cart />
                    </PrivateRoute>
                    <PrivateRoute path="/checkout">
                        <Checkout />
                    </PrivateRoute>
                    <Route path="/account">
                        <Account />
                    </Route>
                    <Route path="/orders">
                        <Orders />
                    </Route>
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
            </ BrowserRouter>
            </authContext.Provider>
        </div>
    );
}


export default connect(mapStateToProps, mapDispatchToProps)( App );
