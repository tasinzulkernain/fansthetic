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
            let products = d.data.response.cart.products;
            products = products.map( product => { return {product_id: product.product_id, quantity: product.quantity} } );
            const foundProductIndex = products.findIndex( product => product.product_id === action.payload.product_id ); 
            _.pullAt(products, foundProductIndex);
            dispatch( update_cart( products.concat( {product_id: action.payload.product_id, quantity: action.payload.quantity} ) ) )
        }catch (e) {
            dispatch( update_cart_failure({error: e}) )
        }
    }
})

export default updateCartItemLogic;