/**
 * @author [zhangxin]
 * email [zhanxin@kanzhun.com]
 * create date 2018/11/16 11:13:45
 * @desc [自定义Textarea]
 */
const React = require("react");
require("../style/textarea.scss");

class Textarea extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            count:0
        }
    }
    onChange=(e)=>{
        this.setState({
            count:e.target.value.length
        });
        if(this.props.onChange){
            this.props.onChange(e)
        }

    }
    render() {
        let error=this.props.value.length>this.props.maxCount;
        return (
            <div className='textarea-container'>
                <textarea style={this.props.style}
                          className={error?`${this.props.className} error`:this.props.className}
                          placeholder={this.props.placeholder} onChange={this.onChange}
                          value={this.props.value} name={this.props.name} maxLength={this.props.maxLength}/>
                <div className="textarea-count">
                    <span className={error?'error-text':''}>{this.props.value.length}</span>
                    /{this.props.maxCount}</div>
            </div>
        )
    }
}

module.exports = Textarea;