import Request from "@/js/utils/request.js"
import API from "../api.js"

//获取手机验证码
export const getPhoneCode = (data) => {
    return Request({ data, url: API.wxlogin.getCode, method: "get" })
}
//提交表单
export const bindWx = (data) => {
    return Request({ data, url: API.wxlogin.bindWx, method: "POST" })
}
