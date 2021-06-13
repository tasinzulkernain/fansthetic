import { createLogic } from 'redux-logic';
import { logout, logout_success, logout_failure } from '../auth_slice';
import api from '../../../../api'
import _ from 'lodash'
import Cookies from 'js-cookie';

const logoutLogic = createLogic({
    type: logout,
    // latest: true,

    async process({ action }, dispatch) {
        try {
            await api.post('/auth/logout/', {})

            // api.defaults.headers.common['Authorization'] = "Basic ";
            Cookies.remove('Authorization');

            dispatch( logout_success() );
        }catch (e) {
            dispatch( logout_failure({error: e.response}) )
        }
    }
})

export default logoutLogic;