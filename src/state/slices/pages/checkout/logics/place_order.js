import { createLogic } from 'redux-logic';
import { place_order, place_order_failure, place_order_success } from '../checkout_slice';

import api from '../../../../../api'
import { initialize_cart, update_cart_success } from '../../../cart/cart_slice';

const placeOrderLogic = createLogic({
    type: place_order,
    latest: true,

    async process({ action: {payload} }, dispatch, done) {
        try {
            // const payload = action.payload;
            const req = {
                "shipping_address": {
                //   "created_at": "",
                //   "updated_at": "",
                //   "is_deleted": true,
                //   "deleted_at": "",
                  "name": payload.name,
                  "mobile_no": payload.contact_no,
                  "street": payload.shipping_address.street,
                  "city": "",
                  "zipcode": "",
                  "division": "",
                },
                "billing_address": {
                  "created_at": "2021-12-17T15:16:30.650Z",
                  "updated_at": "2021-12-17T15:16:30.650Z",
                  "is_deleted": true,
                  "deleted_at": "2021-12-17T15:16:30.650Z",
                  "name": payload.name,
                  "mobile_no": payload.contact_no,
                  "street": payload.shipping_address.street,
                  "city": "string",
                  "zipcode": "string",
                  "division": "string"
                },
                "name": payload.name,
                // "created_at": "2021-12-17T15:16:30.650Z",
                // "track_id": "string",
                "contact_no": payload.contact_no,
                "delivery_charge": payload.delivery_charge,
                "special_note": "string",
                // "status": "processing",
                // "discount": 0,
                "special_discount": 0,
                "paid_amount": 0,
                "remaining_amount": 0,
                "delivery_zone": payload.delivery_zone
            }
            const d = await api.post(`/orders/create/`, req);  
            dispatch( place_order_success( ) );
            localStorage.setItem("cart", JSON.stringify( { products: [], total_amount: 0, count: 0 } ) );
            dispatch( initialize_cart() );
            // dispatch( update_cart_success( [] ) )
        } catch(e) {
            dispatch( place_order_failure ( { error: e.response } ) );
        }
    }
})

export default placeOrderLogic;