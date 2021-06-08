import React, { useState, useEffect } from 'react';
import { update_loading, load_scripts } from '../../state/slices/pages/pages_slice'
import { test_val } from '../../state/slices/test/test'
import { connect } from 'react-redux'
import api from '../../api'
import { update_filters, update_products } from '../../state/slices/pages/products/products_slice';
import _ from 'lodash'


const mapStateToProps = state => {
    return {
        filters: state.pages.products.filters
    }
}

const mapDispatchToProps = dispatch => {
    return {
        test_val: (variable, val) => dispatch(test_val("products.sidebar.".concat(variable), val)),
        load_scripts: () => dispatch(load_scripts("products", "sidebar")),
        // update_loading: loading => dispatch(update_loading("products.sidebar", loading)),
        update_filters: filters => dispatch(update_filters(filters)),
    }
}


const Sidebar = props => {
    const { update_loading, update_filters, load_scripts, test_val, filters } = props;
    const [categories, update_categories] = useState([]);
    const [filterError, update_filterError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            console.log("came", test_val)
            let data_products, data_categories;
            try {
                data_categories = (await api.get('/products/category/')).data.response.categories
                test_val("categories", data_categories);
            } catch (e) {
                console.log("category fetch products sidebar error ", e);
            }

            try {
                data_products = (await api.get('/products/')).data.response.products
                test_val("products", data_products);
            } catch (err) {
                console.log("products fetch products sidebar error", err);
            }

            // try {
            //     data_categories = await Promise.all(data_categories.map(async (cat, i) => {
            //         const d = await api.get('/products/', {
            //             params: {
            //                 category_title: cat.title
            //             },
            //         })
            //         console.log("setting product count ", cat, " ", i, " ", d.data.response.products.length);
            //         return { ...cat, product_count: d.data.response.products.length };
            //     }))
            // } catch (err) {
            //     console.log("products cat fetch products sidebar error", err);
            // }

            test_val("cat_p", data_categories);
            update_categories(data_categories)
            // update_products(data_products)
            // update_products_loading(false);
            // update_loading(false)
            update_filters( filters )
            load_scripts();
        }
        fetchData();
    }, []);

    useEffect(() => console.log("hahalol ", categories.length), [categories])
    // useEffect(() => test_val("products_cat_all", products), [products])
    useEffect(() => console.log("updated filters ", filters), [filters])

    window._ = _;


    const handleFilterSubmit = e => {
        e.preventDefault();
        window.form = e.target;
        const elements = e.target.elements;
        const filters_t = _.cloneDeep(filters);
        update_filterError(false);
        for(let i=0; i<elements.length; i++) {
            const elem_name = elements[i].name.split("_");
            const elem = elements[i];
            switch (elem_name[0]) {
                case 'categories':
                    if(elem.checked)
                        filters_t.categories = _.uniq(filters_t.categories.concat(elem_name[1]))
                    else 
                        filters_t.categories = _.without(filters_t.categories, elem_name[1])
                    break;

                case 'priceRangeMin':
                    filters_t.price_range.min = elem.value;
                    break;
                    
                case 'priceRangeMax':
                    filters_t.price_range.max = elem.value;
                    break;

                default:
                    break;
            }
        }

        update_filters(filters_t);
        // console.log(filters_t);
    }

    useEffect( () => {
        console.log("props ", props);
    }, [props] )

    return (
        <aside className="col-lg-3" id="sidebar_fixed">
            <form onSubmit={handleFilterSubmit}>
            <div className="filter_col">
                <div className="inner_bt"><a href="#" className="open_filters"><i className="ti-close" /></a></div>
                {props.categories ? 
                    <div className="filter_type version_2">
                        <h4><a href="#filter_1" data-toggle="collapse" className="opened">Categories</a></h4>
                        <div className="collapse show" id="filter_1">
                            <ul>
                                {categories.map(cat =>
                                    <li>
                                        <label className="container_check"> {cat.title} <small>{cat.product_count}</small>
                                            <input type="checkbox" name={"categories_"+cat.title} />
                                            <span className="checkmark" />
                                        </label>
                                    </li>
                                )}
                            </ul>
                        </div>
                        {/* /filter_type */}
                    </div>
                : <></>}
                {/* /filter_type */}
                { props.price ? 
                    <div className="filter_type version_2">
                        <h4><a href="#filter_4" data-toggle="collapse" className="closed">Price</a></h4>
                        <div className="collapse" id="filter_4">
                            <ul>
                                <li>
                                    <label className="">
                                        {/* {'\u09F3'}0 — {'\u09F3'}50<small>11</small> */}
                                        <div class="input-group mb-3">
                                            <input name="priceRangeMin" type="number" className="form-control me-3" placeholder="min"/>
                                            <input name="priceRangeMax" type="number" className="form-control" placeholder="max"/>
                                            {/* <span className="input-group-text">{'\u09F3'}</span> */}
                                        </div>
                                        {/* <span className="checkmark" /> */}
                                    </label>
                                </li>
                            </ul>
                        </div>
                    </div>
                : <></> }
                {/* /filter_type */}

                <div className="buttons">
                    <button className="btn_1" type="submit">Filter</button> 
                    <button className="btn_1 gray" type="reset">Reset</button>
                </div>
            </div>
            </form>
        </aside>

    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);