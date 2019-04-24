import { baseUrl } from './env';
import axios from 'axios';


/*** 
 * 接口请求
 * 
 * @param url：请求的相对url地址 /test/test
 * @param method: 请求方法默认GET请求
 * @param params: 传递参数
 * */
export default function(url, method = 'GET', params = null) {
    // 拼接请求地址
    const urlPath = baseUrl + url;
    // 请求参数
    const item = params ? params : '';
    if (method === 'POST') {
        return axios.post(urlPath, item);
    } else if (method === 'GET') {
        return axios.get(urlPath, item);
    }
}