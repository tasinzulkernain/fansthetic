import { createLogic } from 'redux-logic';
import { update_cart, update_cart_failure, add_to_cart, update_cart_success } from '../cart_slice';
import api from '../../../../api'
import _ from 'lodash'

const addToCartLogic = createLogic({
    type: add_to_cart,
    // latest: true,

    async process({ action }, dispatch) {
        try {
            const d = await api.get('/products/cart')
            let products = d.data.response.cart.products;
            products = products.map( product => { return {product_id: product.product_id, quantity: product.quantity} } );
            const foundProductIndex = products.findIndex( product => product.product_id === action.payload.product_id ); 
            console.log("found product ", foundProductIndex);
            if( foundProductIndex !== -1 ) {
                const new_quantity = products[foundProductIndex].quantity + action.payload.quantity;
                _.pullAt(products, foundProductIndex);
                console.log( products.concat( {product_id: action.payload.product_id, quantity: new_quantity} ) );
                dispatch( update_cart( products.concat( {product_id: action.payload.product_id, quantity: new_quantity} ) ) )
            }else {
                dispatch( update_cart( products.concat(action.payload) ) );
            }
        }catch (e) {
            dispatch( update_cart_failure({error: e}) )
        }
    }
})

export default addToCartLogic;