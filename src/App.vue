<template>
    <div id="app">
        <transition-group name="bounce" enter-active-class="fadeInLeft animated" leave-active-class="fadeOutRight animated">
            <loading-page :key="1" v-if="currentPage == PageType.LoadingType"></loading-page>
            <home-page :key="2" v-else-if="currentPage == PageType.HomeType"></home-page>
            <detail-page :key="3" v-else-if="currentPage == PageType.DetailType"></detail-page>
        </transition-group>
    </div>
</template>

<script>

import homePage from './pages/home/index';
import loadingPage from './pages/loading/index';
import detailPage from './pages/detail/index';

import { PageType } from './common/js/enum.js';
import { mapState, mapActions } from 'vuex';
import VConsole from 'vconsole/dist/vconsole.min.js';

export default {
    name: 'App',
    data () {
        return {
            PageType,
        }
    },
    mounted() {
        const vConsole = new VConsole();
        this.setGoogleAnaly();

        console.log(this.currentPage);
        
    },
    methods: {
        ...mapActions(['setGoogleAnaly'])
    },
    components: { homePage, loadingPage, detailPage },
    computed: {
        ...mapState(['currentPage'])
    },
}
</script>


<style lang="scss">
    @import './common/css/common.scss';
    @import './common/css/mixin.scss';
    @import '@/common/css/mint.scss';
    body, html{
        background: $bg_c;
        color: $font_c;
    }
    .animated{
        animation-duration: 0.5s;
    }
</style>
