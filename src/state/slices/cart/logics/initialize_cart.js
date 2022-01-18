import { createLogic } from 'redux-logic';
import { update_cart_failure, initialize_cart, update_cart_success } from '../cart_slice';
import api from '../../../../api'
import { getDiscountedPrice } from '../../../../util';

const initializeCartLogic = createLogic({
    type: initialize_cart,
    latest: true,

    async process({ getState, action }, dispatch) {
        // try {
            console.log("iniitttt");
            let cart;
            console.log(localStorage.getItem("cart"));
            if( localStorage.getItem("cart") ) {
                const prev_products = JSON.parse(localStorage.getItem("cart")).products;
                const d = await api.get('/products/cart');
                cart = d.data.response.cart;
                // console.log( prev_products);
                // console.log(cart)
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

                // console.log( new_products );
                // console.log( Object.keys(new_products).map( key => ({ product_id: new_products[key].product_id, quantity: new_products[key].quantity })) )
                await api.put('/products/cart/', {
                    "products": Object.keys(new_products).map( key => ({ product_id: new_products[key].product_id, quantity: new_products[key].quantity }))
                })
                localStorage.setItem("cart", "")
            }
            const new_d = await api.get('/products/cart');
            console.log( new_d.data.response.cart );

            let products = new_d.data.response.cart.products.map( product => {
                return {...product, product__price: getDiscountedPrice(product)}
            })

            await Promise.all([...products].map(async product => {
                console.log(product);
                const d = await api.get('/products/' + product.product_id);
                const p = d.data.response.product;
                products.find( p => p.product_id == product.product_id).product__price = getDiscountedPrice(p);
            }));

            cart = {
                total_amount: products.reduce(  (acc, item) => acc + item.product__price * item.quantity, 0),
                count: products.length,
                products: products
            };

            dispatch( update_cart_success(cart) );
        // }catch (e) {
        //     console.log(e);
        //     dispatch( update_cart_failure(e) )
        // }
    }
})

export default initializeCartLogic;