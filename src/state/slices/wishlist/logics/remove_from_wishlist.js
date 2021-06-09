import { createLogic } from 'redux-logic';
import { update_wishlist, update_wishlist_failure, remove_from_wishlist } from '../wishlist_slice';
import api from '../../../../api'

const removeFromWishlistLogic = createLogic({
    type: remove_from_wishlist,
    latest: true,

    async process({ action }, dispatch) {
        try {
            const d = await api.get('/products/wishlist')
            let products = d.data.response.wishlist;
            products = products.map( product => product.product_id );
            dispatch( update_wishlist( products.reduce( (acc, curr) => {
                console.log(curr, action.payload);
                if(curr == action.payload.product_id) return acc;
                else return acc.concat(curr);
            }, [])) );
        }catch (e) {
            dispatch( update_wishlist_failure(e) )
        }
    }
})

export default removeFromWishlistLogic;