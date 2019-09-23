import {
    SET_PAGETYPE
} from './mutation-types';

export default {
    
    [SET_PAGETYPE](state, params) {
        state.currentPage = params;
    }
}