import { createLogic } from 'redux-logic';
import { update_cart, update_cart_failure, add_to_cart, update_cart_success } from '../cart_slice';
import api from '../../../../api'
import _, { update } from 'lodash'
import { show_alert } from '../../commands/commands_slice';

const addToCartLogic = createLogic({
    type: add_to_cart,
    // latest: true,

    async process({ getState, action }, dispatch, done) {
        try {
            let new_products = [];
            if(getState().auth.state !== "LOGGED OUT") {
                // dispatch(show_alert( {text: "You must be logged in to add to cart"}))
                const d = await api.get('/products/cart/');
                const quantity = parseInt( action.payload.quantity );
                console.log(d.data.response.cart.products);
                let found = false;
                new_products = d.data.response.cart.products.map( product => {
                    if(product.product_id === action.payload.product_id) {
                        found = true;
                        return { product_id: action.payload.product_id, quantity: parseInt( product.quantity ) + quantity }
                    }else return { product_id: product.product_id, quantity: product.quantity };
                } )
                if(!found) new_products.push(action.payload);
            
            } else {
                const quantity = parseInt( action.payload.quantity );
                let found = false;
                new_products = getState().cart.products.map( product => {
                    if(product.product_id === action.payload.product_id) {
                        found = true;
                        return { product_id: action.payload.product_id, quantity: parseInt( product.quantity ) + quantity }
                    }else return { product_id: product.product_id, quantity: product.quantity };
                } )
                console.log(new_products);
                if(!found) new_products.push(action.payload);
            }
            
            console.log(new_products);
            dispatch( update_cart( new_products ) );
            dispatch( show_alert( {text: `product added to cart`} ) )
        }catch (e) {
            dispatch( update_cart_failure({error: e}) )
        }
        done();
    }
})

export default addToCartLogic;