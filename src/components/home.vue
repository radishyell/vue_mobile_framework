<template>
    <div class="home_content">
        <div class="home_main">
            <canvas class="main_canvas" id="main_gif"></canvas>
        </div>
        <div class="foot_margin">
            <div class="normal_btn" @click="showReserve">预约领票</div>
            <div class="rule" @click="showRule">预约规则</div>
        </div>
    </div>
</template>


<script>

import { mapActions, mapState } from 'vuex';
import { popupType, mainType } from '../common/js/enum.js';

export default {
    mounted() {
        var imageArray = [];
        for (var i = 1; i < 32; i++) {
            const imageId = `main_gif${i}`;
            const main_gif = this.preloader.getResult(imageId);
            imageArray.push(main_gif);
        }
        const canvas = document.getElementById("main_gif");
        const width = 750;
        const height = 598;
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(imageArray[0], 0, 0, width, height);
        var frameIndex = 0;
        const timer = setInterval(function(){
            ctx.clearRect(0, 0, width, height);
            frameIndex ++;
            ctx.drawImage(imageArray[frameIndex], 0, 0, width, height);
            if (frameIndex == imageArray.length - 1) {
                clearInterval(timer);
            }
        }, 100);
    },
    methods: {
        ...mapActions(['setAlert', 'setPageType', 'getReserInfo', 'setCodeNum', 'setReserveInfo', 'getUserMember']),
        showRule() {
            ga('Truemetrics.send', 'event', 'LRL INK预约','MO','rule');
            this.setAlert({
                isShow: true,
                type: popupType.ruleType
            });
        },
        showReserve() {
            ga('Truemetrics.send', 'event', 'LRL INK预约','MO','book');
            // 获取用户预约数据
            this.getReserInfo().then(() => {
                if (!this.reserveInfo.reserveDate && !this.reserveInfo.reserveTime) {
                    // 用户没预约过
                    this.getUserMember().then(() => {
                        if (this.userInfo.isMember) {
                            // 会员用户跳转到预约页面
                            this.setPageType(mainType.reserveType);
                        } else {
                            // 跳转开卡
                            this.showOpenCard();
                        }
                    });
                } else {
                    // 用户已经预约过，弹框显示
                    this.setAlert({
                        type: popupType.successType, 
                        isShow: true,
                        des: {
                            title: '预约成功',
                            subTitle: '您已预约过！<br/>请勿重复预约'
                        }
                    });
                }
            });
        },
        showOpenCard() {
            // 会员开卡
            if (window.__wxjs_environment === "miniprogram") {
                wx.miniProgram.redirectTo({ url: "../notJoin/notJoin" });
            } else {
                setTimeout(()=>{
                    window.location.href = "https://wx-member.lorealparis.com.cn/member/h5/create.html?utm=inkpopup";
                }, 500);
            }
        }
    },
    computed: {
        ...mapState(['userInfo', 'preloader', 'reserveInfo'])
    }
}
</script>

<style scoped>
/* 容器 */
.home_content{
    position: absolute;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
}

.home_main{
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
}



.main_canvas{
    width: 100%;
}

.rule{
    margin: 0px auto;
    text-align: center;
    font-size: 30px;
    border-bottom: 1px solid black;
    padding-bottom: 5px;
    width: 128px;
    margin-top: 3%;
    /* font-weight: bold; */
}

</style>

