webpackJsonp([5],{"./src/weixin/index/edit.jsx":function(e,t,n){"use strict";(function(e,i){function o(e,t){return Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(t)}}))}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function l(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var s,c,u=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),d=o(["\n   body{\n    background-color:#FFFFFF;\n   }\n"],["\n   body{\n    background-color:#FFFFFF;\n   }\n"]),m=o(["\n   padding: 0 12px;\n   position: relative;\n   min-height: 100vh;\n   .color-B7915D{\n      color:#B7915D\n   }\n   .inputPla::placeholder{\n     color:#CACACC\n   }\n   .editInput{\n     padding: .5rem 0;\n     border-bottom: .5px solid #F4F5F9;\n     display: block;\n     margin-left: 0.40rem;\n     line-height:1.05rem;\n     font-size: 0.75rem;\n     width: 100%;\n     \n   }\n   .editTextarea{\n     width: 100%;\n     margin-top: .5rem;\n     line-height:1.25rem;\n     font-size: 0.90rem;\n     border: 0px;\n     margin-left: 0.40rem;\n   }\n   .tab{\n      >div{\n        margin-right: 1.25rem;\n      }\n      padding: 0.75rem 8px;\n      font-size:0.90rem;\n      color:rgba(51,51,51,1);\n      line-height:1.25rem;\n   }\n   .submitBtn{\n      position: absolute;\n      bottom: 0;\n      font-size: 0.90rem;\n      width:16.50rem;\n      height:2.50rem;\n      line-height: 2.5rem;\n      background:rgba(183,145,93,1);\n      border-radius:1.25rem;\n      text-align: center;\n      margin: auto;\n      color: white;\n   }\n  "],["\n   padding: 0 12px;\n   position: relative;\n   min-height: 100vh;\n   .color-B7915D{\n      color:#B7915D\n   }\n   .inputPla::placeholder{\n     color:#CACACC\n   }\n   .editInput{\n     padding: .5rem 0;\n     border-bottom: .5px solid #F4F5F9;\n     display: block;\n     margin-left: 0.40rem;\n     line-height:1.05rem;\n     font-size: 0.75rem;\n     width: 100%;\n     \n   }\n   .editTextarea{\n     width: 100%;\n     margin-top: .5rem;\n     line-height:1.25rem;\n     font-size: 0.90rem;\n     border: 0px;\n     margin-left: 0.40rem;\n   }\n   .tab{\n      >div{\n        margin-right: 1.25rem;\n      }\n      padding: 0.75rem 8px;\n      font-size:0.90rem;\n      color:rgba(51,51,51,1);\n      line-height:1.25rem;\n   }\n   .submitBtn{\n      position: absolute;\n      bottom: 0;\n      font-size: 0.90rem;\n      width:16.50rem;\n      height:2.50rem;\n      line-height: 2.5rem;\n      background:rgba(183,145,93,1);\n      border-radius:1.25rem;\n      text-align: center;\n      margin: auto;\n      color: white;\n   }\n  "]),f=n("./node_modules/antd-mobile/es/index.js"),h=n("./node_modules/styled-components/dist/styled-components.browser.esm.js"),p=n("./net/invoke.js"),g=function(e){return e&&e.__esModule?e:{default:e}}(p),b=n("./components/common/decorators/baseinit.js"),y=(s=(0,b.baseInit)({title:"发布"}))(c=function(t){function n(){var e,t,i,o;a(this,n);for(var l=arguments.length,s=Array(l),c=0;c<l;c++)s[c]=arguments[c];return t=i=r(this,(e=n.__proto__||Object.getPrototypeOf(n)).call.apply(e,[this].concat(s))),i.state={title:"",content:"",data:[],multiple:!1,classify:[],classifyIndex:1},i.submit=function(){g.default.article.create({classify_id:i.state.classifyIndex,title:i.state.title,content:i.state.content,images:i.state.data}).then(function(e){200===e.code?(f.Toast.info("发布成功"),window.location.href="/index"):f.Toast.fail(e.msg)}).catch(function(e){f.Toast.fail(e)})},i.onChange=function(e,t,n){if("remove"===t){var o=i.state.data.concat();o.splice(n,1),i.setState({data:o})}else"add"===t&&i.setImg(e[e.length-1].url)},i.onEdit=function(e){i.setState({content:e.target.value}),i.refs.myTA.style.height="auto",i.refs.myTA.scrollHeight>=i.refs.myTA.offsetHeight&&(i.refs.myTA.style.height=i.refs.myTA.scrollHeight+"px")},i.inputChange=function(e){i.setState({title:e.target.value})},o=t,r(i,o)}return l(n,t),u(n,[{key:"componentWillMount",value:function(){this.getClassify()}},{key:"getClassify",value:function(){var e=this;g.default.common.classify().then(function(t){!0===t.status?e.setState({classify:t.data,classifyIndex:t.data[0].id}):f.Toast.fail(t.msg,1)}).catch(function(e){f.Toast.fail(e)})}},{key:"setImg",value:function(e){g.default.article.img({uploadfile:e}).then(function(e){}).catch(function(e){f.Toast.fail(e)})}},{key:"render",value:function(){var t=this;return e.createElement(x,null,e.createElement(v,null),e.createElement("div",null,e.createElement("div",{className:"flex flex_wrap_wrap tab"},this.state.classify.map(function(n,i){return e.createElement("div",{key:n.id,className:n.id===t.state.classifyIndex?"color-B7915D":"",onClick:function(){t.setState({classifyIndex:n.id})}},"#",n.name)})),e.createElement("input",{className:"inputPla editInput",placeholder:"请输入标题内容",value:this.state.title,onChange:this.inputChange}),e.createElement("textarea",{className:"inputPla editTextarea",value:this.state.content,onChange:this.onEdit,ref:"myTA",placeholder:"请输入您要发布的内容"}),e.createElement(f.ImagePicker,{files:this.state.data,onChange:this.onChange,onImageClick:function(e,t){},selectable:this.state.data.length<7,multiple:this.state.multiple}),e.createElement("div",{className:"submitBtn",onClick:this.submit},"确定发布")))}}]),n}(e.Component))||c,v=(0,h.createGlobalStyle)(d),x=i.div(m);t.default=y}).call(t,n("./node_modules/react/index.js"),n("./node_modules/styled-components/dist/styled-components.browser.esm.js").default)}});