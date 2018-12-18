const common = {
    html: {
        encode: function (str) {
            if (!str) return "";
            var s = str.replace(/&/g, "&amp;");
            s = s.replace(/</g, "&lt;");
            s = s.replace(/>/g, "&gt;");
            s = s.replace(/ /g, "&nbsp;");
            s = s.replace(/\'/g, "&#39;");
            s = s.replace(/\"/g, "&quot;");
            return s;
        },
        decode: function (str) {
            if (!str) return "";
            var s = str.replace(/&amp;/g, "&");
            s = s.replace(/&lt;/g, "<");
            s = s.replace(/&gt;/g, ">");
            s = s.replace(/&nbsp;/g, " ");
            s = s.replace(/&#39;/g, "\'");
            s = s.replace(/&quot;/g, "\"");
            return s;
        }
    }
    , url: {
        //generateUrl: function (sUrl, oParam) {
        //    if (!oParam) {
        //        return sUrl;
        //    } else {
        //        return sUrl + (sUrl.indexOf('?') == -1 ? '?' : '&') + $.param(oParam);
        //    }
        //},
        //redirectReplace: function (sUrl, oParam) {
        //    location.replace(this.generateUrl(sUrl, oParam));
        //},
        //redirectBlank: function (sUrl, oParam) {
        //    return window.open(this.generateUrl(sUrl, oParam), "_blank");
        //},
        //redirect: function (sUrl, oParam) {
        //    location.href = this.generateUrl(sUrl, oParam);
        //},
        //delayRedirect: function (sUrl, nTime, oParams) {
        //    return vwbase.delay(function () {
        //        vwbase.url.redirect(sUrl, oParams);
        //    }, nTime)
        //},
        //delayRedirectReplace: function (sUrl, nTime, oParams) {
        //    return vwbase.delay(function () {
        //        vwbase.url.redirectReplace(sUrl, oParams);
        //    }, nTime)
        //}
    }
    , storage: {
        support: function () {
            return "localStorage" in window && window['localStorage'] !== null;
        },
        get: function (sKey) {
            if (this.support()) {
                try {
                    return localStorage.getItem(sKey);
                } catch (e) {
                    return "";
                }
            } else {
                return "";
            }
        },
        set: function (sKey, sVal) {
            if (this.support()) {
                try {
                    localStorage.setItem(sKey, sVal);
                    return true;
                } catch (e) {
                    return false;
                }
            } else {
                return false;
            }
        },
        remove: function (key) {
            try {
                localStorage.removeItem(key);
                return true;
            } catch (e) {
                return false;
            }
        }
    }
    , regexp: {
        mobile: /^1[3-9]\d{9}$/,
        chinamobile: /^[1][3-8]\d{9}$|^([6|9])\d{7}$|^[0][9]\d{8}$|^[6]([8|6])\d{5}$/,
        mainlandMobile: /^((\+86)|(86))?[1][3-8]\d{9}$/,
        internationalPhone: /^((([\(\（]\+?\d{2,6}[\)\）])|(\+?\d{2,6}))-?)?(([\(\（]\d{6,12}[\)\）])|(\d{6,12}))$/,
        email: /^[\w\+\-]+(\.[\w\+\-]+)*@[a-z\d\-]+(\.[a-z\d\-]+)*\.([a-z]{2,4})$/i,
        numlen6: /^\d{6}$/,
        password: /^[\x21-\x7E]{6,50}$/,
        name: /^[\u4e00-\u9fa50-9a-zA-Z \.]{1,20}$/,
        postcode: /^\d{6}$/,
        address: /^.{1,80}$/,
        //address: /^([\u4E00-\u9FA50-9a-zA-Z_() （）#-]){1,100}$/,
        remark: /^.{1,200}$/,
        company: /^[\u4E00-\u9FA50-9a-zA-Z_()（）#-]{1,50}$/,
        couponcode: /^[0-9a-zA-Z]{6,12}$/
    }
    , date: {
        format: function (date, fmt) {
            if (typeof fmt === 'undefined') {
                fmt = date;
                date = new Date();
            }
            var o = {
                "M+": date.getMonth() + 1, //月份
                "d+": date.getDate(), //日
                "h+": date.getHours(), //小时
                "m+": date.getMinutes(), //分
                "s+": date.getSeconds(), //秒
                "q+": Math.floor((date.getMonth() + 3) / 3), //季度
                "S": date.getMilliseconds() //毫秒
            };
            if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
            for (var k in o)
                if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            return fmt;
        }
    }
    , cookie: {
        get: function (name) {
            var arg = name + "=";
            var alen = arg.length;
            var clen = document.cookie.length;
            var i = 0;
            while (i < clen) {
                var j = i + alen;
                if (document.cookie.substring(i, j) == arg) {
                    var endstr = document.cookie.indexOf(";", j);
                    if (endstr == -1) {
                        endstr = document.cookie.length;
                    }
                    return decodeURIComponent(document.cookie.substring(j, endstr));
                }
                i = document.cookie.indexOf(" ", i) + 1;
                if (i == 0) break;
            }
            return "";
        },
        set: function (name, value, expires, path, domain, secure) {
            if (typeof expires === 'number') {
                var minutes = expires;
                expires = new Date();
                expires.setMinutes(expires.getMinutes() + minutes);
            }

            if (expires instanceof Date) {
                expires = expires.toUTCString()
            }

            document.cookie = name + "=" + encodeURIComponent(value) +
                ((expires) ? "; expires=" + expires : "") +
                ((path) ? "; path=" + path : "") +
                ((domain) ? "; domain=" + domain : "") +
                ((secure) ? "; secure" : "");
        },
        del: function (name, path, domain) {
            if (this.get(name)) {
                document.cookie = name + "=" +
                    ((path) ? "; path=" + path : "") +
                    ((domain) ? "; domain=" + domain : "") +
                    "; expires=Thu, 31 Jan 1980 16:00:00 GMT";
            }
        }
    }
    , env: {
        online: process.env.NODE_ENV == "production"
        , test: process.env.NODE_ENV == "test"
        , dev: process.env.NODE_ENV == "development"
        , app: navigator.userAgent.toLowerCase().indexOf("shopzhipin") > -1
        , wechat: navigator.userAgent.toLowerCase().indexOf("micromessenger") > -1
    }
    , statistics: {
        setInput: function (pageKey = "") {
            var eHiddenInput = document.getElementById("page_key_name");
            if (!eHiddenInput) {
                eHiddenInput = document.createElement("input");
                eHiddenInput.type = "hidden";
                eHiddenInput.id = "page_key_name";
                document.body.appendChild(eHiddenInput);
            }

            eHiddenInput.value = pageKey;
        }
        , sendPage: function (pageKey) {
            this.setInput(pageKey);

            if (_T && _T.sendPageView) {
                _T.sendPageView();
            }
        }
        , sendEvent: function (param) {
            //param={eventName, pageKey, p1, p2, p3}
            if (!param) {
                return;
            }

            if (typeof param != "object") {
                param = { eventName: param }
            }
            if (param.pageKey) {
                this.setInput(param.pageKey);
            }

            if (param.p1) {
                param.p1 = param.p1.toString()
            }
            if (param.p2) {
                param.p2 = param.p2.toString()
            }
            if (param.p3) {
                param.p3 = param.p3.toString()
            }

            if (_T && _T.sendEvent) {
                _T.sendEvent(param.eventName, param.p1, param.p2, param.p3);
            }
        }
    }
};

module.exports = common;