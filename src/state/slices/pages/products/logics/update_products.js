import { createLogic } from 'redux-logic';
import { update_products, update_products_success, update_products_failure } from '../products_slice';
import _ from 'lodash'
import api from '../../../../../api'

const updateProductsLogic = createLogic({
    type: update_products,
    // latest: true,

    async process({ getState, action }, dispatch, done) {
        const { category, price_range, search, page, products_per_page } = action.payload.filters;

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
        console.log(products_per_page  )
        if(page) {
            params.limit = products_per_page;
            params.offset = products_per_page*page;
        }

        try {
            const d = await api.get('/products', { params });
            console.log(params);
            console.log(d);
            dispatch( update_products_success( {products: d.data.response.results, next: d.data.response.next, page: page ? page : getState().pages.products.page }) );
        }catch (e) { 
            dispatch( update_products_failure({error: e.response}) )
        }
        done();
    }
})

export default updateProductsLogic;