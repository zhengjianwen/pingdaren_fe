/**
 * @author [jiadangwei]
 * @email [jiadangwei@kanzhun.com]
 * @create date 2018-09-08 10:36:22
 * @modify date 2018-09-08 10:36:22
 * @desc [微信分享]
 * 使用方法参数初始化
 * import {wxInit,wxShare,is_weixin} from "@/js/utils/weixin";
 *  if(is_weixin()){
        wxInit({
            Data_shareTitle:"店长直聘“比心大战”火热报名中，快来参加现金大奖",
            Data_descContent:"你有比心创意么？来店长直聘“比心大战”夺冠军获3000元现金大奖",
            Data_imgUrl:"https://dianzhangm.zhipin.com/zt/20180303/images/home/111.jpg",
            Data_lineLink:"https://dianzhangm.zhipin.com/activity/model/home"
        })
    }
*/
export  function is_weixin(e){
    var ua = navigator.userAgent.toLowerCase();  
         if(ua.match(/MicroMessenger/i)=="micromessenger") {  
             return true;  
         } else {  
             return false;  
             
         }  
 }
export function wxInit(e){
       axios.get("https://dianzhangm.zhipin.com/weixin/share.json?url=" + encodeURIComponent(window.location.href))
              .then(function (data) {
                 　　wx.config({
                     debug: false,
                     appId: data.wxAppId,
                     timestamp: data.wxSignMap.timestamp,
                     nonceStr:  data.wxSignMap.nonceStr,
                     signature: data.wxSignMap.signature,
                     jsApiList: ['checkJsApi', 'onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ'
                         , 'onMenuShareWeibo', 'hideMenuItems', 'showMenuItems', 'hideAllNonBaseMenuItem', 'showAllNonBaseMenuItem'
                         , 'translateVoice', 'startRecord', 'stopRecord', 'onRecordEnd', 'playVoice', 'pauseVoice', 'stopVoice'
                         , 'uploadVoice', 'downloadVoice', 'chooseImage', 'previewImage', 'uploadImage', 'downloadImage', 'getNetworkType'
                         , 'openLocation', 'getLocation', 'hideOptionMenu', 'showOptionMenu', 'closeWindow', 'scanQRCode', 'chooseWXPay'
                         , 'openProductSpecificView', 'addCard', 'chooseCard', 'openCard'] // 必填，需要使用的JS接口
                 });
                 wx.ready(function () {
                    wxShare(e)
                 })
             }).catch(function (error) {
                wxShare(e)
                 alert("微信授权异常:"+error)
             });
  
 }
