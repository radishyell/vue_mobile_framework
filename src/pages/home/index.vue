<template>
    <div class="home_page" :style="{backgroundImage: 'url(' + bgImage + ')'}">

    </div>
</template>


<script>
import { mapState } from 'vuex';
export default {
    data () {
        return {
            bgImage: '',
        }
    },
    mounted() {
        const bgImage = this.preloader.getResult('bg');
        this.bgImage = bgImage.src;
        console.log(bgImage.src);
        
    },
    computed: {
        ...mapState(['preloader'])
    }
}
</script>


<style lang="scss" scoped>
    @import '../../common/css/mixin.scss';
    .home_page{
        width: 100%;
        height: 100%;
        // background: orange
        @include bsp
    }
</style>


