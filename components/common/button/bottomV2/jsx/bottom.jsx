/**
 * @author [zhangxin]
 * email [zhanxin@kanzhun.com]
 * create date 2018/10/11 16:43:21
 * @desc [底部按钮插件]
 */
const React = require("react");
require("../style/bottom.scss");

class Bottom extends React.Component {
    constructor(props) {
        super(props);
    }
    isIphoneX(){
        return /iphone/gi.test(navigator.userAgent) && (screen.height == 812 && screen.width == 375)
    }

    render() {
        const {text,event,type,content}=this.props;
        return (
            <div
                className={this.isIphoneX() ? 'button-bottom button-bottom-X font-size-16 color-FFFFFF' : 'button-bottom  font-size-16 color-FFFFFF'}
                style={this.props.preStyle}
            >
                {
                    typeof type === 'undefined' ?
                        (<div onClick={() => {
                            if(event){
                                event()
                            }
                        }}>
                            {text}
                        </div>) : content
                }
            </div>
        )
    }
}

module.exports = Bottom;