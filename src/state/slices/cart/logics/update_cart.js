import { createLogic } from 'redux-logic';
import { update_cart, update_cart_success, update_cart_failure } from '../cart_slice';
import api from '../../../../api'

const updateCartLogic = createLogic({
    type: update_cart,
    latest: true,

    async process({ getState, action }, dispatch) {
        try {

            let cart = action.payload;
            if(getState().auth.state !== "LOGGED OUT") {
                const d = await api.put('/products/cart/', {
                    "products": action.payload 
                })
                cart = d.data.response.cart;
            }else {
                const products = action.payload.map( product => {
                    const p = getState().pages.products.products.find( p => product.product_id === p.id)
                    return {
                        product_id: p.id,
                        product__title: p.title,
                        product__thumbnail: p.thumbnail,
                        product__price: p.price,
                        quantity: product.quantity
                    }
                } );
                console.log(products);
                cart = {
                    total_amount: products.reduce(  (acc, item) => acc + item.product__price * item.quantity, 0),
                    count: products.length,
                    products: products
                };
            }

            console.log("update cart ", cart);
            
            dispatch( update_cart_success(cart) );
        }catch (e) {
            dispatch( update_cart_failure(e) )
        }
    }
})

export default updateCartLogic;