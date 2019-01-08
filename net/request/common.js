import Request from "@/js/utils/request.js"
import RequestNew from "@/js/utils/request-new"
import API from "../api.js"

//获取token
export const getToken = (data) => {
    return RequestNew({ data, url: API.common.token, method: "POST" })
}
//校验登录信息
export const classify = (data) => {
    return Request({ data, url: API.common.classify, method: "get" })
}

//校验登录信息
export const user = (data) => {
    return Request({ data, url: API.common.user, method: "POST" })
}
//发送验证码
export const vc = (data) => {
    return RequestNew({ data, url: API.common.vc, method: "POST" })
}