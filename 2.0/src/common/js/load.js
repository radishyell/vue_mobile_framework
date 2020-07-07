// 预加载类

class load {
    constructor() {

       this.preload = null;

       this.initLoad();

        // 开始加载资源
        // preload.loadManifest(getImageList());
    }

    initLoad() {
        // 初始化创建加载队列
        const preload = new createjs.LoadQueue(false);
        // 加载完成
        preload.on("complete" , (res)=>{
            this.resetPage();
        });
        // 加载进度条
        preload.on("progress" , (res)=>{
            this.num = `${parseInt(res.progress * 100)}%`;
        });
        // 单个图片加载出错
        preload.on("error" , (res)=>{
            console.log('load image error == >', res);
        });

        this.preload = preload;
    }
}

export default load;