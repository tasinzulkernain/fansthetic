import { createLogic } from 'redux-logic';
import { update_cart, update_cart_success, update_cart_failure } from '../cart_slice';
import api from '../../../../api'

const updateCartLogic = createLogic({
    type: update_cart,
    latest: true,

    async process({ action }, dispatch) {
        try {
            console.log("update cart ", action.payload);
            const d = await api.put('/products/cart', {
                "products": action.payload 
            })
            dispatch( update_cart_success(d.data.response.cart) );
        }catch (e) {
            dispatch( update_cart_failure(e) )
        }
    }
})

export default updateCartLogic;