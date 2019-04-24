<template>
    <div class="loading_page">
        <div>
            <div>
                <img src="../../assets/image/loading/loading.gif">
            </div>
            <div class="num_text">LOADING... <span v-text="num"></span> </div>
        </div>
    </div>
</template>

<script>

import { mapState, mapActions } from 'vuex';
import manifest from '@/common/js/manifest.js';
import { PageType } from '@/common/js/enum.js'

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
        ...mapActions(['setLoader', 'setPageType'])
    },
    mounted () {
        // 初始化创建加载队列
        const preload = new createjs.LoadQueue(false);
        // 加载完成
        preload.on("complete" , (res)=>{
            this.setPageType(PageType.HomeType);
        });
        // 加载进度条
        preload.on("progress" , (res)=>{
            this.num = `${parseInt(res.progress * 100)}%`;
        });
        // 单个图片加载出错
        preload.on("error" , (res)=>{
            console.log(`load image error`);
            console.log(res)
        });
        // 开始加载资源
        const imageList = manifest();
        preload.loadManifest(imageList);
        this.setLoader(preload);
    }
}
</script>


<style lang="scss" scoped>
    @import '../../common/css/mixin.scss';
    .loading_page {
        @include flc;
        width: 100%;
        height: 100%;
        div{
            text-align: center;
        }
        img{
            width: 2rem;
            height: auto;
        }
        .num_text {
            margin-top: .2rem;
            font-weight: bold;
            font-size: .3rem;
        }
    }
</style>



