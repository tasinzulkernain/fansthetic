import React, {useEffect} from 'react';
import './styles/css/bootstrap.css';
import './styles/App.scss';
// import $ from 'jquery';
// import './js_inj/common_scripts'
// import './js/main'
// import './js/jquery.nice-select'
// import './js/jquery.mmenu.all'
// import './js/jquery.magnific-popup'
// import './js/carousel-home'
// import './js/jquery.cookiebar'
// import './js/footer-reveal'
// import './js/carousel_with_thumbs'
// import './js/carousel-home-2'
// import './js/bootstrap.bundle'
// import './js/ResizeSensor'
// import './js/wow'
// import './js/video_header'
// import './js/theia-sticky-sidebar'
// import './js/specific_listing'
// import './js/owl.carousel'
// import './js/modernizr'
// import './js/lazyload'

import Home from './pages/home'
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
      <Header />
      <Home />
      <Footer />
	    <div id="toTop"></div>  
    </div>
  );
}

export default App;
