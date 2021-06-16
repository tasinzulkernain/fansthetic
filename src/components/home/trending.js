import React, { useEffect, useState } from 'react';
import Logo from '../../img/logo.svg';
import Product from '../Global/Product';
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
                    <Product product={product} fromHome/>
                )}
            </div>
        </div>
    )
}

export default Trending;