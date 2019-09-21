<template>
    <div id="app">
        <div class="page_content">
            <div v-for="(item, index) in pageList" :key="'crocs'+index">
                <transition name="fade" mode="out-in">
                    <component v-if="currentPage == item.type" :is="item.name" ></component>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>

import homePage from './pages/home.vue';
import loadingPage from './pages/loading.vue';
import detailPage from './pages/detail.vue';

import { PageType } from './common/js/enum.js';
import { mapState, mapActions } from 'vuex';

import VConsole from 'vconsole/dist/vconsole.min.js';

export default {
    name: 'App',
    data () {
        return {
            PageType,
            pageList: [
                {
                    name: 'loadingPage',
                    type: PageType.LoadingType,
                },{
                    name: 'homePage',
                    type: PageType.HomePage,
                },{
                    name: 'detailPage',
                    type: PageType.DetailPage,
                }
            ]
        }
    },
    mounted() {
        // 开启音乐播放
        const path = '/static/music.mp3';
        this.$music({ path: path });

        // 默认进入加载页面
        this.setPageType(PageType.LoadingType)
        // this.setGoogleAnaly();
    },
    methods: {
        ...mapActions(['setGoogleAnaly', 'setPageType']),
        showDebug() {
            const vConsole = new VConsole();
        }
    },
    components: { homePage, loadingPage, detailPage },
    computed: {
        ...mapState(['currentPage'])
    }
}
</script>


<style lang="scss">
    @import './common/css/common.scss';
    @import './common/css/mixin.scss';
    @import './common/css/mint.scss';
    #app{
        width: 100%;
        height: 100%;
        .page_content {
            position: absolute;
            left: 0px;
            top: 0px;
            width: 100%;
            height: 100%;
            background: pink;
        }
    }
    body, html{
        background: $bg_c;
        color: $font_c;
    }
</style>
