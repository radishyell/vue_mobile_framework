<template>
    <div>
        loading
    </div>
</template>


<script>
export default {
    mounted() {
        // 添加加载配置
        var config = this.$loadConfig();
        console.log('config ==>', config);
        config.min = 1;
        config.max = 56;
        config.path = '/static/gif/transition';
        config.prefix = 'transition_';
        this.$addManifest(config);

        // 添加加载配置
        var config2 = this.$loadConfig();
        console.log('config2 ==>', config2);
        config2.min = 0;
        config2.max = 113;
        config2.path = '/static/gif/home_gif';
        config2.prefix = 'home_gif_';
        config2.strCount = 3;
        this.$addManifest(config2);

        // 开始加载
        this.$begainLoading();
        
        // window.addEventListener(this.$loadProgress(), (res)=>{
        //     console.log('progress ==> ', res);
        // })

        window.addEventListener(this.$loadComplete(), (res)=>{
            console.log('complete ==> ', res);

            console.log(this.$getLoadImage(config));
            console.log(this.$getLoadImage(config2));
            
        });

    }
}
</script>


<style lang="scss" scoped>

</style>