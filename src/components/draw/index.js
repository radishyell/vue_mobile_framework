

/** 
 * 绘制画布开启动画
 * @param canvasId 画布id (必须)
 * @param imageList 图片循环列表（必须）
 * @param isLoop 是否循环播放
 * @param width 画布宽度
 * @param height 画布高度
 * @param frame 动画帧数(帧/秒)
 */

export default {
    install() {

        // if (!canvasId || !imageList.length) { return; }
        // // 获取到画布
        // const canvas = document.getElementById(canvasId);
        // if (!canvas) { return; }
        // canvas.width = width;
        // canvas.height = height;
        // const ctx = canvas.getContext('2d');
        // ctx.drawImage(imageList[0], 0, -4, width, height);
        // var frameIndex = 0;
        // const timer = setInterval(function() {
        //     ctx.drawImage(imageList[frameIndex], 0, -4, width, height);
        //     frameIndex++;
        //     if (frameIndex == imageList.length) {
        //         if (typeof callbackFn === 'function') {
        //             const result = callbackFn();
        //             if (result === false) {
        //                 clearInterval(timer);
        //                 return;
        //             }
        //         }
        //         if (isLoop) {
        //             frameIndex = 0;
        //         } else {
        //             clearInterval(timer);
        //         }
        //     }
        // }, 1000 / frame);
    }
}