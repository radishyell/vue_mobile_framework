<template>
    <div class="loading_page">
        <div>
            <div>
                <img src="../../assets/loading/loading.gif">
            </div>
            <div class="num_text">LOADING... <span v-text="num"></span> </div>
        </div>
    </div>
</template>

<script>

import { mapState, mapActions } from 'vuex';
import { manifest } from '../../common/js/loading.js';

export default {
    data () {
        return {
            num: '0%'
        }
    },
    computed: {
        ...mapState(['preload'])
    },
    methods: {
        ...mapActions(['setLoader', 'setLoadingState'])
    },
    mounted () {
        // 初始化创建加载队列
        const preload = new createjs.LoadQueue(false);
        // 加载完成
        preload.on("complete" , (res)=>{
            this.setLoadingState(true);
        });
        // 加载进度条
        preload.on("progress" , (res)=>{
            this.num = `${parseInt(res.progress * 100)}%`;
        });
        // 单个图片加载出错
        preload.on("error" , (res)=>{
            console.log(`load image error`);
            console.log(res);
        });
        // 开始加载资源
        const imageList = manifest();
        preload.loadManifest(imageList);
        this.setLoader(preload);
    }
}
</script>

<style scoped>

.loading_page{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
}
.num_text{
    margin-top: 20px;
    width: 100%;
    text-align: center;
    font-weight: bold;
    color: #e31219;
    font-size: 30px;
}
</style>

