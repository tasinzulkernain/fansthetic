import { createLogic } from 'redux-logic';
import { fetch_trending_products, fetch_trending_products_success, fetch_trending_products_failure } from '../home_slice'

import api from '../../../../../api'
import { getDiscountedPrice } from '../../../../../util';

const fetchTrendingLogic = createLogic({
    type: fetch_trending_products,
    latest: true,

    async process({ action }, dispatch) {
        try {
            const d = await api.get(`/products`, {
                params: {
                    is_trending: true
                }
            });
            dispatch( fetch_trending_products_success( { trending_products: d.data.response.products.map( product => {
                return {
                    ...product,
                    old_price: product.price,
                    price: getDiscountedPrice(product)
                }
            } ) } ) );
        } catch(e) {
            dispatch( fetch_trending_products_failure( { error: e.response } ) );
        }
    }
})

export default fetchTrendingLogic;