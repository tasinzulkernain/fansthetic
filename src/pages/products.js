import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import Siderbar from '../components/products/sidebar'
import List from '../components/products/list'
// import { update_loading } from '../state/slices/pages/pages_slice'

const mapStateToProps = state => {
    return {
        // loading: state.pages.products.loading,
        products: state.pages.products.products,
        loaded_scripts: state.pages.products.loaded_scripts
    };
}

const Products = props => {
    const { products, loaded_scripts } = props
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
        
        
        console.log(loaded_scripts);
    }, [loaded_scripts] )

    useEffect( () => {
        console.log("products updated ", products);
    }, [products] )

    return (
        <div className="container margin_30">
            <div className="row">
                <Siderbar />
	            <div class="col-lg-9">
                    {/* <div id="stick_here"></div>
                    <div class="toolbox elemento_stick add_bottom_30">
                        <div class="container">
                            <ul class="clearfix">
                                <li>
                                    <div class="sort_select">
                                        <select name="sort" id="sort">
                                            <option value="popularity" selected="selected">Sort by popularity</option>
                                            <option value="rating">Sort by average rating</option>
                                            <option value="date">Sort by newness</option>
                                            <option value="price">Sort by price: low to high</option>
                                            <option value="price-desc">Sort by price: high to</option>
                                        </select>
                                    </div>
                                </li>
                                <li>
                                    <a href="#0"><i class="ti-view-grid"></i></a>
                                    <a href="listing-row-1-sidebar-left.html"><i class="ti-view-list"></i></a>
                                </li>
                                <li>
                                    <a href="#0" class="open_filters">
                                        <i class="ti-filter"></i><span>Filters</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div> */}
                    <List products={products} />
                    {/* </div> */}
                    {/* {JSON.stringify(products)} */}
                </div>
            </div>
        </div>
    )
}

export default connect(mapStateToProps, dispatch => { return {  }})(Products);