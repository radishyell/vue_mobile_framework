



export default {
    install(Vue)  {
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
            prefix: null,  // 图片的id，可以通过id从 preload中获取到对应的图片
            path: null,    // 图片加载的路径
            ext: 'jpg',    // 默认加载格式为 JPG 
            strCount: 0,   //针对 0000  0001  0002 这样的序列帧。
        }

        
        const preload = new createjs.LoadQueue(false);
        // 加载完成
        preload.on("complete" , (res)=>{
            customEvent(PRELOAD_COMPLETE, res)
        });
        // 加载进度条
        preload.on("progress" , (res)=>{
            const percentage = `${parseInt(res.progress * 100)}%`;
            customEvent(PRELOAD_PROGRESS, percentage)
        });
        // 单个图片加载出错
        preload.on("error" , (res)=>{
            console.log('load image error == >', res);
            customEvent(PRELOAD_ERROR, res)
        });

        // 预加载图片列表
        var imageList = [];

        // 增加单个或者多个序列帧图片
        Vue.prototype.$addManifest = (options = null) => {
            if (!options) return;
            const data = Object.assign(PRELOAD_CONFIG, options);
            var prefix = '';
            if (data.strCount > 0) {
                for (var i = 0; i < data.strCount; i++) {
                    prefix = `${prefix}0`;
                }
            }
            if (data.min < data.max && data.prefix && data.path) {
                // 加载序列帧图片
                for (var i = data.min; i <= data.max; i++) {
                    var file_name = '';
                    if (prefix) {
                        file_name = `${prefix}${i}`.substr(-data.strCount);
                    } else {
                        file_name = i;
                    }
                    const reqImg = `${data.path}/${file_name}.${data.ext}`;
                    imageList.push({ id: `${data.prefix}${i}`, src: reqImg });
                }
            } else if (data.prefix && data.path) {
                // 加载单张图片
                imageList.push({ id: `${data.prefix}`, src: data.path });
            }
        }

        // 开始预加载
        Vue.prototype.$begainLoading = () => {
            if (imageList.length) {
                preload.loadManifest(imageList);
            }
        }

        // 获取预加载的图片
        Vue.prototype.$getLoadImage = (options = null) => {
            if (!options) return;
            if (options.min < options.max && options.prefix) {
                var temp = [];
                for (var i = options.min; i <= options.max; i++) {
                    const loadId = `${options.prefix}${i}`;
                    const resultImage = preload.getResult(loadId);
                    temp.push(resultImage);
                }
                return temp;
            } else if (options.prefix) {
                const resultImage = preload.getResult(options.prefix);
                return resultImage;
            } else {
                return null;
            }
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
    }
}