<template>
    <div class="content">
        <div class="reserve_head">
            <div class="reserve_content">
                <div class="reserve_title" ref="reserve_title">
                    <!-- <img src="../assets/reserve/reserve_title.gif"> -->
                    <canvas id="reserve_title"></canvas>
                </div>
                <div class="time_content">
                    <div class="single">
                        <div>预约日期</div>
                        <div class="right" @click="showDatePicker">
                            <div v-text="pickerConfig.showDate ? pickerConfig.showDate : '请选择'"></div>
                            <img src="static/assets/reserve/line.png">
                        </div>
                    </div>

                    <!-- 预约时间 -->
                    <div class="single time_btn_margin">
                        <div>预约时间</div>
                        <div class="right" @click="showTimePicker">
                            <div v-text="pickerConfig.showTime ? pickerConfig.showTime : '请选择'"></div>
                            <img src="static/assets/reserve/line.png">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="normal_btn foot_margin" @click="confirmReserve">确认</div>

        <!-- picker卡槽 -->
        <div @touchmove.prevent v-show="pickerConfig.popupVisible" class="overlayer" @click="cancel">
            <div class="picker_content">
                <div class="picker_header">
                    <span class="cancel" @click.stop="cancel">取消</span>
                    <span class="confrim" @click.stop="confirm">确认</span>
                </div>
                <mt-picker ref="picker" :slots="slots" @change="onValuesChange"  :itemHeight="100" :visibleItemCount="3" value-key="date"></mt-picker>
            </div>
        </div>
    </div>
</template>

<script>

import { mapActions, mapState } from 'vuex';
import { popupType } from '../common/js/enum.js';
import { Picker, Popup, Toast } from "mint-ui";

