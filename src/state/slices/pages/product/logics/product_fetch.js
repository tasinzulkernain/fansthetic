import { createLogic } from 'redux-logic';
import { fetch_product, fetch_product_success, fetch_product_failure } from '../product_slice'

import api from '../../../../../api'
import { getDiscountedPrice } from '../../../../../util';

const fetchProductLogic = createLogic({
    type: fetch_product,
    latest: true,

    async process({ action }, dispatch) {
        try {
            const d = await api.get(`/products/${action.payload.product_id}`);
            const product = d.data.response.product;
            if( parseInt(product.global_discount) > 0 ) {
                product.old_price = product.price;
                product.price = getDiscountedPrice(product);
            }
            dispatch( fetch_product_success( { product } ) );
        } catch(e) {
            dispatch( fetch_product_failure( { error: e.response } ) );
        }
    }
})

export default fetchProductLogic;