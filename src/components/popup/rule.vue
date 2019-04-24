<template>
    <div class="rule_content">
        <div ref="rule_des" class="rule_des"></div>
        <!-- <div>
            <div class="sub_title">活动时间：3月23日-3月26日10:00-22:00</div>
            <div class="sub_title">活动地点：北京三里屯南区中庭广场 </div>
            <div class="sub_title">参与方式：</div>
            <div class="sub_title">
                <div><span class="special_point">1</span> 10:00-22:00，每个时段名额有限</div>
            </div>
            <div class="sub_title sub_more_margin">
                <div><span class="special_point">2</span>同一时段每个账号只可预约一次 <br/>一个账号不可同时预约多个时段</div>
            </div>
            <div class="sub_title sub_more_margin">
                <div><span class="special_point">3</span>预约成功后，持专属入场券在指定<br>时间段内验证入场即可（逾期自动作废）</div>
            </div>
        </div> -->
        <img class="rule_foot" src="static/assets/main/alert_title.png">
    </div>
</template>

<script>

import { mapState } from 'vuex';

export default {
    mounted() {
        const rule_des = this.preloader.getResult('rule_des');
        this.$refs.rule_des.appendChild(rule_des);
    },
    computed: {
        ...mapState(['preloader'])
    }
}
</script>


<style scoped>
.rule_content{
    overflow: hidden;
    width: 490px;
}

.rule_des{
    margin: 30px auto;
    width: 100%;
    text-align: center;
}

.rule_foot{
    margin-bottom: -50px;
    width: 102%;
}
</style>
