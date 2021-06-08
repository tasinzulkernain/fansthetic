import { createLogic } from 'redux-logic';
import { update_cart, update_cart_success, update_cart_failure } from '../cart_slice';
import api from '../../../../api'

const cartLogic = createLogic({
    type: update_cart,
    latest: true,

    async process({ action }, dispatch) {
        try {
            const d = await api.put('/products/cart', {
                params: {
                    "products": action.products 
                }
            })
            dispatch( update_cart_success(d.data.response.cart) );
        }catch (e) {
            dispatch( update_cart_failure(e) )
        }
    }
})

export default cartLogic;