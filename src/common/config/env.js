/**
 * 配置编译环境和线上环境之间的切换
 * 
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * imgBaseUrl: 图片所在域名地址
 * 
 */


// 接口基础请求地址
var baseUrl = '';

/** 
 * hash模式url地址后面会带有 /#/
 * history可以去除 # 不过需要后端的配合
 * 
 */
var routerMode = 'hash';

// 预留图片拼接地址
var imgBaseUrl = '';


if (process.env.NODE_ENV == 'development') {
    baseUrl = 'https://api.weibo.com/2'
} else if (process.env.NODE_ENV == 'production') {
    baseUrl = '';
}

export {
    baseUrl,
    routerMode,
    imgBaseUrl,
}