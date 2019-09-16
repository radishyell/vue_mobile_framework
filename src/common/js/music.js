class music {
    constructor(path) {
        if (!path) {
            console.log('muisc path undefined', path);
            return;
        }
        this.path = path;
        this.createMusic();
    }

    createMusic() {
        // 页面隐藏事件
        document.addEventListener("visibilitychange", this.stateChanged());       
        document.addEventListener("webkitvisibilitychange", this.stateChanged());       
        document.addEventListener("msvisibilitychange", this.stateChanged());

        // 监听微信ready事件
        document.addEventListener("WeixinJSBridgeReady", this.wechatReady() , false);
    }

    stateChanged() {

    }

    wechatReady() {
        // 播放属性
        const props = new createjs.PlayPropsConfig().set({
            interrupt: createjs.Sound.INTERRUPT_ANY, 
            loop: -1,  //循环播放
            volume: 0.8
        });
        createjs.Sound.on("fileload", () => {
            console.log('music load finish');
            this.musicPlayer = createjs.Sound.play("sound", props);
            this.isLoadMusic = true;
            this.isOpenMusic = true;
        });
        createjs.Sound.alternateExtensions = ["mp3"];
        createjs.Sound.registerSound({  src: this.path, id: "sound" });
    }
}


export default music;


// 音乐操作
// musicListener() {
//     document.addEventListener("visibilitychange", this.stateChanged);       
//     document.addEventListener("webkitvisibilitychange", this.stateChanged);       
//     document.addEventListener("msvisibilitychange", this.stateChanged);  
//     // 监听微信ready事件
//     document.addEventListener("WeixinJSBridgeReady",  () => {
//         // 播放属性
//         const props = new createjs.PlayPropsConfig().set({
//             interrupt: createjs.Sound.INTERRUPT_ANY, 
//             loop: -1,  //循环播放
//             volume: 0.8
//         });
//         createjs.Sound.on("fileload", () => {
//             console.log('music load finish');
//             this.musicPlayer = createjs.Sound.play("sound", props);
//             this.isLoadMusic = true;
//             this.isOpenMusic = true;
//         });
//         createjs.Sound.alternateExtensions = ["mp3"];
//         createjs.Sound.registerSound({ 
//             src: require('./assets/bg.mp3'),
//             id: "sound" 
//         });
//     }, false);
// },
// // 页面隐藏 强制暂停音乐
// stateChanged(){
//     const isHidden = document.hidden || document.webkitHidden || document.msHidden;
//     if (isHidden && this.isOpenMusic) {
//         this.$nextTick(() => {
//             if (this.musicPlayer) {
//                 this.musicPlayer.paused = true;
//                 this.isOpenMusic = false;
//             }
//         });
//     }
// },
// // 改变音乐播放状态
// changeMusic() {
//     this.$nextTick(() => {
//         if (this.musicPlayer) {
//             this.isOpenMusic = !this.isOpenMusic;
//             this.musicPlayer.paused = !this.isOpenMusic;
//         }
//     });
// }