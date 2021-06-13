import { createLogic } from 'redux-logic';
import { update_wishlist_failure, initialize_wishlist, update_wishlist_success } from '../wishlist_slice';
import api from '../../../../api'

const initializeWishlistLogic = createLogic({
    type: initialize_wishlist,
    latest: true,

    async process({ action }, dispatch) {
        try {
            const d = await api.get('/products/wishlist')
            dispatch( update_wishlist_success(d.data.response.wishlist) );
        }catch (e) {
            dispatch( update_wishlist_failure(e.response) )
        }
    }
})

export default initializeWishlistLogic;