﻿/**
 * @author [zhangxin]
 * email [zhanxin@kanzhun.com]
 * create date 2018/10/11 16:43:21
 * @desc [弹窗组件]
 */
const React = require("react");
require("../style/dialog.scss");

class Dialog extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            display:this.props.display
        }
    }
    componentWillReceiveProps(nextProps){
        this.setState({
            display:nextProps.display
        })
    }
/*    shouldComponentUpdate(){
        return false
    }*/
    close(){
        if(this.props.close){
            this.props.close()
        }
        else
        {
            this.setState({display:false})
        }
    }
    render() {
        const {content}=this.props;
        return (
            <div className="dialog flex flex_justify_content-around flex_align_items_center"
            style={{display:this.state.display===true?'flex':'none'}}>
                <div className="dialog-content">
                    <img className='dialog-clone' src={require('../img/close.png')} onClick={()=>{this.close()}}/>
                    {content}
                </div>
            </div>
        )
    }
}

module.exports = Dialog;