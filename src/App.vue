<template>
    <div id="app">
        <loading-page v-if="!isLoadingCompelete"></loading-page>
        <main-page v-else></main-page>
    </div>
</template>

<script>


import mainPage from './pages/main/index';
import loadingPage from './pages/loading/index';
import { mapState, mapActions } from 'vuex';

// debug log
import VConsole from 'vconsole/dist/vconsole.min.js';

export default {
    name: 'App',
    components: { mainPage, loadingPage },
    computed: {
        ...mapState(['isLoadingCompelete'])
    },
    mounted() {
        const vConsole = new VConsole();
        this.setGA();
    },
    methods: {
        ...mapActions(['setGA'])
    }
}
</script>

<style>

#app {
    width: 100%;
    height: 100%;
}

</style>
