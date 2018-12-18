import Qs from "qs";
import Axios from "axios";
const getCookie = function (_name) {
    var cookies = document.cookie,
        pos = cookies.indexOf(_name + '='),
        value = "";

    if (pos > -1) {
        var start = pos + _name.length + 1;
        var end = cookies.indexOf(';', start);
        //最后一个
        if (end === -1) { end = cookies.length; }
        value = cookies.substring(start, end);
        value = decodeURIComponent(value);
    }

    return value;
}
function getXtoken(){
   return new Promise((resolve, reject) => {
        axios.get('/token/register')
        .then(function (response) {
            resolve(response)
        })
   })
}
 // 添加一个请求拦截器
Axios.interceptors.request.use(function (config) {
    //console.log("request", config)
    if (config.method.toLowerCase() == "get") {

        if (!config.params) {
            config.params = {};
        }
       

    } else {
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
    return getXtoken().then(res=>{
        console.log()
        opts = Object.assign(
            {
                url: "",
                method: "get",
                data: {
                   
                },
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
            config.params.def_wt =getCookie("def_wt") ;
        } else {
            config.data = opts.data
            config.data.def_wt = getCookie("def_wt");
        }
       return Axios(config);
    })

    

}

export default Request;
