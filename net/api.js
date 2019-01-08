let isProduction = process.env.NODE_ENV == "production";

//let host = "";
export let host = "https://m.pingdaren.cn";
if (isProduction == false) {
    host = "/webpack";
}

const API = {
    host: host,
    uploadHost: "https://img.dianzhangzhipin.com",
    common:{
        token:`${host}/api/token`,                              //获取token
        classify:`${host}/api/classify`,                        //评价列表接口
        user:`${host}/api/login/user`,                          //用户登录注册
        vc:`${host}/api/login/vc`,                              //登录短信发送
    },
    article: {
        list: `${host}/api/article/list`,                        //评价列表接口
        search: `${host}/api/article/seach`,                        //查询接口
        img: `${host}/api/article/upload/img`,                        //上传图片
        create: `${host}/api/article/create`,                        //创建文章
    },
    user:{
        info: `${host}/api/user/info`,                        //用户详情
        photo: `${host}/api/user/photo`,                      //用户头像修改
        update: `${host}/api/user/update`,                    //用户个人信息修改
    },
    comment:{
        create: `${host}/api/comment/create`,                        //添加评论
    }
    
};
export default API;

