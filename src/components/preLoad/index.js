



export default {
    install(Vue)  {
        
        const preload = new createjs.LoadQueue(false);
        // 加载完成
        preload.on("complete" , (res)=>{
            
        });
        // 加载进度条
        preload.on("progress" , (res)=>{
            const percentage = `${parseInt(res.progress * 100)}%`;
        });
        // 单个图片加载出错
        preload.on("error" , (res)=>{
            console.log('load image error == >', res);
        });

        // 预加载图片列表
        var imageList = [];

        // 增加单个或者多个序列帧图片
        Vue.prototype.$addManifest = (options = {
            min: 0,        // 图片第一后缀  00010 填10
            max: 0,        // 图片最大后缀  00079 填79  10-79加载
            prefix: null,  // 图片的id，可以通过id从 preload中获取到对应的图片
            path: null,    // 图片加载的路径
            ext: 'jpg',    // 默认加载格式为 JPG 
            strCount: 0,   //针对 0000  0001  0002 这样的序列帧。
        }) => {
            const defaultConfig = {
                min: 0,       
                max: 0,       
                ext: 'jpg',   
                strCount: 0,  
            }

            const data = Object.assign(defaultConfig, options);
            console.log('image Load config ==>', data);
            

            var prefix = null;
            if (data.strCount > 0) {
                for (var i = 0; i < data.strCount; i++) {
                    prefix = `${prefix}0`;
                }
            }
            console.log('image append ==> ', prefix);

            if (data.min < data.max && data.prefix && data.path) {
                // 加载序列帧图片
                for (var i = min; i <= max; i++) {
                    var file_name = '';
                    if (prefix) {
                        file_name = `${prefix}${i}`.substr(-data.strCount);
                    } 
                    const reqImg = `${imgBaseUrl}/${path}/${file_name}.${ext}`;
                    imageList.push({ id: `${prefix}${i}`, src: reqImg });
                }
            } else if (data.prefix && data.path) {
                // 加载单张图片
                imageList.push({ id: `${prefix}${i}`, src: reqImg });
            }
        }

        // 开始预加载
        Vue.prototype.$begainLoading = () => {
        }
    }
}