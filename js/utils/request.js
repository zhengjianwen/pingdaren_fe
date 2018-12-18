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
        config.data = opts.data
    }

    return Axios(config);

}

export default Request;
