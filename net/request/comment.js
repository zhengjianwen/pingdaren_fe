import Request from "@/js/utils/request.js"
import API from "../api.js"

//用户详情
export const createComment = (data) => {
    return Request({ data, url: API.comment.create, method: "POST" })
};
