import { createLogic } from 'redux-logic';
import { update_wishlist, update_wishlist_failure, add_to_wishlist, update_wishlist_success } from '../wishlist_slice';
import api from '../../../../api'
import _ from 'lodash'

const addToWishlistLogic = createLogic({
    type: add_to_wishlist,
    latest: true,

    async process({ action }, dispatch) {
        try {
            const d = await api.get('/products/wishlist')
            let products = d.data.response.wishlist;
            products = products.map( product => product.product_id );
            const foundProductIndex = products.findIndex( product_id => product_id === action.payload.product_id ); 
            console.log("found product ", foundProductIndex);
            if( foundProductIndex !== -1 ) {
                dispatch( update_wishlist( products ) )
            }else {
                dispatch( update_wishlist( products.concat(action.payload.product_id) ) );
            }
        }catch (e) {
            dispatch( update_wishlist_failure({error: e}) )
        }
    }
})

export default addToWishlistLogic;