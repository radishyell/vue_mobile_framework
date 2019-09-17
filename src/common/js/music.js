/**
 * 音乐播放类
 *  const path = '/static/music.mp3';
    const player = new music(path);
    window.addEventListener(player.MUSIC_COMPLETE, (res)=>{
        console.log('MUSIC_COMPLETE ==>', res);
    });
    window.addEventListener(player.MUSIC_CHANGE, (res)=>{
        console.log('MUSIC_CHANGE ==>', res);
    });

    setTimeout(() => {
        console.log('暂停');
        player.stateChanged();
    }, 5000);
 * 
 * **/ 
class music {
    constructor(path = null) {
        if (!path) {
            console.log('muisc path undefined', path);
            return;
        }

        this.initParams(path);
        this.initMusic();
    }

    initParams(path) {
        // 音乐加载路径
        this.path = path;
        // 是否已经加载完毕
        this.isLoad = false;
        // 音乐播放器
        this.musicPlayer = null;
        // 音乐加载完毕回调
        this.MUSIC_COMPLETE = 'MUSIC_COMPLETE';
        // 音乐播放状态回调
        this.MUSIC_CHANGE = 'MUSIC_CHANGE';
    }

    initMusic() {
        // 页面隐藏事件
        document.addEventListener("visibilitychange", this.stateChanged());       
        document.addEventListener("webkitvisibilitychange", this.stateChanged());       
        document.addEventListener("msvisibilitychange", this.stateChanged());
        // 监听微信ready事件，才能自动播放音乐
        document.addEventListener("WeixinJSBridgeReady", this.createMusic() , false);
        // 如果不是在微信环境下，那就直接调用方法
        // this.createMusic();
    }

    // 改变播放状态
    stateChanged() {
        if (this.musicPlayer) {
            const current = this.getPlayStatus();
            this.musicPlayer.paused = !current;
            // 触发方法
            this.customEvent(this.MUSIC_CHANGE);
        }
    }
    // 开始加载音乐
    createMusic() {
        // 播放属性
        const props = new createjs.PlayPropsConfig().set({
            interrupt: createjs.Sound.INTERRUPT_ANY, 
            loop: -1,  //循环播放
            volume: 0.8
        });
        createjs.Sound.on("fileload", () => {
            this.musicPlayer = createjs.Sound.play("sound", props);
            this.isLoad = true;

            // 触发方法
            this.customEvent(this.MUSIC_COMPLETE);
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
        return this.musicPlayer.paused;
    }

    // 触发自定义方法
    customEvent(eventName) {
        const event = document.createEvent("HTMLEvents");
        event.initEvent(eventName, false, true);
        event.data = {
            isLoad: this.getLoadStatus(),
            isPause: this.getPlayStatus()
        }
        window.dispatchEvent(event);
    }
}

export default music;