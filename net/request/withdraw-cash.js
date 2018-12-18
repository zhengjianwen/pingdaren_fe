import Request from "@/js/utils/request.js"
import API from "../api.js"

//提现首页
export const getIndexInfo = (data) => {
    return Request({ data, url: API.withdrawCash.index, method: "get" })
}

//是否绑定微信
export const isBindwx = (data) => {
    return Request({ data, url: API.withdrawCash.isBindwx, method: "get" })
}

//提现详情
export const getDetail = (data) => {
    return Request({ data, url: API.withdrawCash.detail, method: "get" })
}

//提现记录
export const getRecord = (data) => {
    return Request({ data, url: API.withdrawCash.recordList, method: "get" })
}

//提现
export const withdraw = (data) => {
    return Request({ data, url: API.withdrawCash.withdraw, method: "get" })
}

