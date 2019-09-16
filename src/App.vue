<template>
    <div id="app">
         <div v-for="(item, index) in pageList" :key="'crocs'+index">
            <transition name="fade" mode="out-in">
                <component v-if="currentPage == item.type" :is="item.name" ></component>
            </transition>
        </div>
    </div>
</template>

<script>

import homePage from './pages/home/index';
import loadingPage from './pages/loading/index';
import detailPage from './pages/detail/index';

import { PageType } from './common/js/enum.js';
import { mapState, mapActions } from 'vuex';

import VConsole from 'vconsole/dist/vconsole.min.js';


import music from './common/js/music.js';

export default {
    name: 'App',
    data () {
        return {
            PageType,
            pageList: [
                {
                    name: 'loadingPage',
                    type: PageType.loadingPage,
                },{
                    name: 'homePage',
                    type: PageType.homePage,
                },{
                    name: 'detailPage',
                    type: PageType.detailPage,
                }
            ]
        }
    },
    mounted() {
        // const path = require('/static/music.mp3');
        const path = '/static/music.mp3';
        new music(path, ()=>{
            console.log('call back ===>');
        });

        // this.setGoogleAnaly();
    },
    methods: {
        ...mapActions(['setGoogleAnaly']),
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
    @import '@/common/css/mint.scss';
    #app{
        width: 100%;
        height: 100%;
    }
    body, html{
        background: $bg_c;
        color: $font_c;
    }
    .animated{
        animation-duration: 0.5s;
    }
</style>
