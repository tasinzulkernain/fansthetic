import React, { useEffect, useParams, useState } from 'react';
import { connect, useSelector } from 'react-redux'
import Siderbar from '../components/products/sidebar'
import List from '../components/products/list'

import { load_scripts } from '../state/slices/scripts/scripts_slice'
import { update_filters } from '../state/slices/pages/products/products_slice';
import { test_val } from '../state/slices/test/test'

import qs from 'query-string' 
import { useLocation } from 'react-router';
import Loading from '../components/Global/loading';

const mapStateToProps = state => {
    return {
        // loading: state.pages.products.loading,
        status: state.pages.products.status,
        filters: state.pages.products.filters,
        products: state.pages.products.products,
        next: state.pages.products.next
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
    const { products, load_scripts, filters, update_filters, status, next } = props
    const location = useLocation()

    // useEffect( () => {
    //     update_filters({})
    //     console.log("qparams ", qparams);
    // }, [qparams] )

    // console.log("loading : ", props.state);
    // update_loading(true);
    
    const set_filters_from_param = () => {
        const qparams = qs.parse(location.search);

        update_filters({
            ...filters,
            category: qparams.category ? qparams.category : "",
            search: qparams.search ? qparams.search : "",
            page: qparams.page ? qparams.page : "0"
        })
        
        console.log(qparams);
    }
    
    useEffect( () => {
        set_filters_from_param();
        load_scripts("default");
    }, []);

    useEffect( () => {
        set_filters_from_param();        
        load_scripts("default");
    }, [location] )
     

    return (
        status === "PROCESSING" ? 
            <Loading />
        :   <div className="container margin_30">
                <div className="row">
                    <Siderbar price />
                    <div class="col-lg-9">
                        <div style={{display: 'flex', 'justify-content': 'flex-end', padding: '1rem'}}>
                            <span style={{'paddingRight': '1rem'}}>products per page</span>
                            <select onChange={e => update_filters({...filters, products_per_page: e.target.value})} value={filters.products_per_page}>
                                <option>5</option>
                                <option>10</option>
                                <option>20</option>
                            </select>
                        </div>
                        <List products={products} next={next}/>
                    </div>
                </div> 
            </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Products);