import { createLogic } from 'redux-logic';
import { fetch_profile, fetch_profile_success, fetch_profile_failure } from '../profile_slice';
import api from '../../../../api'


const fetchProfileLogic = createLogic({
    type: fetch_profile,
    latest: true,

    async process({ action }, dispatch, done) {
        try {
            const d = await api.get('/auth/user', {
                cache: {
                    ignoreCache: true
                }
            });
            console.log( d );
            dispatch( fetch_profile_success({profile: d.data}) );
        }catch (e) {
            dispatch( fetch_profile_failure ({error: e.response}) )
        }
    }
})

export default fetchProfileLogic;