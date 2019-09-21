<template>
    <div class="music_content">
        <div v-if="isLoad && musicPlayer" class="music" @click="stateChanged">
            <img :src="isPlay ? openImage : closeImage">
        </div>
    </div>
</template>

<script>

        
const MUSIC_COMPLETE = 'MUSIC_COMPLETE'; // 音乐加载完毕回调
const MUSIC_CHANGE = 'MUSIC_CHANGE';     // 音乐播放状态回调

export default {
    name: 'music-player',
    data () {
        return {
            // 外部传入可选参数
            path: null,        // 音乐加载路径（必须）
            openImage: null,   // 音乐开启图标
            closeImage: null,  // 音乐关闭图标
            // 内部数据
            isLoad: false,     // 是否音乐资源已经加载完毕
            musicPlayer: null, // 音乐播放器
        }
    },
    mounted () {
        this.initMusic();
    },
    computed: {
        isPlay() {
            return this.musicPlayer && !this.musicPlayer.paused
        }
    },
    methods: {
        initMusic() {
            // 页面隐藏，暂停音乐
            document.addEventListener("visibilitychange", this.stateChanged());       
            document.addEventListener("webkitvisibilitychange", this.stateChanged());       
            document.addEventListener("msvisibilitychange", this.stateChanged());

            if (this.isWechat()) {
                // 监听微信ready事件，才能自动播放音乐
                document.addEventListener("WeixinJSBridgeReady", this.createMusic() , false);
            } else {
                // 如果不是在微信环境下，那就直接调用方法
                this.createMusic();
            }
        },
        // 改变播放状态
        stateChanged() {
            if (this.musicPlayer) {
                const current = this.musicPlayer.paused;
                this.musicPlayer.paused = !current;
                // 触发方法
                this.customEvent(this.MUSIC_CHANGE);
            }
        },
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
        },
        // 触发自定义方法
        customEvent(eventName) {
            const event = document.createEvent("HTMLEvents");
            event.initEvent(eventName, false, true);
            event.data = {
                isLoad: this.isLoad,
                isPause: this.musicPlayer.paused
            }
            window.dispatchEvent(event);
        },
        // 是否在微信环境
        isWechat() {
            const ua = window.navigator.userAgent.toLowerCase();
            return ua.match(/MicroMessenger/i) == 'micromessenger'
        }
    }
}
</script>


<style lang="scss" scoped>
    .music_content {
        position: absolute;
        right: .1rem;
        top: .1rem;
        background: orange;
        z-index: 1;
        .music {
            img {
                width: .6rem;
                height: auto;
            }
        }
    }
</style>

