import Request from "@/js/utils/request.js"
import API from "../api.js"

export const allReceive = (data) => {
    return Request({ data, url: API.award.allReceive, method: "get" })
}

export const newReceive = (data) => {
    return Request({ data, url: API.award.newReceive, method: "get" })
}
export const validate = (data) => {
    return Request({ data, url: API.award.validate, method: "get" })
}

