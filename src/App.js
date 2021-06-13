import React, { useEffect } from 'react';
import './styles/css/bootstrap.css';
import './styles/App.scss';
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import { connect, Provider } from 'react-redux'
import Cookies from 'js-cookie';
import api from './api'

import { script_loaded } from './state/slices/scripts/scripts_slice';
import { fatal_error } from './state/slices/errors/errors';

import Home from './pages/home'
import Products from './pages/products'
import Product from './pages/product'
import Cart from './pages/cart'
import Header from './components/Header/Header'
import Footer from './components/Footer/footer'
import Checkout from './pages/checkout';
import Account from './pages/account'
import { logout } from './state/slices/auth/auth_slice';
import Orders from './pages/orders';

const mapStateToProps = state => {
    return {
        to_load_scripts: state.scripts.to_load_scripts,
        loaded_scripts: state.scripts.loaded_scripts,
        auth: state.auth,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        script_loaded: script => dispatch( script_loaded(script) ),
        fatal_error: (error_string, error) => dispatch( fatal_error({error_string, error}) ),
        logout: () => dispatch( logout() )
    }
}

const App = props => {
    const { to_load_scripts, script_loaded, auth, fatal_error, logout } = props;
    
    // useEffect(() => {
    //     Promise.all(loaded_scripts.map(async script => {
    //         await new Promise(resolve => setTimeout(resolve, 1000));
    //         const script_elem = document.createElement('script');
    //         script_elem.src = script;
    //         // script_elem.async = true;
    //         document.body.appendChild(script_elem);
    //     }))
    // }, [])

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

        // document.querySelectorAll('script').forEach( script => {
        //     if(script.src && !loaded_scripts.find( lscript_src => script.src.search(lscript_src) !== -1 )) {
        //         console.log("Removing ", script.src);
        //         script.remove();
        //     }
        // } )

    }, [to_load_scripts])

    api.interceptors.request.use( config => {
        // console.log(Cookies.get("Authorization"));
        const auth_headers = Cookies.get("Authorization");
        // if(!auth_headers) {
        //     logout();
        // }
        config.headers['Authorization'] = Cookies.get("Authorization");
        return config;
    }, error => {
        fatal_error("couldn't attach/remove auth credentials to request", error);
    } )

    // window.api = api;

    return (
        <div className="App">
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
                    <Route path="/cart">
                        <Cart />
                    </Route>
                    <Route path="/checkout">
                        <Checkout />
                    </Route>
                    <Route path="/account">
                        <Account />
                    </Route>
                    <Route path="/orders">
                        <Orders />
                    </Route>
                </Switch>
                <Footer />
                <div id="toTop"></div>
            </ BrowserRouter>
        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)( App );
