import { createLogic } from 'redux-logic';
import { update_cart, update_cart_failure, remove_from_cart } from '../cart_slice';
import api from '../../../../api'

const removeFromCartLogic = createLogic({
    type: remove_from_cart,
    latest: true,

    async process({ action }, dispatch) {
        try {
            const d = await api.get('/products/cart')
            let products = d.data.response.cart.products;
            products = products.map( product => { return {product_id: product.product_id, quantity: product.quantity} } );
            dispatch( update_cart(products.reduce( (acc, curr) => {
                console.log(curr, action.payload);
                if(curr.product_id == action.payload.product_id) return acc;
                else return acc.concat(curr);
            }, [])) );
        }catch (e) {
            console.log(e);
            dispatch( update_cart_failure(e) )
        }
    }
})

export default removeFromCartLogic;