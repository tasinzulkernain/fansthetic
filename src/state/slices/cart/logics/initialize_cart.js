import { createLogic } from 'redux-logic';
import { update_cart_failure, initialize_cart, update_cart_success } from '../cart_slice';
import api from '../../../../api'

const initializeCartLogic = createLogic({
    type: initialize_cart,
    latest: true,

    async process({ action }, dispatch) {
        try {
            console.log("iniitttt");
            const d = await api.get('/products/cart')
            dispatch( update_cart_success(d.data.response.cart) );
        }catch (e) {
            dispatch( update_cart_failure(e) )
        }
    }
})

export default initializeCartLogic;