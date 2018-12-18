import Request from "@/js/utils/request.js"
import API from "../api.js"

export const info = (data) => {
    return Request({ data, url: API.credit.info, method: "get" })
};

