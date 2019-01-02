import Request from "@/js/utils/request.js"
import API from "../api.js"

//获取token
export const getToken = (data) => {
    return Request({ data, url: API.common.token, method: "POST" })
}
//校验登录信息
export const classify = (data) => {
    return Request({ data, url: API.common.classify, method: "get" })
}

//校验登录信息
export const user = (data) => {
    return Request({ data, url: API.common.user, method: "POST" })
}
//校验登录信息
export const vc = (data) => {
    return Request({ data, url: API.common.vc, method: "POST" })
}