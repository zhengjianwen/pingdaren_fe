let isProduction = process.env.NODE_ENV == "production";

let host = "";

if (isProduction == false) {
    host = "/api";
}

const API = {
    host: host,
    uploadHost: "https://img.dianzhangzhipin.com",
    common: {
        auth: `${host}/fontpage/login/auth`,                        //校验登录信息
    },
    wxlogin:{
        getCode: `${host}/smsActiveCode/sendCode.json`,//校验登录信息
        bindWx : `${host}/wxact/bind/validate`,                      
    },
    withdrawCash: {
        index: `${host}/cash/index.json`,//提现首页
        isBindwx: `${host}/cash/checkBindWeixin.json`,//检查是否绑定微信
        detail: `${host}/cash/withdrawDetail.json`,//提现详情
        recordList: `${host}/cash/withdrawRecord.json`,//提现记录
        withdraw: `${host}/cash/withdraw.json`,//提现
    },
    award:{
        allReceive:`${host}/coupon/allreceive`,//新老用户领取优惠券接口
        newReceive:`${host}/coupon/newreceive`,//新用户领取优惠券
        validate:`${host}/smsActiveCode/validate.json`,//新用户领取优惠券
    },
    credit:{
        info:`${host}/credit/score/info`,//店长信用分雷达图
    }
    
};
export default API;

