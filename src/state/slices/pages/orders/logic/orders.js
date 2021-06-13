import { createLogic } from 'redux-logic';
import { fetch_orders, fetch_orders_success, fetch_orders_failure } from '../orders_slice'

import api from '../../../../../api'

const fetchOrdersLogic = createLogic({
    type: fetch_orders,
    latest: true,

    async process({ action }, dispatch) {
        try {
            const d = await api.get(`/orders`);  
            dispatch( fetch_orders_success ( { orders: d.data.response.orders } ) );
        } catch(e) {
            dispatch( fetch_orders_failure( { error: e.response } ) );
        }
    }
})

export default fetchOrdersLogic;