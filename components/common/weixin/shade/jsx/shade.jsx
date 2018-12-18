/**
 * @author [zhangxin]
 * email [zhanxin@kanzhun.com]
 * create date 2018/10/11 16:43:21
 * @desc [微信分享遮罩]
 */
const React = require("react");
require("../style/shade.scss");
const Immutable=require('immutable')

class Shade extends React.Component {
    constructor(props) {
        super(props);
        this.show=this.show.bind(this);
        this.state={
            type:this.props.type
        }
    }
    componentWillMount(){
        this.props.onRef(this)
    }
    shouldComponentUpdate(nextProps,nextState,nextContext){
       if(Immutable.is(Immutable.Map(this.props),Immutable.Map(nextProps))
           &&Immutable.is(Immutable.Map(this.state),Immutable.Map(nextState))){
           return false
       }
        return true
    }
    hide(){
        this.setState({type:false})
    }
    show(){
        this.setState({type:true})
    }
    render() {
        console.log('重新渲染子组件')
        const {preStyle}=this.props;
        return (
            <div className={this.state.type?'shade':'shade shade-fade'} style={preStyle} onClick={()=>{this.hide()}}>
                <img src={require('../img/share.png')}/>
            </div>
        )
    }
}

module.exports = Shade;