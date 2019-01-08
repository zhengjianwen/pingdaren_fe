import Qs from "qs";
import Axios from "axios";

// 添加一个请求拦截器

Axios.interceptors.request.use(function (config) {
    //console.log("request", config)

    if (config.method.toLowerCase() !== "get") {

        if (!config.data) {
            config.data = {};
        }

        config.data = Qs.stringify(config.data);
    }

    return config;
}, function (error) {
    return Promise.reject(error);
});

// 添加一个响应拦截器
Axios.interceptors.response.use(function (response) {
    //console.log("response", response)

    return response.data;
}, function (error) {
    return Promise.reject(error);
});

const Request = (opts = {}) => {

    opts = Object.assign(
        {
            url: "",
            method: "get",
            data: {},
            responseType: "json"
        },
        opts
    );

    var config = {
        url: opts.url,
        method: opts.method,
        responseType: opts.responseType
    }

    if (opts.method.toLowerCase() == "get") {
        config.params = opts.data
    } else {
        //Axios.defaults.headers.post['Content-Type']='application/json;charset=UTF-8';
        console.log(opts.data)

        config.data = opts.data
    }

    if (process.env.NODE_ENV !== "production") {
        //支持跨域获取cookie
        Axios.defaults.withCredentials=true;
    }
    console.log(config)
    return Axios(config);

}

export default Request;
