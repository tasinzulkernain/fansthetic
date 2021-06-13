import { createLogic } from 'redux-logic';
import { fetch_profile, password_change, password_change_failure, password_change_success, update_profile, update_profile_failure, update_profile_success } from '../profile_slice';
import api from '../../../../api'


const profileUpdateLogic = createLogic({
    type: update_profile,
    latest: true,

    async process({ action }, dispatch, done) {
        try {
            const { username, first_name, last_name } = action.payload;

            await api.put('/auth/user/', {
                username, first_name, last_name
            })
            
            dispatch( update_profile_success () );
            dispatch( fetch_profile() );
        }catch (e) {
            dispatch( update_profile_failure ({error: e.response}) )
        }
    }
})

export default profileUpdateLogic;