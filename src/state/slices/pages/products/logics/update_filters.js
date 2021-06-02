import { createLogic } from 'redux-logic';
import { update_filters, update_products_api_status } from '../products_slice';
import { test_val } from '../../../test/test'
import _ from 'lodash'
import api from '../../../../../api'

const updateFiltersLogic = createLogic({
    type: update_filters,
    latest: true,

    // processOptions: {
    //     // dispatch return value, or if returns promise/observable, dispatch resolved/next values
    //     // default false unless dispatch cb is omitted from process signature
    //     dispatchReturn: false,
    //     // enable multi-dispatch mode until done cb called or cancelled
    //     // default is false unless done is included in process signature
    //     dispatchMultiple: false,
    // },

    async process({ action }, dispatch, done) {
        dispatch( update_products_api_status("PROCESSING") )
        const { categories, price_range } = action.payload.filters;
        let products = [];
        const params = {
            price_lte: price_range.min,
            price_gte: price_range.max
        }
        try {
            if (categories.length === 0) {
                const d = await api.get('/products', {params});
                products = d.data.response.products;
            }else {
                // console.log("came 2nd ", selected_cats_t);
                products = await categories.reduce( async (acc_p, cat) => {
                    const acc = await acc_p;
                    console.log("came 3nd ", cat)
                    const d = await api.get('/products/', {
                        params: {
                            ...params,
                            category_title: cat.title
                        },
                    })
                    return _.unionBy(acc, d.data.response.products, "title");
                }, Promise.resolve(products));
            }
            console.log("came in ", products);
            // dispatch( test_val("products", products));
            dispatch( update_products_api_status("SUCCESS", products) );
        }catch (e) {
            dispatch( update_products_api_status("FAILURE") )
        }
    }
})

export default updateFiltersLogic;