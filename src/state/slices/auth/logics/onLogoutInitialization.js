import { createLogic } from 'redux-logic';
import { logout_success } from '../auth_slice';
import { update_cart_success } from '../../cart/cart_slice';

import _ from 'lodash'
import { update_wishlist_success } from '../../wishlist/wishlist_slice';

const onlogoutInitializeLogic = createLogic({
    type: logout_success,
    latest: true,

    async process({ action }, dispatch, done) {
        dispatch( update_cart_success({
            count: 0,
            total_amount: 0,
            products: []
        }) );
        dispatch( update_wishlist_success([]) );
    }
})

export default onlogoutInitializeLogic;