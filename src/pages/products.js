import React, { useEffect, useParams } from 'react';
import { connect } from 'react-redux'
import Siderbar from '../components/products/sidebar'
import List from '../components/products/list'
// import { update_loading } from '../state/slices/pages/pages_slice'
import { update_filters, update_products } from '../state/slices/pages/products/products_slice';
import { update_loading, load_scripts } from '../state/slices/pages/pages_slice'
import { test_val } from '../state/slices/test/test'
import qs from 'query-string' 
import { useLocation } from 'react-router';

const mapStateToProps = state => {
    return {
        // loading: state.pages.products.loading,
        products: state.pages.products.products,
        loaded_scripts: state.pages.products.loaded_scripts
    };
}

const mapDispatchToProps = dispatch => {
    return {
        test_val: (variable, val) => dispatch(test_val("products.sidebar.".concat(variable), val)),
        load_scripts: () => dispatch(load_scripts("products", "sidebar")),
        // update_loading: loading => dispatch(update_loading("products.sidebar", loading)),
        update_filters: filters => dispatch(update_filters(filters)),
    }
}

const Products = props => {
    const { products, loaded_scripts } = props

    const location = useLocation()
    const qparams = qs.parse(location.search) 

    console.log("loading : ", props.state);
    // update_loading(true);
    useEffect( () => {
        // if(!loading) return;
        Promise.all(loaded_scripts.map( async script_src => {
            console.log(document.querySelector(`script[src="${script_src}"]`), script_src);
            if(!document.querySelector(`script[src="${script_src}"]`)) {
                await new Promise(resolve => setTimeout(resolve, 1000));
                const script_elem = document.createElement('script');
                script_elem.src = script_src;
                // script_elem.async = true;
                document.body.appendChild(script_elem);
                console.log("loaded script ", script_src);
            }  
        } ))
        
        if(qparams.category) {
            update_filters({"categories": [qparams.category]});
        } 
        
        console.log(loaded_scripts);
    }, [loaded_scripts] )

    useEffect( () => {
        console.log("products updated ", products);
    }, [products] )

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