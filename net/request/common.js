import Request from "@/js/utils/request.js"
import API from "../api.js"

//校验登录信息
export const checkAuth = (data) => {
    return Request({ data, url: API.common.auth, method: "get" })
}
