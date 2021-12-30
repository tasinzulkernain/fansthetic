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
                console.log(cart);
                console.log(action.payload);
                const products = cart.products;
                await Promise.all(action.payload.map(async product => {
                    if( !products.find( p => p.product_id == product.product_id ) ) {
                        const d = await api.get('/products/' + product.product_id + '/');
                        const p = d.data.response.product;
                        products.push({
                            product_id: p.id,
                            product__title: p.title,
                            product__thumbnail: p.thumbnail,
                            product__price: p.price,
                            quantity: product.quantity
                        });
                    }else {
                        products.find( p => p.product_id == product.product_id ).quantity += product.quantity;
                    }
                } ));

                cart = {
                    total_amount: products.reduce(  (acc, item) => acc + item.product__price * item.quantity, 0),
                    count: products.length,
                    products: products
                };
                localStorage.setItem("cart", JSON.stringify(cart));
            }

            console.log("update cart ", cart);
            
            dispatch( update_cart_success(cart) );
        }catch (e) {
            dispatch( update_cart_failure(e) )
        }
    }
})

export default updateCartLogic;