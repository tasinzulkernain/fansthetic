import React, { useEffect, useState } from 'react';
import Logo from '../../img/logo.svg';
import api from '../../api'
import Product from '../Global/Product'


const Trending = props => {
    const [products, update_products] = useState([]);
    useEffect(() => {
		api({url: '/products/'})
		.then(d => {
			console.log("products", d.data.response.products)
			update_products(d.data.response.products)
		}).catch(err => {
			console.log(err);
		})
	}, []);
    return (
        <div className="container margin_60_35">
            <div className="main_title">
                <h2>Trending</h2>
                <span>Products</span>
                <p>Cum doctus civibus efficiantur in imperdiet deterruisset</p>
            </div>
            <div className="row small-gutters">
                {products.map( product =>
                    <Product product={product} />
                )}
            </div>
        </div>
    )
}

export default Trending;