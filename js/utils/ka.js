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
          recursiveLoad(0)
 }
 seriesLoadScripts("//img.dianzhangzhipin.com/source/js/analytics.min.js?v=20171116",function(){
    seriesLoadScripts("//img.dianzhangzhipin.com/source/js/ka.js?v=20171114",function(){
        function is_weixin(){
            var ua = navigator.userAgent.toLowerCase();
            if(ua.match(/MicroMessenger/i)=="micromessenger") {
                return true;
            } else {
                return false;
            }
        }
        function get_share_datas_from_html_inapp() {
            var shid = "shdefault";
            var urlShid = getQueryString('shid');
            var urlSid = getQueryString('sid');
            if (urlShid) {
                shid = urlShid;
            } else if (urlSid) {
                shid = urlSid;
            }
            var pk = "pkdefault";
            var pp = "ppdefault";
            var pkn = document.getElementById("page_key_name");
            if (pkn) {
                var pknVal = pkn.value;
                if (pknVal) {
                    var pkArray = pknVal.split("|")
                    if (pkArray.length == 1) {
                        pk = pkArray[0];
                    } else if (pkArray.length >= 2) {
                        pk = pkArray[0];
                        pp = pkArray[1];
                    }
                }
            }
            var ret = new Array();
            ret['shid'] = shid;
            ret['pk'] = pk;
            ret['pp'] = pp;
            return ret;
        }
        function getQueryString(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return unescape(r[2]);
            return null;
        }
     
    })
 })
  