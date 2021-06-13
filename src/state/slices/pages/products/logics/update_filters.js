import { createLogic } from 'redux-logic';
import { update_filters, update_products_api_status } from '../products_slice';
import _ from 'lodash'
import api from '../../../../../api'

const updateFiltersLogic = createLogic({
    type: update_filters,
    // latest: true,

    async process({ action }, dispatch, done) {
        dispatch( update_products_api_status("PROCESSING") )
        const { category, price_range, search } = action.payload.filters;

        const params = {}
        if(search) {
            params.search = search;
        }
        if(price_range) {
            params.price__gte = price_range ? price_range.min : 0;
            params.price__lte = price_range ? price_range.max : 999999999;
        }
        if(category) {
            params.category__title = category 
        }

        try {
            const d = await api.get('/products', { params });
            console.log(params);
            console.log(d);
            dispatch( update_products_api_status("SUCCESS", d.data.response.products) );
        }catch (e) {
            dispatch( update_products_api_status("FAILURE", {error: e.response}) )
        }
        done();
    }
})

export default updateFiltersLogic;