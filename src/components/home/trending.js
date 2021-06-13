import React, { useEffect, useState } from 'react';
import Logo from '../../img/logo.svg';
// import api from '../../api'
// import { load_scripts } from '../../state/slices/scripts/scripts_slice';

const Trending = props => {
    
    const { products } = props;

    return (
        <div className="container margin_60_35">
            <div className="main_title">
                <h2>Trending</h2>
                {/* <span>Products</span> */}
                <p>Currently trending products</p>
            </div>
            <div className="row small-gutters">
                {products.map( product =>
                    <div className="col-6 col-md-4 col-xl-3">
                        <div className="grid_item">
                            <figure>
                                {product.is_trending ?
                                    <span className={`ribbon off`}>Trending</span>
                                :   <span className={`ribbon hot`}>New</span>
                                }
                                <a href={`/product/?product_id=${product.id}`}>
                                    <img className="img-fluid" src={product.thumbnail} alt={product.title} />
                                    <img className="img-fluid" src={product.thumbnail} alt={product.title} />
                                </a>
                            </figure>
                            <div className="rating">
                                <a href="product-detail-1.html">
                                <h3>{product.title}</h3>
                                </a>
                                <div className="price_box">
                                    <span className="new_price">{product.price} {'\u09F3'}</span>
                                </div>
                            </div>
                            <ul>
                                <li><a href="#0" className="tooltip-1" data-toggle="tooltip" data-placement="left" title="Add to favorites"><i className="ti-heart" /><span>Add to favorites</span></a></li>
                                <li><a href="#0" className="tooltip-1" data-toggle="tooltip" data-placement="left" title="Add to cart"><i className="ti-shopping-cart" /><span>Add to cart</span></a></li>
                            </ul>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Trending;