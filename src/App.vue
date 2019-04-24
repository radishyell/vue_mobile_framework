<template>
    <div id="app">
        <loading-page v-if="currentPage == PageType.LoadingType"></loading-page>
        <home-page v-else-if="currentPage == PageType.HomeType"></home-page>
        <detail-page v-else-if="currentPage == PageType.DetailType"></detail-page>
        <!-- <div v-else>
            <transition-group name="bounce" enter-active-class="fadeInLeft animated" leave-active-class="fadeOutRight animated">
            </transition-group>
        </div> -->
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
    },
    methods: {
        ...mapActions(['setGoogleAnaly'])
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
