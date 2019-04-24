import {
    SET_LOADER
} from './mutation-types';

export default {
    [SET_LOADER](state, params) {
        state.preloader = params;
    },
    [SET_LOADINGSTATUS](state, params) {
        state.isLoadingCompelete = params;
    },
}