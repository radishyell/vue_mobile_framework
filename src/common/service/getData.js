import fetch from '../config/fetch';

/**
 * 接口请求地址
 */




// 获取首页列表
export const fetchHomeList = () => fetch('/statuses/home_timeline.json', 'GET', params);