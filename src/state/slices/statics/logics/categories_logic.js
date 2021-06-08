import { createLogic } from 'redux-logic';
import { set_categories, set_categories_success } from '../statics_slice'
import { fatal_error } from '../../errors/errors'

import api from '../../../../api'


const categoriesLogic = createLogic({
    type: set_categories,
    latest: true,

    async process({ action }, dispatch) {
        console.log("came categories logc")
        try {
            const d = await api.get('/products/category');
            dispatch( set_categories_success(d.data.response.categories) )            
        }catch (e) {
            dispatch( fatal_error({
                "error_string": "Couldn't fetch categories",
                "error": e
            }) )
        }
    }
})

export default categoriesLogic;