import { createLogic } from 'redux-logic';
import { update_wishlist, update_wishlist_failure, add_to_wishlist, update_wishlist_success } from '../wishlist_slice';
import api from '../../../../api'
import _ from 'lodash'
import { show_alert } from '../../commands/commands_slice';

const addToWishlistLogic = createLogic({
    type: add_to_wishlist,
    latest: true,

    async process({ action }, dispatch, done) {
        try {
            const d = await api.get('/products/wishlist')
            let products = d.data.response.wishlist;
            products = products.map( product => product.product_id );
            const foundProductIndex = products.findIndex( product_id => product_id === action.payload.product_id ); 
            console.log("found product ", foundProductIndex);
            if( foundProductIndex !== -1 ) {
                dispatch( update_wishlist( products ) )
                dispatch( show_alert( {text: "Product already exists in wishlist"} ) )
            }else {
                dispatch( update_wishlist( products.concat(action.payload.product_id) ) );
                dispatch( show_alert( {text: "Product added to wishlist"} ) )
            }
        }catch (e) {
            dispatch( update_wishlist_failure({error: e}) )
        }
        done();
    }
})

export default addToWishlistLogic;