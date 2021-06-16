import { createLogic } from 'redux-logic';
import { update_filters, update_products } from '../products_slice';
import _ from 'lodash'
import api from '../../../../../api'

const updateFiltersLogic = createLogic({
    type: update_filters,
    // latest: true,

    async process({ action }, dispatch, done) {
        dispatch( update_products({filters: action.payload}) );
        done();
    }
})

export default updateFiltersLogic;