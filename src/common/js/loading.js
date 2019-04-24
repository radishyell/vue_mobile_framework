export function manifest() {
    // 图片加载列表
    var list = [];
    list.push({
        id: 'bg',
        src: 'static/assets/bg.jpg'
    });

    // 主页面

    list.push({
        id: 'main_title',
        src: 'static/assets/main/main_title.png'
    });

    list.push({
        id: 'rule_des',
        src: 'static/assets/main/rule_des.png'
    });

    // 首页序列帧动画
    for (var i = 1; i < 32; i++) {
        list.push({
            id: `main_gif${i}`,
            src: `static/assets/main/main_gif/${i}.jpg`
        })
    }

    list.push({
        id: 'alert_title',
        src: 'static/assets/main/alert_title.png'
    });

    list.push({
        id: 'alert_close',
        src: 'static/assets/main/alert_close.png'
    });

    // 预约页面

    // list.push({
    //     id: 'reserve_title',
    //     src: 'static/assets/reserve/reserve_title.gif'
    // });

    for (var i = 1; i < 24; i++) {
        list.push({
            id: `reserve_title${i}`,
            src: `static/assets/reserve/title/${i}.jpg`,
        });
    }

    // 成功页面

    list.push({
        id: 'success_bg',
        src: 'static/assets/success/success_bg.jpg'
    });

    list.push({
        id: 'success_title',
        src: 'static/assets/success/success_title.png'
    });

    return list;
}