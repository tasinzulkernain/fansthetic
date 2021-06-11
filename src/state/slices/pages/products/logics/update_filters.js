import { createLogic } from 'redux-logic';
import { update_filters, update_products_api_status } from '../products_slice';
import _ from 'lodash'
import api from '../../../../../api'

const updateFiltersLogic = createLogic({
    type: update_filters,
    latest: true,

    async process({ action }, dispatch, done) {
        dispatch( update_products_api_status("PROCESSING") )
        const { categories, price_range } = action.payload.filters;
        let products = [];
        const params = {
            price_lte: price_range ? price_range.min : 0,
            price_gte: price_range ? price_range.max : 999999999
        }
        // console.log("came1 ", categories.length);
        try {
            // if (categories.length === 0) {
                const d = await api.get('/products', { params });
                console.log("came ", params);
                products = d.data.response.products;
            // }else {
            //     products = await categories.reduce( async (acc_p, cat) => {
            //         const acc = await acc_p;
            //         console.log("came 3nd ", cat)
            //         const d = await api.get('/products/', {
            //             params: {
            //                 ...params,
            //                 category_title: cat.title
            //             },
            //         })
            //         return _.unionBy(acc, d.data.response.products, "title");
            //     }, Promise.resolve(products));
            // }
            // console.log("came in ", products);
            dispatch( update_products_api_status("SUCCESS", products) );
        }catch (e) {
            dispatch( update_products_api_status("FAILURE") )
        }
        done();
    }
})

export default updateFiltersLogic;