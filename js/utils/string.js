/**
 * 截取字符串
 * @param  {String} str 需要截取的字符串
 * @param  {Number} len 截取字符串的长度
 * @return {string} text截取之后的字符串
 */
export  const substr = (str, len) => {
    let text;
    if (str.length > len) {
        text = str.substr(0, len) + "...";
    } else {
        text = str.substr(0, len);
    }
    return text;
}

export const queryString = (name) => {
    let url = window.location.href;
    let n = url.indexOf("?");
    let str = url.substring(n + 1);
    let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    let r = str.match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    return null;
}


