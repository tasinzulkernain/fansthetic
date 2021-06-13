import { createLogic } from 'redux-logic';
import { fetch_product, fetch_product_success, fetch_product_failure } from '../product_slice'

import api from '../../../../../api'

const fetchProductLogic = createLogic({
    type: fetch_product,
    latest: true,

    async process({ action }, dispatch) {
        try {
            const d = await api.get(`/products/${action.payload.product_id}`);
            dispatch( fetch_product_success( { product: d.data.response.product } ) );
        } catch(e) {
            dispatch( fetch_product_failure( { error: e.response } ) );
        }
    }
})

export default fetchProductLogic;