import { createLogic } from 'redux-logic';
import { logout } from '../../auth/auth_slice';
import { password_change, password_change_failure, password_change_success } from '../profile_slice';
import api from '../../../../api'

const passwordChangeLogic = createLogic({
    type: password_change,
    latest: true,

    async process({ action }, dispatch) {
        try {
            const { old_password, new_password1, new_password2 } = action.payload;

            await api.post('/auth/password/change/', {
                old_password, new_password1, new_password2
            })
            
            dispatch( password_change_success ( ) );
            dispatch( logout() );

        }catch (e) {
            dispatch( password_change_failure({error: e.response}) )
        }
    }
})

export default passwordChangeLogic;