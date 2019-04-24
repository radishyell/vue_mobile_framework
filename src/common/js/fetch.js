import { Indicator } from 'mint-ui';



// 接口域名
export function domainUrl() {
    if (process.env.NODE_ENV == 'production') {
        return './';
    } else {
        return 'api/';
    }
}


export function fetch(params) {
    return new Promise((resolve, reject) => {
        Indicator.open({
            text: '加载中...',
            spinnerType: 'fading-circle'
        });
        $.ajax({
            type: params.method,
            url: params.url,
            cache: false,
            dataType: 'json',
            // timeout: 3000, //超时时间设置，单位毫秒
            data: params.params,
            success: function(data) {
                Indicator.close();
                resolve(data);
            },
            error: function(xhr, textStatus, errorThrown) {
                Indicator.close();
                console.log('请求失败' + textStatus);
                reject();
            },
            complete: function(XMLHttpRequest, textStatus) {}
        });
    })
}


// 显示和关闭菊花
export function ShowIndicator() {
    CloseIndicator();
    Indicator.open({ text: '加载中...', spinnerType: 'fading-circle' });
}
export function CloseIndicator() {
    Indicator.close();
}



// 获取jwt地址
export function fetchJwtUrl() {
    return `${domainUrl()}InkPopup/GetJwtByCode`;
}

// 获取用户会员信息
export const fetchUserMemberInfo = () => fetch({
    'url': `${domainUrl()}InkPopup/CheckCustomer`,
    'method': 'post'
});

// 获取用户预约信息
export const fetchUserReserveInfo = () => fetch({
    'url': `${domainUrl()}InkPopup/GetReserveByOpenid`,
    'method': 'post'
});


// 用户提交预约信息  "ReserveDate":"2019-03-23","ReserveDailyTime":"10:00-11:00"
export const submitUserReserveInfo = (params) => fetch({
    'url': `${domainUrl()}InkPopup/AddMemberReserve`,
    'method': 'post',
    'params': params
});

// 修改预约信息
export const updateUserReserveInfo = (params) => fetch({
    'url': `${domainUrl()}InkPopup/UpdateMemberReserve`,
    'method': 'post',
    'params': params
});

// 获取时间段
export const fetchReserveTime = () => fetch({
    'url': `${domainUrl()}InkPopup/GetReserveDate`,
    'method': 'post'
});