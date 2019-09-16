// 音乐类
class music {
    constructor(path = null, callBack = null) {
        if (!path) {
            console.log('muisc path undefined', path);
            return;
        }
        // 音乐加载路径
        this.path = path;
        // 是否已经加载完毕
        this.isLoad = false;
        // 音乐播放器
        this.musicPlayer = null;
        // 音乐回调状态
        this.callBack = callBack;
        this.createMusic();
    }

    createMusic() {
        // 页面隐藏事件
        document.addEventListener("visibilitychange", this.stateChanged());       
        document.addEventListener("webkitvisibilitychange", this.stateChanged());       
        document.addEventListener("msvisibilitychange", this.stateChanged());
        // 监听微信ready事件，才能自动播放音乐
        document.addEventListener("WeixinJSBridgeReady", this.wechatReady() , false);
        // 如果不是在微信环境下，那就直接调用方法
        // this.wechatReady();
    }

    // 改变播放状态
    stateChanged() {
        if (this.musicPlayer) {
            const current = this.getPlayStatus();
            this.musicPlayer.setPaused(!current);
            this.callMessage();
        }
    }

    // 开始加载音乐
    wechatReady() {
        // 播放属性
        const props = new createjs.PlayPropsConfig().set({
            interrupt: createjs.Sound.INTERRUPT_ANY, 
            loop: -1,  //循环播放
            volume: 0.8
        });
        createjs.Sound.on("fileload", () => {
            this.musicPlayer = createjs.Sound.play("sound", props);
            this.isLoad = true;
            this.callMessage();
        });
        createjs.Sound.alternateExtensions = ["mp3"];
        createjs.Sound.registerSound({  src: this.path, id: "sound" });
    }

    // 获取是否加载完毕
    getLoadStatus() {
        return this.isLoad;
    }

    // 获取播放状态
    getPlayStatus() {
        return this.musicPlayer.getPaused();
    }

    callMessage() {
        if (this.callBack && typeof this.callBack === 'function') {
            this.callBack(this.isLoad, this.getPlayStatus());
        }
    }
}

export default music;