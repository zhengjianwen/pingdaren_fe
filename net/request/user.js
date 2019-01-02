import Request from "@/js/utils/request.js"
import API from "../api.js"

//用户详情
export const info = (data) => {
    return Request({ data, url: API.user.info, method: "get" })
}
//用户头像修改
export const photo = (data) => {
    return Request({ data, url: API.common.classify, method: "POST" })
}

//用户个人信息修改
export const update = (data) => {
    return Request({ data, url: API.common.user, method: "POST" })
}