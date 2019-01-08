import Request from "@/js/utils/request.js"
import API,{host} from "../api.js"

//获取评价列表
export const list = (data) => {
    return Request({ data, url: API.article.list, method: "get" })
};
//模糊查询
export const search = (data) => {
    return Request({ data, url: API.article.search, method: "get" })
};
//评价详情查询
export const info = (data,aid) => {
    return Request({ data, url:`${host}/api/article/${aid}/info` , method: "get" })
};
//上传图片
export const img = (data) => {
    return Request({ data, url:API.article.img , method: "POST" })
};
//上传图片
export const create = (data) => {
    return Request({ data, url:API.article.create , method: "POST" })
};