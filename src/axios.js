// 配置前置拦截
import axios from "axios"
import Element from "element-ui";
import router from "@/router";
import store from './store'

axios.defaults.baseURL = "http://localhost:8081"

// 前置拦截
axios.interceptors.request.use(config => {
    return config;
})

axios.interceptors.response.use(
    response => {
        let res = response.data;
        if (res.code === 200){
            return response;
        } else{
            // 请求成功，后端未抛出异常，但状态码异常
            Element.Message.error(res.msg, {duration: 3 * 1000}); // 弹窗三秒自动消失
            return Promise.reject(response.data.message); // 请求结束，不会进入axios.then()逻辑
        }
    },
    // 后端直接抛出异常,此时请求异常
    error => {
        console.log(error)
        if (error.response.status === 401){
            // 出现ShiroException，清空state,跳转login页面
            store.commit("REMOVE_INFO");
            router.push("/login");
        }
        Element.Message.error(error.response.data.msg, {duration: 3 * 1000});
        return Promise.reject(error);
    }
)