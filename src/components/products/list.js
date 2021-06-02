import React from 'react';
import Product from './product'

const List = props => {
    const { products } = props;
    console.log("list ", products);
    return (
        <>
            <div class="row small-gutters">
                {products.map( product => {
                    return (
						<Product product={product} />
                    )
                } )}
            </div>
            <div class="pagination__wrapper">
                <ul class="pagination">
                    <li><a href="#0" class="prev" title="previous page">&#10094;</a></li>
                    <li>
                        <a href="#0" class="active">1</a>
                    </li>
                    <li>
                        <a href="#0">2</a>
                    </li>
                    <li>
                        <a href="#0">3</a>
                    </li>
                    <li>
                        <a href="#0">4</a>
                    </li>
                    <li><a href="#0" class="next" title="next page">&#10095;</a></li>
                </ul>
            </div>
        </>
    )
}

export default List;