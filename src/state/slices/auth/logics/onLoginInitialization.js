import { createLogic } from 'redux-logic';
import { login, login_success, login_failure, interceptor_processed } from '../auth_slice';
import { initialize_cart } from '../../cart/cart_slice';

import _ from 'lodash'
import { set_categories } from '../../statics/statics_slice';
import { initialize_wishlist } from '../../wishlist/wishlist_slice';

import { history } from '../../../../App';


const onLoginInitializeLogic = createLogic({
    type: login_success,
    latest: true,

    async process({ action }, dispatch, done) {
        // action.payload.location.href = "/";
        if(action.payload.redirect) {
            // console.log("Came history");
            history.push('/?auth_redirect')
            // history.location.href = "/";
        }
            dispatch( initialize_cart() );
            dispatch( initialize_wishlist() );
            dispatch( set_categories() );    
        // }
        // history.push('/');

        done();
        // history.go(0);
    }
})

export default onLoginInitializeLogic;