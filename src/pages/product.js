import React, { useEffect, useState } from 'react';
import '../styles/product_page.scss'

import { fetch_product, fetch_product_failure } from '../state/slices/pages/product/product_slice';

import qs from 'query-string' 
import { useLocation } from 'react-router';
import { connect } from 'react-redux';
import { add_to_cart } from '../state/slices/cart/cart_slice';

import Loading from '../components/Global/loading';

const mapStateToProps = state => {
    return {
        status: state.pages.product.status,
        product: state.pages.product.product
    }
}

const mapDispatchToProps = dispatch => {
    return {
        add_to_cart: (product_id, quantity) => dispatch( add_to_cart( {product_id, quantity} ) ),
        fetch_product: product_id => dispatch( fetch_product( {product_id} ) )
    }
}

const Product = props => {

    const { status, product, fetch_product, add_to_cart } = props;
    
    const [quantity, update_quantity] = useState( 1 ); 

    const location = useLocation()
    
    useEffect( () => {
        const qparams = qs.parse(location.search)
        fetch_product( qparams.product_id );
        console.log(JSON.stringify(qs.parse(location.search)))
    }, [location] );

    useEffect( () => {
        console.log(product);
    }, [product] )

    return (
        <main>
            { status === "LOADING" ? 
                <Loading />
            :   <>
                    <div className="container margin_30">
                        {/* <div className="countdown_inner">-20% This offer ends in <div data-countdown="2020/05/15" className="countdown" />
                        </div> */}
                        <div className="row">
                            <div className="col-lg-6 magnific-gallery">
                                <p>
                                    <a href={product.thumbnail} title={product.alt} data-effect="mfp-zoom-in"><img src={product.thumbnail} alt={product.alt} className="img-fluid" /></a>
                                </p>
                            </div>
                            <div className="col-lg-6 d-flex flex-column justify-content-center" id="sidebar_fixed">
                                {/* <div className="breadcrumbs">
                                    <ul>
                                        <li><a href="#">Home</a></li>
                                        <li><a href="#">Category</a></li>
                                        <li>Page active</li>
                                    </ul>
                                </div> */}
                                {/* /page_header */}
                                <div className="prod_info">
                                    <h1 style={{fontSize: '2rem'}}>{product.title}</h1>
                                    {/* <span className="rating"><i className="icon-star voted" /><i className="icon-star voted" /><i className="icon-star voted" /><i className="icon-star voted" /><i className="icon-star" /><em>4 reviews</em></span> */}
                                    {/* <p><small>SKU: MTKRY-001</small><br />Sed ex labitur adolescens scriptorem. Te saepe verear tibique sed. Et wisi ridens vix, lorem iudico blandit mel cu. Ex vel sint zril oportere, amet wisi aperiri te cum.</p>
                                    <p>Vix patrioque cotidieque ad, iusto probatus volutpat id pri. Amet dicam omnesque at est, voluptua assueverit ut has, modo hinc nec ea. Quas nulla labore est ne, est in quod solet labitur, sit ne probo mandamus.</p> */}
                                    <div className="prod_options">
                                        <div className="row">
                                            <label className="col-xl-5 col-lg-5  col-md-6 col-6"><strong>Quantity</strong></label>
                                            <div className="col-xl-4 col-lg-5 col-md-6 col-6">
                                                <div className="numbers-row">
                                                    <input type="text" value={quantity} id="quantity_1" className="qty2" name="quantity_1" onChange={ e => update_quantity(e.target.value)}/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-5 col-md-6">
                                            <div className="price_main">
                                                <span className="new_price">${product.price}</span>
                                                {/* <span className="percentage">-20%</span> 
                                                <span className="old_price">$160.00</span> */}
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-md-6">
                                            <div className="btn_add_to_cart"><a style={{cursor:'pointer'}}  className="btn_1" onClick={ () => add_to_cart(product.id, quantity) } >Add to Cart</a></div>
                                        </div>
                                    </div>
                                </div>
                                {/* /prod_info */}
                                <div className="product_actions mb-5">
                                    <ul>
                                        <li>
                                            <a style={{cursor:'pointer'}} ><i className="ti-heart" /><span>Add to Wishlist</span></a>
                                        </li>
                                    </ul>
                                </div>
                                {/* /product_actions */}
                            </div>
                        </div>
                        {/* /row */}
                    </div>
                    {/* /container */}
                    <div className="feat">
                        <div className="container">
                            <ul>
                                <li>
                                    <div className="box">
                                        <i className="ti-gift" />
                                        <div className="justify-content-center">
                                            <h3>Fast Shipping</h3>
                                            <p>For all oders</p>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="box">
                                        <i className="ti-wallet" />
                                        <div className="justify-content-center">
                                            <h3>Secure Payment</h3>
                                            <p>100% secure payment</p>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="box">
                                        <i className="ti-headphone-alt" />
                                        <div className="justify-content-center">
                                            <h3>24/7 Support</h3>
                                            <p>Online top support</p>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    {/*/feat*/}
                </> 
            }
        </main>

    )
}

export default connect(mapStateToProps, mapDispatchToProps)( Product );
