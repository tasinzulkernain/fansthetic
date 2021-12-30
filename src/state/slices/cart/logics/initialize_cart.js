import { createLogic } from 'redux-logic';
import { update_cart_failure, initialize_cart, update_cart_success } from '../cart_slice';
import api from '../../../../api'

const initializeCartLogic = createLogic({
    type: initialize_cart,
    latest: true,

    async process({ getState, action }, dispatch) {
        try {
            console.log("iniitttt");
            const prev_products = JSON.parse(localStorage.getItem("cart")).cart.products;
            const d = await api.get('/products/cart');
            let cart = d.data.response.cart;
            console.log( prev_products);
            console.log(cart)
            const new_products = cart.products.reduce((acc, product) => {
                acc[product.product_id] = product;
                return acc;
            }, {})
            prev_products.forEach(product => {
                if (new_products[product.product_id]) {
                    new_products[product.product_id].quantity += product.quantity;
                }else {
                    new_products[product.product_id] = product;
                }
            })

            console.log( new_products );
            console.log( Object.keys(new_products).map( key => ({ product_id: new_products[key].product_id, quantity: new_products[key].quantity })) )
            await api.put('/products/cart/', {
                "products": Object.keys(new_products).map( key => ({ product_id: new_products[key].product_id, quantity: new_products[key].quantity }))
            })
            const new_d = await api.get('/products/cart');
            console.log( new_d.data.response.cart );

            dispatch( update_cart_success(new_d.data.response.cart) );
        }catch (e) {
            dispatch( update_cart_failure(e) )
        }
    }
})

export default initializeCartLogic;