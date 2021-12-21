import { createLogic } from 'redux-logic';
import { logout, logout_success, logout_failure } from '../auth_slice';
import api from '../../../../api'
import _ from 'lodash'
import Cookies from 'js-cookie';
import { show_alert } from '../../commands/commands_slice';

const logoutLogic = createLogic({
    type: logout,
    // latest: true,

    async process({ action }, dispatch, done) {
        try {
            await api.post('/auth/logout/', {})

            // api.defaults.headers.common['Authorization'] = "Basic ";
            Cookies.remove('Authorization');

            console.log("asdahsdhasbd");
            dispatch( show_alert( {text: "Logged you out :(" } ) )
            dispatch( logout_success() );
            done();
        }catch (e) {
            dispatch( logout_failure({error: e.response}) )
        }
    }
})

export default logoutLogic;