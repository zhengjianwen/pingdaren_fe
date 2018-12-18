
function seriesLoadScripts(scripts,callback) {
    if(typeof(scripts) != "object") var scripts = [scripts];
    const HEAD = document.getElementsByTagName("head").item(0) || document.documentElement;
    const s = new Array(),
          last = scripts.length - 1,
          recursiveLoad = i => {  //递归
              s[i] = document.createElement("script");
              s[i].setAttribute("type","text/javascript");
              s[i].onload = s[i].onreadystatechange = function() { //Attach handlers for all browsers
                  if(!/*@cc_on!@*/0 || this.readyState == "loaded" || this.readyState == "complete") {
                      this.onload = this.onreadystatechange = null; this.parentNode.removeChild(this); 
                      if(i != last) recursiveLoad(i + 1); else if(typeof(callback) == "function") callback();
                  }
              }
              s[i].setAttribute("src",scripts[i]);
              HEAD.appendChild(s[i]);
          };
    recursiveLoad(0);
 }
const browser={
	versions:(() => {
		const u = navigator.userAgent, app = navigator.appVersion;
		return {
			trident: u.indexOf('Trident') > -1, //IE内核
			presto: u.indexOf('Presto') > -1, //opera内核
			webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
			gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,//火狐内核
			mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
			ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
			android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, //android终端
			iPhone: u.indexOf('iPhone') > -1 , //是否为iPhone或者QQHD浏览器
			iPad: u.indexOf('iPad') > -1, //是否iPad
			webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
			weixin: u.indexOf('MicroMessenger') > -1, //是否微信 （2015-01-22新增）
			qq: u.match(/\sQQ/i) == " qq" //是否QQ
		};
	})(),
	language:(navigator.browserLanguage || navigator.language).toLowerCase()
};

export  const VerrifyCode = (ops) => {
   
    if (browser.versions.mobile) {
        mob(ops);
    }
    else {
        pc(ops);
    }
};

export const pc = (option) => {
    
    const __date = new Date(), timestamp = `${__date.getFullYear()}${__date.getMonth()}${__date.getDay()}`;
    seriesLoadScripts(`//g.alicdn.com/sd/ncpc/nc.js?t=${timestamp}`, () => {
      
        const nc_token = ["DZ_PC", (new Date()).getTime(), Math.random().toString(16)].join(':');
       
        const NC_Opt =
            {
                renderTo:option.id,
                appkey: option.appkey || "FFFF0N1N000000006DC1",
                scene: option.scene || "nc_login",
                token: nc_token,
                customWidth:  option.width,
                trans:{"position": "sign-sms"},
                elementID: ["sign-sms"],
                is_Opt: 0,
                language: "cn",
                isEnabled: true,
                timeout: 3000,
                times:5,
                apimap: { },
                callback(data) {
                    if(typeof(option.callback)=="function"){
                        option.callback(data)
                    }
                }
            };
        const nc = new noCaptcha(NC_Opt);
        nc.upLang('cn', {
            _startTEXT: "请按住滑块，拖动到最右边",
            _yesTEXT: "验证通过",
            _error300: "哎呀，出错了，点击<a href=\"javascript:__nc.reset()\">刷新</a>再来一次",
            _errorNetwork: "网络不给力，请<a href=\"javascript:__nc.reset()\">点击刷新</a>",
        })
    });
};

export const mob = (option) => {
    const __date = new Date(), timestamp = `${__date.getFullYear()}${__date.getMonth()}${__date.getDay()}`;
    seriesLoadScripts(`//g.alicdn.com/sd/nch5/index.js?t=${timestamp}`, () => {
        const nc_token = ["DZ_H5", (new Date()).getTime(), Math.random().toString(16)].join(':');
        const nc = NoCaptcha.init({
            renderTo:option.id,
            appkey: option.appkey || "FFFF0N1N000000006DC1",
            scene: "nc_login_h5",
            token: nc_token,
            customWidth: option.width,
            trans:{"position": "sign-h5"},
            elementID: ["sign-h5"],
            is_Opt: 0,
            language: "cn",
            timeout: 10000,
            retryTimes: 5,
            errorTimes: 5,
            inline:false,
            apimap: { },
            bannerHidden:false,
            initHidden:false,
            callback(data) {
                if(typeof(option.callback)=="function"){
                    let DATA=data
                    DATA.nc_token=nc_token
                    option.callback(DATA)
                }
                
            },
            error(s) {
            }
        });
        NoCaptcha.setEnabled(true);
        nc.reset();//请务必确保这里调用一次reset()方法
        NoCaptcha.upLang('cn', {
            'LOADING':"加载中...",//加载
            'SLIDER_LABEL': "请向右滑动验证",//等待滑动
            'CHECK_Y':"验证通过",//通过
            'CHECK_N':"验证未通过", //准备唤醒二次验证
        });

    });

};

export const codeReset = (option) => {
      console.log(this)
      VerrifyCode(option)
}