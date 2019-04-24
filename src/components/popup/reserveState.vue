<template>
    <div class="content">
        <div ref="alert_title">
            <!-- <img src="static/assets/main/alert_title.png"> -->
        </div>
        <div class="title" v-html="alertConig.des.title"></div>
        <div class="sub_title" v-html="alertConig.des.subTitle"></div>
        <div class="foot">
            <div v-if="alertConig.type == popupType.successType">
                <div class="normal_btn" @click="showSuccess">查看我的预约</div>
            </div>
            <div v-else>
                <div class="normal_btn" @click="showReserve">重新预约</div>
            </div>
        </div>
    </div>
</template>


<script>

import { mapActions, mapState } from 'vuex';
import { popupType, mainType } from '../../common/js/enum.js';

export default {
    data () {
        return {
            popupType: popupType
        }
    },
    mounted() {

        const alert_title = this.preloader.getResult('alert_title');
        this.$refs.alert_title.appendChild(alert_title);
    },
    methods: {
        ...mapActions(['setPageType', 'setAlert']),
        // 查看我的预约
        showSuccess() {
            this.showPage(true);
        },
        // 重新预约
        showReserve() {
            this.showPage(false);
        },
        showPage(params){
            const type = params ? mainType.successType : mainType.reserveType;
            this.setPageType(type);
            this.setAlert({
                type: this.alertConig.type,
                isShow: false,
                des: this.alertConig.des
            });
        }
    },
    computed: {
        ...mapState(['alertConig', 'preloader'])
    }
}
</script>


<style scoped>
.content{
    width: 490px;
    overflow: hidden;
}

.title{
    font-size: 47px;
    font-weight: bold;
    text-align: center;
}
.sub_title{
    font-size: 30px;
    text-align: center;
    margin: 40px auto;
}

.foot{
    margin-bottom: 40px;
}
</style>
