import { createLogic } from 'redux-logic';
import { login, login_success, login_failure, interceptor_processed } from '../auth_slice';
import { initialize_cart } from '../../cart/cart_slice';

import _ from 'lodash'

const onLoginInitializeLogic = createLogic({
    type: login_success,
    latest: true,

    async process({ action }, dispatch, done) {
        dispatch( initialize_cart() );
    }
})

export default onLoginInitializeLogic;