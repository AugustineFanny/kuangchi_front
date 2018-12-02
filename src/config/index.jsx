/**
 * http配置
 */
import axios from 'axios'
import { Toast } from 'antd-mobile'
// 超时时间
axios.defaults.timeout = 5000
// http请求拦截器
Toast.loading('Loading...', 0);
function hideLoading(){
    setInterval(()=>{
        Toast.hide();
    },1500)
}
axios.interceptors.request.use(config => {
    hideLoading();
    return config
}, error => {
    hideLoading();
    Toast.fail('Load failed !!!', 1)
    return Promise.reject(error)
})
// http响应拦截器
axios.interceptors.response.use(data => {// 响应成功关闭loading
    hideLoading();
    return data
}, error => {
    hideLoading();
    Toast.fail('Load failed !!!', 1)
    return Promise.reject(error)
})
 
export default axios