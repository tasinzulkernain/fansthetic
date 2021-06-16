import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Product from '../Global/Product'
import qs from 'query-string'
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {
        page: parseInt(state.pages.products.page),
        next: state.pages.products.next
    }
}

const List = props => {
    const { products, next, page } = props;
    const location = useLocation();
    const [nextLink, update_nextLink] = useState(null);
    const [prevLink, update_prevLink] = useState(null);
    const qparams = qs.parse(location.search);

    useEffect( () => {
        let np = qparams;
        if(next !== null) {
            np.page = page+1;
            update_nextLink( location.pathname + "?" + qs.stringify(np) );
        }
        console.log(np);

        let pp = qparams;
        if(page != 0) {
            pp.page = page-1;
            update_prevLink( location.pathname + "?" + qs.stringify(pp) );
        }
        console.log(pp);
    }, [] )



    return (
        <>
            <div class="row small-gutters">
                {products.length == 0 ? <h1 style={{height: '80vh'}} className="d-flex justify-content-center w-100 wt-100 mt-5"  >No products found :( </h1> : <></>} 
                {products.map( product => {
                    return (
						<Product product={product} />
                    )
                } )}
            </div>
            <div class="pagination__wrapper">
                    <ul class="pagination">
                        {prevLink && <li><Link to={prevLink} class="prev" title="previous page">&#10094;</Link></li>}
                        {nextLink && <li><Link to={nextLink} class="next" title="next page">&#10095;</Link></li>}
                    </ul>
            </div>
        </>
    )
}

export default connect(mapStateToProps, null)( List );