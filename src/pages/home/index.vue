<template>
    <div class="home_page">i am home page</div>
</template>


<script>
export default {
    data () {
        return {
            bgImage: '',
        }
    },
    mounted() {
        const bgImage = this.preloader.getResult('bg');
        console.log(bgImage.src);
        
    }
}
</script>


<style lang="scss" scoped>
    @import '../../common/css/mixin.scss';
    .home_page{
        width: 100%;
        height: 100%;
        // @include bis(this.bgImage)
    }
</style>


