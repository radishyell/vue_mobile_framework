/*
* 
        // this.$createTrack('UA-50552495-5');
        // this.$track(true, 'test');
*/

export default {
	install(Vue) {
		(function (i, s, o, g, r, a, m) {
			i['GoogleAnalyticsObject'] = r;
			i[r] = i[r] || function () {
				(i[r].q = i[r].q || []).push(arguments)
			}, i[r].l = 1 * new Date();
			a = s.createElement(o),
				m = s.getElementsByTagName(o)[0];
			a.async = 1;
			a.src = g;
			m.parentNode.insertBefore(a, m)
		})(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');

		// ga统计的项目名
		var gaName = null;

		Vue.prototype.$createTrack = (id = null, name = '') => {
			if (id) {
				gaName = name;
				ga('create', id, 'auto', { 'name': gaName });
				ga(gaName + '.send', 'pageview');
			} else {
				console.log('track id undefined');
			}
		}

		// 添加track属性
		Vue.prototype.$track = (isPageView = false, key = null) => {
			if (key) {
				ga(gaName + '.send', isPageView ? 'pageview' : 'event', key);
			} else {
				console.log('track key undefined');
			}
		}
	}
}