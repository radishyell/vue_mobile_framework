import Vue from 'vue';
const MusicBox = Vue.extend(require('./music.vue').default);

// 只能有一个音乐播放器
let instance = null;

const music = (options) => {
	// 判断是否是服务端渲染
	if (Vue.prototype.$isServer) return;
	// 拼接对象
	const data = Object.assign({
		path: null,
		openImage: require('./icon/sound_open.png'),
		closeImage: require('./icon/sound_close.png'),
	}, options);
	if (!instance) {
		//生成组件
		instance = new MusicBox({ data });
		//组件需要挂载在dom元素上
		instance.vm = instance.$mount();
		document.body.appendChild(instance.vm.$el);
	} else {
		console.log('已经存在播放器');
	}
	console.log(instance);
	return instance.vm;
}

export default music;