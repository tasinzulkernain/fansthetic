import React, { useEffect, useParams, useState } from 'react';
import { connect, useSelector } from 'react-redux'
import Product from '../components/wihshlist/product'

import { load_scripts } from '../state/slices/scripts/scripts_slice'
import { update_filters } from '../state/slices/pages/products/products_slice';
import { test_val } from '../state/slices/test/test'

import qs from 'query-string' 
import { useLocation } from 'react-router';
import { initialize_wishlist } from '../state/slices/wishlist/wishlist_slice';
import { withRouter } from 'react-router-dom';

const mapStateToProps = state => {
    return {
        // loading: state.pages.products.loading,
        wishlist: state.wishlist.wishlist.map( product => (
            {
                id: product.product_id,
                title: product.product__title,
                thumbnail: product.product__thumbnail,
                price: product.product__price
            }
        ) )
    };
}

const mapDispatchToProps = dispatch => {
    return {
        test_val: (variable, val) => dispatch(test_val("products.sidebar.".concat(variable), val)),
        load_scripts: comp => {console.log("called load", load_scripts("products", comp)); dispatch(load_scripts("products", comp))},
        initialize_wishlist: () => dispatch( initialize_wishlist() )
    }
}

const Wishlist = props => {
    const { load_scripts, wishlist, initialize_wishlist } = props
    
    useEffect( () => {
        load_scripts("default");
        initialize_wishlist();
    }, []);


    return (
        <div className="container margin_30">
            <div className="row justify-content-center py-5">
                <h1>Wishlist</h1>
            </div>
            <div className="row">
	            <div class="col-lg-9">
                    <div class="row small-gutters">
                        {wishlist.map( product => {
                            return (
                                <Product product={product} />
                            )
                        } )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default withRouter( connect(mapStateToProps, mapDispatchToProps)( Wishlist ) );