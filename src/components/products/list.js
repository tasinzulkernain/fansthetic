import React, { useEffect, useState } from 'react';
import Product from './product'

const List = props => {
    const { products } = props;
    const [ current_page, update_current_page ] = useState(1);
    const [ total_pages, update_total_pages ] = useState(1);
    const products_per_page = 18;
    
    useEffect( () => {
        update_total_pages(Math.ceil(products.length/products_per_page));
    }, [products])


    console.log("list ", products);
    return (
        <>
            <div class="row small-gutters">
                {products.length == 0 ? <h1 style={{height: '80vh'}} className="d-flex justify-content-center w-100 wt-100 mt-5"  >No products found :( </h1> : <></>} 
                {products.slice((current_page-1)*products_per_page, current_page*products_per_page).map( product => {
                    return (
						<Product product={product} />
                    )
                } )}
            </div>
            <div class="pagination__wrapper">
                    <ul class="pagination">
                        <li><a href="#0" class="prev" title="previous page">&#10094;</a></li>
                        {[...new Array(total_pages)].map( i => {
                            <li>
                                <a href="" onClick={() => update_current_page(i)} class="active">{i}</a>
                            </li> 
                        } )}
                        <li><a href="" onClick={() => update_current_page(current_page+1)} class="next" title="next page">&#10095;</a></li>
                    </ul>
            </div>
        </>
    )
}

export default List;