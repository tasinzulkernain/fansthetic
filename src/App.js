import React, {useEffect} from 'react';
import './styles/css/bootstrap.css';
import './styles/App.scss';
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './state/store'

import Home from './pages/home'
import Products from './pages/products'
import Header from './components/Header/Header'
import Footer from './components/Footer/footer'

function App() {
  const scripts = [
    "/js/main.js",
    "/js/carousel-home.js",
    "/js/test.js",  
  ]
  useEffect( () => {
    Promise.all(scripts.map( async script => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const script_elem = document.createElement('script');
      script_elem.src = script;
      // script_elem.async = true;
      document.body.appendChild(script_elem); 
    } ))
  }, [] )
  return (
    <div className="App">
      <Provider store={store} >
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
        </Switch>
        <Footer />
        <div id="toTop"></div>  
      </ BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
