import { createLogic } from 'redux-logic';
import { update_wishlist, update_wishlist_success, update_wishlist_failure } from '../wishlist_slice';
import api from '../../../../api'

const updateWishlistLogic = createLogic({
    type: update_wishlist,
    latest: true,

    async process({ action }, dispatch) {
        try {
            const d = await api.put('/products/wishlist/', {
                "wishlist": action.payload 
            })
            dispatch( update_wishlist_success(d.data.response.wishlist) );
        }catch (e) {
            dispatch( update_wishlist_failure(e) )
        }
    }
})

export default updateWishlistLogic;