export  function wxShare(e){
       var Data_shareTitle=e.Data_shareTitle
       var Data_descContent=e.Data_descContent
       var Data_imgUrl=e.Data_imgUrl
       var Data_lineLink=e.Data_lineLink
       shareText()
       function setShareContent() {
                   wx.onMenuShareTimeline({
                       title: (typeof timelineTitle == "string" ? timelineTitle : shareTitle), // 分享标题
                       link: lineLink, // 分享链接
                       imgUrl: imgUrl, // 分享图标
                       success: function () {
                           if (window._T) {
                               _T.sendEvent('wx-share-timeline-success');
                           }
                           //成功分享回调
                           if (window.shareSuccessCallback) {
                               window.shareSuccessCallback();
                               return;
                           }
                           // 用户确认分享后执行的回调函数
                           if (window.shareCallback) {
                               window.shareCallback();
                               return;
                           }
                           if (window.redirectUrl) {
                               window.location.href = window.redirectUrl;
                           }
                       },
                       cancel: function () {
                           if (window._T) {
                               _T.sendEvent('wx-share-timeline-cancel');
                           }
                           //取消分享回调
                           if (window.shareCancleCallback) {
                               window.shareCancleCallback();
                               return;
                           }
                           // 用户取消分享后执行的回调函数
                           if (window.shareCallback) {
                               //window.shareCallback();
                               return;
                           }
                           if (window.redirectUrl) {
                               window.location.href = window.redirectUrl;
                           }
                       }
                   });
 
                   wx.onMenuShareAppMessage({
                       title: shareTitle, // 分享标题
                       desc: descContent, // 分享描述
                       link: lineLink, // 分享链接
                       imgUrl: imgUrl, // 分享图标
                       type: '', // 分享类型,music、video或link，不填默认为link
                       dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                       success: function () {
                           // 用户确认分享后执行的回调函数
                           if (window._T) {
                               _T.sendEvent('wx-share-friend-success');
                           }
                           //成功分享回调
                           if (window.shareSuccessCallback) {
                               window.shareSuccessCallback();
                               return;
                           }
                           if (window.shareCallback) {
                               window.shareCallback();
                               return;
                           }
                           if (window.redirectUrl) {
                               window.location.href = window.redirectUrl;
                           }
                       },
                       cancel: function () {
                           // 用户取消分享后执行的回调函数
                           if (window._T) {
                               _T.sendEvent('wx-share-friend-cancel');
                           }
                           //取消分享回调
                           if (window.shareCancleCallback) {
                               window.shareCancleCallback();
                               return;
                           }
                           // 用户确认分享后执行的回调函数
                           if (window.shareCallback) {
                               window.shareCallback();
                               return;
                           }
 
                           if (window.redirectUrl) {
                               window.location.href = window.redirectUrl;
                           }
                       }
                   });
 
                   wx.onMenuShareQQ({
                       title: shareTitle, // 分享标题
                       desc: descContent, // 分享描述
                       link: lineLink, // 分享链接
                       imgUrl: imgUrl, // 分享图标
                       success: function () {
                           // 用户确认分享后执行的回调函数
                           if (window._T) {
                               _T.sendEvent('wx-share-qq-success');
                           }
                           //成功分享回调
                           if (window.shareSuccessCallback) {
                               window.shareSuccessCallback();
                               return;
                           }
                           if (window.shareCallback) {
                               window.shareCallback();
                               return;
                           }
                           if (window.redirectUrl) {
                               window.location.href = window.redirectUrl;
                           }
                       },
                       cancel: function () {
                           // 用户确认分享后执行的回调函数
                           if (window._T) {
                               _T.sendEvent('wx-share-qq-cancel');
                           }
                           //取消分享回调
                           if (window.shareCancleCallback) {
                               window.shareCancleCallback();
                               return;
                           }
                           if (window.shareCallback) {
                               window.shareCallback();
                               return;
                           }
                           if (window.redirectUrl) {
                               window.location.href = window.redirectUrl;
                           }
                       }
                   });
 
                   wx.onMenuShareWeibo({
                       title: shareTitle, // 分享标题
                       desc: descContent, // 分享描述
                       link: lineLink, // 分享链接
                       imgUrl: imgUrl, // 分享图标
                       success: function () {
                           if (window._T) {
                               _T.sendEvent('wx-share-weibo-success');
                           }
                           //成功分享回调
                           if (window.shareSuccessCallback) {
                               window.shareSuccessCallback();
                               return;
                           }
                           if (window.shareCallback) {
                               window.shareCallback();
                               return;
                           }
                           if (window.redirectUrl) {
                               window.location.href = window.redirectUrl;
                           }
                       },
                       cancel: function () {
                           if (window._T) {
                               _T.sendEvent('wx-share-weibo-cancel');
                           }
                           //取消分享回调
                           if (window.shareCancleCallback) {
                               window.shareCancleCallback();
                               return;
                           }
                           if (window.shareCallback) {
                               window.shareCallback();
                               return;
                           }
                           if (window.redirectUrl) {
                               window.location.href = window.redirectUrl;
                           }
                       }
                   });
               }
               //微信授权接口
                function shareText() {
                   window.shareTitle = Data_shareTitle;
                   window.descContent = Data_descContent;
                   window.imgUrl = Data_imgUrl
                   window.lineLink = Data_lineLink;
                   window.redirectUrl = "";
                   window.shareSuccessCallback = function () { }
                   window.shareCallback = function () { }
                   setShareContent();
               }
               //客户端分享
               function isDianZhang() {
                   var ua = window.navigator.userAgent.toLowerCase();
                    if (ua.match(/ManagerZP/i) == 'managerzp' || ua.match(/ShopZhipin/i == 'shopzhipin')) {
                       return true;
                   } else {
                       return false;
                   }
               }
               if (isDianZhang()) {
                   function getShareMessage() {
                       var shareMessage = {};
                       shareMessage['wxShareTitle'] = Data_shareTitle
                       shareMessage['wxShareDesc'] = Data_descContent
                       shareMessage['wbShareTitle'] = getSubShareContent(139, Data_shareTitle + "戳这里：链接", "http://t.cn/R0K1eu7");
                       shareMessage['smsShareTitle'] = Data_shareTitle + "戳这里：链接" + " " + "http://t.cn/R0K1eu7";
                       shareMessage['imgUrl'] = Data_imgUrl;
                       shareMessage['shareUrl'] = Data_lineLink;
                       shareMessage['subtype'] = 99;
                       shareMessage['p'] = 0;
                       window.document.title = shareMessage['wxShareTitle'];
                       try {
                           if (window.get_share_datas_from_html_inapp) {
                               ret = get_share_datas_from_html_inapp();
                               for (key in ret) {
                                   shareMessage[key] = ret[key];
                               }
                           }
                       } catch (err) { }
                       var result = JSON.stringify(shareMessage);
 
                       try {
                           window.wst.startFunction(result);
                           return;
                       } catch (err) { }
 
                       return result;
                   }
                   function onShareComplete(type) {
 
                   }
                   function canShare() {
                       try {
                           window.wst.needShowShare(true);
                           return;
                       } catch (err) {
 
                       }
                       return true;
                   }
                   function getSubShareContent(charNum, content, url) {
                       var left = charNum - url.length;
                       return content.substring(0, left) + " " + url;
                   }
               }
 }
      