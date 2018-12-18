const React = require("react");
require("../style/load_more.css");

class LoadMore extends React.Component{
    constructor(props){
        super(props)
        this.state = { 
           
        }
    }
    componentDidMount () {
    }
    load_More=(e)=>{
        if(this.props.isHideLoadMore){
            return(
                <div className="weui-loadmore">
                    <div className="weui-loading"></div>
                    <div className="weui-loadmore__tips">正在加载</div>
               </div>
            )
        }
    }
    render(){
        return(
            <div>
               {this.load_More()}
            </div>
        )
    }
}

module.exports = LoadMore;