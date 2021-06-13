import { createLogic } from 'redux-logic';
import { login, login_success, login_failure, interceptor_processed } from '../auth_slice';
import { initialize_cart } from '../../cart/cart_slice';

import _ from 'lodash'
import { set_categories } from '../../statics/statics_slice';
import { initialize_wishlist } from '../../wishlist/wishlist_slice';

const onLoginInitializeLogic = createLogic({
    type: login_success,
    latest: true,

    async process({ action }, dispatch, done) {
        dispatch( initialize_cart() );
        dispatch( initialize_wishlist() );
        dispatch( set_categories() );
    }
})

export default onLoginInitializeLogic;