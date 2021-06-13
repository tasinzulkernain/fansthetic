import { createLogic } from 'redux-logic';
import { fetch_order, fetch_order_success, fetch_order_failure } from '../orders_slice'

import api from '../../../../../api'

const fetchOrderLogic = createLogic({
    type: fetch_order,
    latest: true,

    async process({ action }, dispatch) {
        try {
            const d = await api.get(`/orders`, { 
                params: {
                    search: action.payload.id
                }
             });  
            console.log(d.data.response);
            dispatch( fetch_order_success( { order: d.data.response.orders[0] } ) );
        } catch(e) {
            dispatch( fetch_order_failure ( { error: e.response } ) );
        }
    }
})

export default fetchOrderLogic;