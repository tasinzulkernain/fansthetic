import { createLogic } from 'redux-logic';
import { fetch_banners, fetch_banners_failure, fetch_banners_success } from '../home_slice'

import api from '../../../../../api'

const fetchBannersLogic = createLogic({
    type: fetch_banners,
    latest: true,

    async process({ action }, dispatch) {
        try {
            const d = await api.get(`/banners`);
            dispatch( fetch_banners_success( { banners: d.data.response.banners } ) );
        } catch(e) {
            dispatch( fetch_banners_failure( { error: e.response } ) );
        }
    }
})

export default fetchBannersLogic;