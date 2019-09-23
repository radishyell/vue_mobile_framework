import {
    SET_PAGETYPE
} from './mutation-types';


export default {
   

    // 设置当前页面显示类型
    setPageType({ commit }, params) {
        commit(SET_PAGETYPE, params);
    }
}