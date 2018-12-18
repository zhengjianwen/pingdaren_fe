/**
 * @author [zhangxin]
 * email [zhanxin@kanzhun.com]
 * create date 2018/12/10 11:05:42
 * @desc [微信分享遮罩V2.0] 去掉组件外绑定this,添加img自定义
 */
const React = require("react");
require("../style/shade.scss");

class Shade extends React.Component {
    constructor(props) {
        super(props);
        this.show=this.show.bind(this);
        this.state={
            type:this.props.type
        }
    }
    hide(){
        this.setState({type:false})
    }
    show(){
        this.setState({type:true})
    }
    render() {
        const {preStyle,img}=this.props;
        return (
            <div className={this.state.type?'shade':'shade shade-fade'} style={preStyle} onClick={()=>{this.hide()}}>
                <img src={img?img:require('../img/share.png')}/>
            </div>
        )
    }
}
export default Shade;