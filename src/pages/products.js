import React, { useEffect, useParams } from 'react';
import { connect } from 'react-redux'
import Siderbar from '../components/products/sidebar'
import List from '../components/products/list'

import { load_scripts } from '../state/slices/scripts/scripts_slice'
import { update_filters } from '../state/slices/pages/products/products_slice';
import { test_val } from '../state/slices/test/test'

import qs from 'query-string' 
import { useLocation } from 'react-router';

const mapStateToProps = state => {
    return {
        // loading: state.pages.products.loading,
        products: state.pages.products.products,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        test_val: (variable, val) => dispatch(test_val("products.sidebar.".concat(variable), val)),
        load_scripts: comp => {console.log("called load", load_scripts("products", comp)); dispatch(load_scripts("products", comp))},
        // update_loading: loading => dispatch(update_loading("products.sidebar", loading)),
        update_filters: filters => dispatch(update_filters(filters)),
    }
}

const Products = props => {
    const { products, load_scripts } = props

    const location = useLocation()
    const qparams = qs.parse(location.search) 

    console.log("loading : ", props.state);
    // update_loading(true);
    useEffect( () => {
        if(qparams.category) {
            update_filters({"categories": [qparams.category]});
        }
        load_scripts("default");
    }, []);
    
    // useEffect( () => {
    //     // if(!loading) return;        
    //     console.log(loaded_scripts);
    // }, [loaded_scripts] )

    return (
        <div className="container margin_30">
            <div className="row">
                <Siderbar price />
	            <div class="col-lg-9">
                    <List products={products} />
                </div>
            </div>
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Products);