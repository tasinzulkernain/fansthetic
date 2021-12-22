import React, { useEffect, useState } from 'react';
import Logo from '../../img/logo.png';

import { add_to_cart, initialize_cart, remove_from_cart, update_cart } from '../../state/slices/cart/cart_slice'
import { set_categories } from '../../state/slices/statics/statics_slice'
import { load_scripts } from '../../state/slices/scripts/scripts_slice'
import { logout } from '../../state/slices/auth/auth_slice'

import { connect } from 'react-redux'
import qs from 'query-string'
import { useLocation, useHistory } from 'react-router';
import { Link } from 'react-router-dom';

const mapStateToProps = state => {
	return {
		auth: state.auth,
		cart: state.cart,
		categories: state.statics.categories,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		initialize_cart: () => dispatch( initialize_cart() ),
		load_scripts: comp => dispatch( load_scripts("header", "default") ),
		update_cart: cart => dispatch( update_cart(cart) ), 
		add_to_cart: product_id => dispatch( add_to_cart({product_id, quantity: 1}) ),
		remove_from_cart: product_id => dispatch( remove_from_cart({product_id}) ),
		set_categories: () => dispatch( set_categories() ),
		logout: () => dispatch( logout() ),
	}
}

const Header = props => {

	const { cart, categories, set_categories, load_scripts, remove_from_cart, initialize_cart, auth, logout } = props;
	const [ search_string, update_search_string ] = useState("");

	const location = useLocation();
	const history = useHistory();

	useEffect(() => {
		// load_scripts("default");
		const qparams = qs.parse(location.search);
		if(qparams.search) {
			update_search_string(qparams.search);
		}
		initialize_cart();
		set_categories();
		// load_scripts("default");
	}, []);


	useEffect(() => {
		if(!categories.loading) {
			setTimeout( () => load_scripts("default"), 500 );
		}
	}, [categories])

	const handleKeyUp = e => {
		if(e.key == "Enter") {
			window.location = document.querySelector('#search_button').href;
		}
	} 

	return (
	<header className="version_1">
		<div className="layer"></div>{/*<!-- Mobile menu overlay mask -->*/}
		<div className="main_header">
			<div className="container">
				<div className="row small-gutters">
					<div className="col-xl-3 col-lg-3 d-lg-flex align-items-center">
						<div id="logo">
							<Link to="/"><img src={Logo} alt="" width="65" height="65"/></Link>
						</div>
					</div>
					<nav className="col-xl-6 col-lg-7">
						<a className="open_close" href="javascript:void(0);">
							<div className="hamburger hamburger--spin">
								<div className="hamburger-box">
									<div className="hamburger-inner"></div>
								</div>
							</div>
						</a>
						{/* <!-- Mobile menu button --> */}
						<div className="main-menu">
							<div id="header_menu">
								<Link to="/"><img src={Logo} alt="" width="100" height="100"/></Link>
								<a href="#" className="open_close" id="close_in"><i className="ti-close"></i></a>
							</div>
							<ul>
								{/* <li className="header-menu">
									<a href="javascript:void(0);" className="show-submenu">  </a>
								</li> */}
								{/* <li className="header-menu">
									<Link href="/contact" > Contact us </Link>
								</li> */}
								<li style={{marginLeft: '10rem'}} className="header-menu">
									<Link to="/products" > Products </Link>
								</li>
								<li className="header-menu">
									<Link to="/orders" > Orders </Link>
								</li>
								<li className="header-menu">
									<Link to="/profile" > Profile </Link>
								</li>
							</ul>
						</div>
						{/* <!--/main-menu --> */}
					</nav>
					<div className="col-xl-3 col-lg-2 d-lg-flex align-items-center justify-content-end text-right">
						<a className="phone_top" href="tel://+8801714456327"><strong><span>Need Help?</span>+8801714456327</strong></a>
					</div>
				</div>
				{/* <!-- /row --> */}
			</div>z
		</div>
		{/* <!-- /main_header --> */}

		<div className="main_nav Sticky">
			<div className="container">
				<div className="row small-gutters">
					<div className="col-xl-3 col-lg-3 col-md-3">
						<nav className="categories">
							<ul className="clearfix">
								<li><span>
										<a href="#">
											<span className="hamburger hamburger--spin">
												<span className="hamburger-box">
													<span className="hamburger-inner"></span>
												</span>
											</span>
											Categories
										</a>
									</span>
									<div id="menu">
										<ul>
											{!categories.loading && categories.list.map( cat => 
												<Link to={`/products?${new URLSearchParams({category: cat.title}).toString()}`}>
												<li className="w-100 ">
													<div className="d-flex w-100 px-2 py-1">
														<img className="border rounded" src={cat.thumbnail} width="50" height="50"/>
														<Link className="flex-grow-1" to={`/products?${new URLSearchParams({category: cat.title}).toString()}`}>{cat.title}</Link>
													</div>
												</li>
												</Link>
											)}
										</ul>
									</div>
								</li>
							</ul>
						</nav>
					</div>
					<div className="col-xl-6 col-lg-7 col-md-6 d-none d-md-block">
						<div className="custom-search-input">
							<input type="text" placeholder="Search over 500 products" value={search_string} onChange={e => update_search_string(e.target.value)} onKeyUp={ handleKeyUp }/>
							<button type="submit">
								<Link id="search_button" to={`/products?${new URLSearchParams({search: search_string}).toString()}`} >
									<i className="header-icon_search_custom"/>
								</Link>
							</button>
						</div>
					</div>
					<div className="col-xl-3 col-lg-2 col-md-3">
						<ul className="top_tools">
							<li>
								<div className="dropdown dropdown-cart">
									<Link to="/cart" className="cart_bt"><strong>{cart.count}</strong></Link>
									<div className="dropdown-menu">
										<ul>
											{cart.products.map( product =>
												<li>
													<Link to={`/product?product_id=${product.product_id}`}>
														<figure><img src={product.product__thumbnail} data-src={product.product__thumbnail} alt="" width="50" height="50" className="lazy"/></figure>
														<strong><span>{product.product__title}</span>{product.protuct__price}</strong>
													</Link>
													<a style={{cursor:'pointer'}} onClick={() => remove_from_cart(product.product_id)} className="action"><i className="ti-trash"></i></a>
												</li>
											)}
										</ul>
										<div className="total_drop">
											<div className="clearfix"><strong>Total</strong><span>{cart.total_amount}</span></div>
											<Link to="/cart" className="btn_1 outline">View Cart</Link>
											<Link to="/checkout" className="btn_1">Checkout</Link>
										</div>
									</div>
								</div>
								{/* <!-- /dropdown-cart--> */}
							</li>
							<li>
								<Link to="/wishlist" className="wishlist"><span>Wishlist</span></Link>
							</li>
							<li>
								<div className="dropdown dropdown-access">
									<Link to="/profile" className="access_link"><span>Account</span></Link>
									<div className="dropdown-menu">
										{
											auth.status == "LOGGED IN" ? <Link to="/" onClick={ logout } className="btn_1">Log out</Link>
											: <Link to="/account" className="btn_1">Log In or Sign Up</Link>
										}
										{
											auth.status === "LOGGED IN" ? 
											<ul>
												<li>
													<Link to="/orders"><i className="ti-truck"></i>Track your Order</Link>
												</li>
												<li>
													<Link to="/orders"><i className="ti-package"></i>My Orders</Link>
												</li>
												<li>
													<Link to="/profile"><i className="ti-user"></i>My Profile</Link>
												</li>
											</ul>
										:	<></>
										}
									</div>
								</div>
								{/* <!-- /dropdown-access--> */}
							</li>
							<li>
								<a href="javascript:void(0);" class="btn_search_mob"><span>Search</span></a>
							</li>
							<li>
								<a href="#menu" className="btn_cat_mob">
									{/* <div className="hamburger hamburger--spin" id="hamburger">
										<div className="hamburger-box">
											<div className="hamburger-inner"></div>
										</div>
									</div> */}
									Categories
								</a>
							</li>
						</ul>
					</div>
				</div>
				{/* <!-- /row --> */}
			</div>
			<div className="search_mob_wp">
				<input type="text" className="form-control" value={search_string} placeholder="Search over 10.000 products" onChange={e => update_search_string(e.target.value)}/>
				<Link to={`/products?${new URLSearchParams({search: search_string}).toString()}`} type="submit" className="btn_1 full-width"> Search </Link>
			</div>
			{/* <!-- /search_mobile --> */}
		</div>
		{/* <!-- /main_nav --> */}
	</header>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);