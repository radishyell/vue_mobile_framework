import Vue from 'vue';
import Vuex from 'vuex';
import getters from './getters';
import actions from './actions';
import mutations from './mutations';

Vue.use(Vuex)

const state = {
    // 预加载组件，所有的图片都在该对象
    preloader: null,
    // 预加载是否完毕
    isLoadingCompelete: false,
}

export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations
})