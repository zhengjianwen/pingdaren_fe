require("./index.scss");
const iScroll = require('iscroll/build/iscroll-lite');

class ReactIscroll extends React.Component {
    constructor(props) {
        super(props);
        this.state={
        }
    }

    componentDidMount() {
        const options = {
            // 滚动事件的探测灵敏度，1-3，越高越灵敏，兼容性越好，性能越差
            probeType: 3,
            // 拖拽超过上下界后出现弹射动画效果，用于实现下拉/上拉刷新
            bounce: true,
            // 展示滚动条
            scrollbars: false,
            click:true
        };
        this.iScrollInstance = new iScroll(this.refs.ReactIscroll,options);
        this.iScrollInstance.on('scroll', this.onScroll);
        this.iScrollInstance.on('scrollEnd', this.onScrollEnd);
    }
    refresh=()=>{
        this.iScrollInstance.refresh()
    }
    onScrollEnd=()=> {

        // 滑动结束后，停在加载区域
        if (this.iScrollInstance.y <= this.iScrollInstance.maxScrollY) {
            this.props.onScrollEnd()
            /*if (this.state.pullUpStatus == 1) { // 发起了加载，那么更新状态
                this.setState({pullUpStatus: 2});
                this.fetchItems(false);
            }*/
        }

    }
    render() {

        return (<div id="ReactIscroll" ref='ReactIscroll' style={{height:'100vh'}}>
            {this.props.children}
            </div>)
    }
}

ReactIscroll.defaultProps = {
    type: 1,
    hide: false
}

module.exports = ReactIscroll;