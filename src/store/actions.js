import {
    SET_LOADER,
    SET_LOADINGSTATUS
} from './mutation-types';


export default {
    // 设置loader
    setLoader({ commit }, params) {
        commit(SET_LOADER, params);
    },
    // 设置loading状态
    setLoadingStatues({ commit }, params) {
        commit(SET_LOADINGSTATUS, params);
    },
    // 设置GA统计
    setGoogleAnaly() {
        (function(i, s, o, g, r, a, m) {
            i['GoogleAnalyticsObject'] = r;
            i[r] = i[r] || function() {
                (i[r].q = i[r].q || []).push(arguments)
            }, i[r].l = 1 * new Date();
            a = s.createElement(o),
                m = s.getElementsByTagName(o)[0];
            a.async = 1;
            a.src = g;
            m.parentNode.insertBefore(a, m)
        })(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');

        // ga('create', 'UA-18256273-1', 'auto', 'Truemetrics');
        // ga('Truemetrics.send', 'pageview');
    },
}