import { createLogic } from 'redux-logic';
import { place_order, place_order_failure, place_order_success } from '../checkout_slice';

import api from '../../../../../api'
import { initialize_cart, update_cart_success } from '../../../cart/cart_slice';

const placeOrderLogic = createLogic({
    type: place_order,
    latest: true,

    async process({ action }, dispatch, done) {
        try {
            const d = await api.post(`/orders/create/`, action.payload);  
            dispatch( place_order_success( ) );
            dispatch( initialize_cart() );
            // dispatch( update_cart_success( [] ) )
        } catch(e) {
            dispatch( place_order_failure ( { error: e.response } ) );
        }
    }
})

export default placeOrderLogic;