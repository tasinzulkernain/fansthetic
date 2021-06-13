import { createLogic } from 'redux-logic';
import { login, login_success, login_failure, save_interceptor, reset_password_initiate, reset_password_confirm, reset_password_success, reset_password_failure } from '../auth_slice';
import { fatal_error } from '../../errors/errors';
import api from '../../../../api'
import _ from 'lodash'
import forge from 'node-forge';
import Cookies from 'js-cookie';


const resetPasswordConfirmLogic = createLogic({
    type: reset_password_confirm,
    latest: true,

    async process({ action }, dispatch, done) {
        try {
            const { new_password1, new_password2, uid, token } = action.payload;
            await api.post('/auth/password/reset/confirm/', {
                new_password1, new_password2, uid, token
            })
            
            dispatch( reset_password_success() );
        }catch (e) {
            dispatch( reset_password_failure({error: e.response}) )
        }
    }
})

export default resetPasswordConfirmLogic;