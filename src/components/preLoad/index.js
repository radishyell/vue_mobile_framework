



export default {
	install(Vue) {
		// 发送自定义监听事件
		function customEvent(eventName, data) {
			const event = document.createEvent("HTMLEvents");
			event.initEvent(eventName, false, true);
			event.data = data;
			window.dispatchEvent(event);
		}

		const PRELOAD_COMPLETE = 'PRELOAD_COMPLETE';  // 加载完成
		const PRELOAD_PROGRESS = 'PRELOAD_PROGRESS';  // 加载进度条
		const PRELOAD_ERROR = 'PRELOAD_ERROR';        // 加载出错
		const PRELOAD_CONFIG = {                      // 预加载的图片配置
			min: 0,        // 图片第一后缀  00010 填10
			max: 0,        // 图片最大后缀  00079 填79  10-79加载
			id: null,  // 图片的id，可以通过id从 preload中获取到对应的图片
			path: null,    // 图片加载的路径
			ext: 'jpg',    // 默认加载格式为 JPG 
			strCount: 0,   //针对 0000  0001  0002 这样的序列帧。
		}

		const preload = new createjs.LoadQueue(false);
		// 加载完成
		preload.on("complete", (res) => {
			customEvent(PRELOAD_COMPLETE, res)
		});
		// 加载进度条
		preload.on("progress", (res) => {
			const percentage = `${parseInt(res.progress * 100)}%`;
			customEvent(PRELOAD_PROGRESS, percentage)
		});
		// 单个图片加载出错
		preload.on("error", (res) => {
			console.log('load image error == >', res);
			customEvent(PRELOAD_ERROR, res)
		});

		// 预加载图片列表
		let imageList = [];
		/**
		 * 增加序列帧图片
		 * @param 数组或者某一个配置的序列帧或者单张图片
		 * 
		 * 
		 * */ 
		// 加载单张图片
		// this.$addLoadImage({
		// 	path: 'https://xxx/face_image.png',
		// 	id: 'face_image'
		// });

		// 加载图片数组
		// this.$addLoadImage([{
		// 	path: 'https://xxx/face_image.png',
		// 	id: 'face_image'
		// },{
		// 	path: 'https://xxx/eye_image.png',
		// 	id: 'eye_image'
		// }])

		// 加载序列帧
		// this.$addLoadImage({
		// 	min: 0,        // 必填
		// 	max: 0,        // 必填
		// 	id: null,  		 // 必填
		// 	path: null,    // 必填
		// 	ext: 'jpg',    // 选填
		// 	strCount: 0,   // 选填
		// });
		Vue.prototype.$addLoadImage = (options = null) => {
			if (!options) return;
			const type = Object.prototype.toString.call(options);
			// 数据都当做数组来处理
			if (type !== '[object Array]') {
				options = [options]
			}

			options.map((item) => {
				const data = Object.assign(PRELOAD_CONFIG, item);
				let id = '';
				if (data.strCount > 0) {
					for (let i = 0; i < data.strCount; i++) {
						id = `${id}0`;
					}
				}
				if (data.min < data.max && data.id && data.path) {
					// 加载序列帧图片
					for (let i = data.min; i <= data.max; i++) {
						let file_name = '';
						if (id) {
							file_name = `${id}${i}`.substr(-data.strCount);
						} else {
							file_name = i;
						}
						const reqImg = `${data.path}/${file_name}.${data.ext}`;
						imageList.push({ id: `${data.id}${i}`, src: reqImg });
					}
				} else if (data.id && data.path) {
					// 加载单张图片
					imageList.push({ id: `${data.id}`, src: data.path });
				}
			});
		}

		// 开始预加载
		Vue.prototype.$begainLoading = () => {
			if (imageList.length) {
				preload.loadManifest(imageList);
			}
		}

		// 获取预加载的图片
		Vue.prototype.$getLoadImage = (options = null) => {
			if (!options) {
				console.error(' loading config undefined ');
				return;
			};
			if (options.min < options.max && options.id) {
				var temp = [];
				for (let i = options.min; i <= options.max; i++) {
					const loadId = `${options.id}${i}`;
					const resultImage = preload.getResult(loadId);
					temp.push(resultImage);
				}
				return temp;
			} else if (options.id) {
				const resultImage = preload.getResult(options.id);
				return resultImage;
			}
			return null;
		}

		// 将图片添加到dom节点下
		Vue.prototype.$refreshPage = (self) => {
			if (!self) {
				console.error(' this undefined ');
				return;
			}
			imageList.map((item) => {
				if (item.id) {
					const element = self.$refs[item.id];
					if (element && !element.hasChildNodes()) {
						const loadImage = preload.getResult(item.id);
						if (loadImage) {
							element.appendChild(loadImage);
						}
					}
				}
			});
		}


		// 获取监听字段
		Vue.prototype.$loadComplete = () => {
			return PRELOAD_COMPLETE;
		}
		Vue.prototype.$loadError = () => {
			return PRELOAD_ERROR;
		}
		Vue.prototype.$loadProgress = () => {
			return PRELOAD_PROGRESS;
		}
		Vue.prototype.$loadConfig = () => {
			return JSON.parse(JSON.stringify(PRELOAD_CONFIG));
		}
		Vue.prototype.$preLoadQueue = () => {
			return preload;
		}
	}
}