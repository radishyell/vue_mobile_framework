<template>
    <div class="content">
        <div class="success_head">
            <div class="success_content">
                <div class="title">
                    <!-- 成功图片标题 -->
                    <div ref="success_title"></div>
                    <div class="code_text" v-text="codeNum ? codeNum : ''"></div>
                </div>
                <div class="des_content">
                    <div class="head_text">
                        <div class="head_title">预约成功！</div>
                        <div class="head_foot">长按保存入场券</div>
                    </div>
                    <div class="middle_text">
                        <div>场馆地址：北京朝阳区三里屯太古里南区南庭</div>
                        <div>预约时间：<span v-text="reserveInfo.reserveDate ? reserveInfo.reserveDate:''"></span>  <span v-text="reserveInfo.reserveTime ? reserveInfo.reserveTime:''"></span></div>
                    </div>
                    <div class="foot_text">
                        <div>持此唯一指定邀请码在指定时间段验证即可进入</div>
                        <div>每个账号仅限领取一个邀请码，逾期作废</div>
                    </div>
                </div>
            </div>
        </div>
        <img ref="result_image" class="result_image" src="">
        <div class="foot_margin">
        </div>
        <div class="btn_margin">
            <div class="normal_btn" @click="showReserve">修改预约</div>
        </div>
    </div>
</template>

<script>

import { mapActions, mapState } from 'vuex';
import { mainType } from '../common/js/enum.js';

export default {
    methods: {
        ...mapActions(['setPageType']),
        showReserve() {
            ga('Truemetrics.send', 'event', 'LRL INK预约','MO','change');
            this.setPageType(mainType.reserveType);
        },
        drawText() {
            // 要写入的文字
            const reserveDate = this.reserveInfo.reserveDate ? this.reserveInfo.reserveDate : '';
            const reserveTime = this.reserveInfo.reserveTime ? this.reserveInfo.reserveTime : '';
            const codeNum = this.codeNum ? this.codeNum : '';

            // 创建画布
            const canvas = document.createElement('canvas');
            // 获取背景图片
            const bg = this.preloader.getResult('success_bg');
            canvas.width = bg.width;
            canvas.height = bg.height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(bg, 0, 0, bg.width, bg.height);
            // 邀请码
            ctx.font = 'bold 45px Times 黑体';
            ctx.fillStyle = '#fff';
            ctx.fillText(codeNum ,390, 633);
            // 预约地址

            ctx.font = '30px Times 黑体';
            ctx.fillStyle = '#000';
            ctx.fillText(`场馆地址：北京朝阳区三里屯太古里南区南庭`, 90, 850);
            // 预约时间
            ctx.font = '30px Times 黑体';
            ctx.fillStyle = '#000';
            ctx.fillText(`预约时间：`, 90, 897);


            ctx.font = 'bold 30px Times 黑体';
            ctx.fillStyle = '#000';
            ctx.fillText(`${reserveDate} ${reserveTime}`, 240, 897);
            
            // 生成图片
            this.$refs.result_image.src = canvas.toDataURL("image/jpg");
        }
    },
    computed: {
        ...mapState(['reserveInfo', 'codeNum', 'preloader'])
    },
    mounted() {
        const success_title = this.preloader.getResult('success_title');
        this.$refs.success_title.appendChild(success_title);

        // 绘制文字
        this.drawText();
    }
}
</script>


<style scoped>
.content{
    position: absolute;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
.success_head{
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;

}

.success_content{
    width: 673px;
    background: white;
}

.foot_margin{
    height: 80px;
}

.btn_margin{
    position: fixed;
    width: 100%;
    text-align: center;
}

.title{
    padding-top: 40px;
    position: relative;
    font-size: 45px;
    font-weight: bold;
    text-align: center;
    color: white;
}

.code_text{
    position: absolute;
    right: 130px;
    top: 226px;
    width: 200px;
    height: 75px;
}

.des_content{
    text-align: center;
}

.head_text{
    width: 217px;
    margin: 0px auto;
    text-align: left;
    font-weight: bold;
}
.head_foot{
    font-size: 30px;
}

.head_title{
    font-size: 43px;
}

.middle_text{
    width: 570px;
    text-align: left;
    margin: 30px auto;
    font-size: 28px;
}

.foot_text{
    width: 440px;
    text-align: left;
    margin: 0px auto;
    font-size: 20px;
    color: #2e2e2e;
    padding-bottom: 30px;
    font-weight: lighter;
}

.result_image{
    opacity: 0;
    position: fixed;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
}
</style>
