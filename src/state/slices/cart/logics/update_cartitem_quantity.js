import { createLogic } from 'redux-logic';
import { update_cart, update_cart_failure, update_cartitem_quantity } from '../cart_slice';
import api from '../../../../api'
import _ from 'lodash'

const updateCartItemLogic = createLogic({
    type: update_cartitem_quantity,
    latest: true,

    async process({ action }, dispatch) {
        try {
            const d = await api.get('/products/cart')
            dispatch( update_cart( d.data.response.cart.products.map( product => {
                if(product.product_id === action.payload.product_id) {
                    return { product_id: product.product_id, quantity: action.payload.quantity }
                }else return { product_id: product.product_id, quantity: product.quantity }
            } ) ) )
        }catch (e) {
            dispatch( update_cart_failure({error: e}) )
        }
    }
})

export default updateCartItemLogic;