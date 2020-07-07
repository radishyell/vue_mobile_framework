<template>
  <div>
		<div ref="icon_bg_1">
			<!-- <div>sss</div> -->
		</div>
	</div>
</template>


<script>
import { PageType } from "../common/js/enum.js";
import { mapState, mapActions } from "vuex";

export default {
  mounted() {
    // 添加加载配置
    this.$addLoadImage([
        { id: 'icon_bg_1', path: `https://i.postimg.cc/LXj4xyRD/radish.jpg` },
        { id: 'icon_bg_2', path: `https://i.postimg.cc/tgwBXh71/Wechat-IMG498.jpg` },
        { id: 'icon_bg_3', path: `https://i.postimg.cc/XYD88wf2/Wechat-IMG497.jpg` },
        { id: 'icon_bg_4', path: `https://i.postimg.cc/NjWXFb7w/Wechat-IMG509.jpg` },
        { id: 'icon_bg_5', path: `https://i.postimg.cc/8zFWTxvH/Wechat-IMG504.jpg` },
      ]);

    // 开始加载
    this.$begainLoading();

    // window.addEventListener(this.$loadProgress(), (res)=>{
    //     console.log('progress ==> ', res);
    // })

    window.addEventListener(this.$loadComplete(), res => {
			console.log("complete ==> ", res);
			this.$refreshPage(this);

    });
  },
  methods: {
		...mapActions(["setPageType"]),
		
  }
};
</script>


<style lang="scss" scoped>
</style>