export default {
    data () {
        return {
            // 卡槽配置
            pickerConfig: {
                popupVisible: false, //是否显示picker
                type: 0, //0 代表当前在日期  1 代表当前在时间
                orginDate: null, //日期源数据
                orginTime: null, //时间源数据
                selectDate: null, //当前滚动选择中的日期
                selectTime: null, //当前滚动选择中的时间
                showDate: null, //当前选中的日期 --- 在页面显示
                showTime: null, //当前选中的时间 --- 在页面显示
            },
            // 卡槽数据
            slots: [{
                defaultIndex: 0,
                flex: 1,
                values: [],
                className: "slot1",
                textAlign: "center"
            }]
        }
    },
    mounted() {
        // 设置预约gif动图
        this.showAnimate();
        // 设置数据源
        if (!this.orginReserveTimeList || !this.orginReserveTimeList.length) {
            // 没有预约源数据
            this.getReserveTime().then(()=>{
                this.resetDefault();
            });
        } else {
            // 设置预约源数据
            this.resetDefault();
        }
    },
    methods: {
        ...mapActions(['setAlert', 'getReserveTime', 'updateRerverInfo']),
        resetDefault() {
            this.pickerConfig.orginDate = this.orginReserveTimeList;
            // 设置用户预约时间段
            this.pickerConfig.showDate = this.reserveInfo.reserveDate;
            this.pickerConfig.showTime = this.reserveInfo.reserveTime;
            // 如果有时间段，找到该时间段的数据
            if (this.pickerConfig.showDate && this.pickerConfig.showTime) {
                for (var i = 0; i < this.pickerConfig.orginDate.length; i++) {
                    // 找到日期
                    if (this.pickerConfig.orginDate[i].date == this.pickerConfig.showDate) {
                        this.pickerConfig.selectDate = this.pickerConfig.orginDate[i];
                        break;
                    }
                }
            }
        },
        showAnimate() {
            // 显示预约的头部动画
            var imageArray = []
            for (var i = 1; i < 24; i++) {
                const image = this.preloader.getResult(`reserve_title${i}`);
                imageArray.push(image);
            }
            const canvas = document.getElementById("reserve_title");
            const width = 673;
            const height = 362;
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
            }, 30);
        },
        confirmReserve() {
            if (this.pickerConfig.showTime) {
                ga('Truemetrics.send', 'event', 'LRL INK预约','MO','confirm');
                if (this.pickerConfig.showDate == this.reserveInfo.reserveDate && this.pickerConfig.showTime == this.reserveInfo.reserveTime) {
                    // 与上次的预约时间段一样 直接显示弹窗
                    this.setAlert({
                        type: popupType.successType, 
                        isShow: true,
                        des: {
                            title: '预约失败',
                            subTitle: '您已经预约过该时间段<br/>马上去查看吧！'
                        }
                    });
                    return;
                }
                this.updateRerverInfo({ "ReserveDate": this.pickerConfig.showDate, "ReserveDailyTime": this.pickerConfig.showTime }).then((result) => {
                    var subTitle = '';
                    var type = '';
                    if (result.ErrCode == 10000) {
                        // 预约成功
                        type = popupType.successType;
                        subTitle = '您已经成功预约<br/>马上去查看吧！';
                    } else  {
                        // 预约失败 10005 已经预约过
                        type = result.ErrCode == 10005 ? popupType.successType : popupType.failType;
                        subTitle = result.ErrMsg ? result.ErrMsg : '预约失败，请重试';
                    }
                    this.setAlert({
                        type: type, 
                        isShow: true,
                        des: {
                            title: result.ErrCode == 10000 ? '预约成功' : '预约失败',
                            subTitle: subTitle
                        }
                    });
                });
            } else {
                // 未选择日期
                Toast(`请选择日期`);
            }
        },
        // 显示日期
        showDatePicker() {
            // 获取索引
            var defaultIndex = 0;
            if (this.pickerConfig.showDate) {
                for (var i = 0; i < this.pickerConfig.orginDate.length; i++) {
                    if (this.pickerConfig.orginDate[i].date == this.pickerConfig.showDate) {
                        defaultIndex = i;
                        break;
                    }
                }
            }
            this.showPicker(0, this.pickerConfig.orginDate, defaultIndex);
        },
        // 显示时间
        showTimePicker() {
            // 获取索引
            var defaultIndex = 0;
            if (this.pickerConfig.showTime) {
                for (var i = 0; i < this.pickerConfig.selectDate.TimeList.length; i++) {
                    if (this.pickerConfig.selectDate.TimeList[i].date == this.pickerConfig.showTime) {
                        defaultIndex = i;
                        break;
                    }
                }
            } 
            this.showPicker(1, this.pickerConfig.selectDate.TimeList, defaultIndex);
        },
        showPicker(type, params, index = 0) {
            // 清空卡槽
            this.slots[0].values = [];
            // 显示弹窗
            this.pickerConfig.type = type;
            this.pickerConfig.popupVisible = true;
            // 设置卡槽
            this.slots[0].values = params;
            this.slots[0].defaultIndex = index;
        },
        onValuesChange(picker, values){
            if (this.pickerConfig.type == 0) {
                // 改变当前选择日期
                this.pickerConfig.selectDate = values[0];
            } else {
                // 改变当前选择时间
                this.pickerConfig.selectTime = values[0];
            }
        },
        cancel() {
            this.pickerConfig.popupVisible = false;
        },
        confirm() {
            if (this.pickerConfig.type == 0) {
                // 重置预约日期
                this.pickerConfig.showDate = this.pickerConfig.selectDate.date;
                this.pickerConfig.showTime = null;
            } else {
                // 重置预约时间
                this.pickerConfig.showTime = this.pickerConfig.selectTime.date;
            }
            this.pickerConfig.popupVisible = false;
        }
    },
    computed: {
        ...mapState(['reserveInfo', 'preloader', 'orginReserveTimeList'])
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
    flex-direction: column;
}

.reserve_head{
    margin: 0px auto;
    width: 673px;
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
}
.reserve_content{
    background: white;
}


.reserve_title{
    width: 100%;
}

.time_content{
    font-size: 30px;
}
.single {
    margin-top: 50px;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}
.right{
    margin-left: 20px;
}
.right div{
    width: 355px;
    text-align: center;
    margin-bottom: -25px;
}
.time_btn_margin{
    padding-bottom: 70px;
}


/** picker*/

.overlayer {
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0px;
    top: 0px;
    background: rgba(0, 0, 0, 0.9);
}


.picker_content {
    position: absolute;
    bottom: 0px;
    left: 0px;
    background: white;
    width: 750px;
}
.picker_header {
    width: 100%;
    border-bottom: 1px solid gray;
}

.picker_content span {
    line-height: 80px;
    font-size: 30px;
    margin: 0px 30px;
    color: #ff000b;
}
.confrim {
    float: right;
}


</style>
