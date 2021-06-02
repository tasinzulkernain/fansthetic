import { createLogic } from 'redux-logic';
import { update_products_api_status, update_products } from '../products_slice'

const productsApiStatusLogic = createLogic({
    type: update_products_api_status,
    latest: true,

    async process({ action }, dispatch) {
        if( action.payload.status === "SUCCESS") {
            dispatch( update_products(action.payload.products) );
        }
    }
})

export default productsApiStatusLogic;