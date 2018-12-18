/**
 * @author [zhangxin]
 * email [zhanxin@kanzhun.com]
 * create date 2018/09/25 17:15:01
 * @desc [动态轮播条]
 */
const React = require("react");
require("../style/carousel.scss");

class Carousel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            index: 2,
            first: '',
            last: ''
        }

    }

    componentDidMount() {
        this._changeText()
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            list: nextProps.textList,
            first: nextProps.textList[0],
            last: nextProps.textList[1]
        })
    }

    _changeText() {
        let _this = this;
        let oddEven = 1;
        window.setInterval(function () {
            oddEven++;
            if (_this.state.index + 1 > _this.state.list.length) {
                _this.setState({
                    index: 0
                })
            }

            if (oddEven % 2 === 0) {
                _this.setState({//偶数
                    index: _this.state.index + 1,
                    first: _this.state.list[_this.state.index]
                })
            } else {
                _this.setState({
                    index: _this.state.index + 1,
                    last: _this.state.list[_this.state.index]
                })
            }
        }, 2500)
    }
    render() {
        const state = this.props.trend !== 1 ? 'up' : 'down';
        return (
            <div className="carousel" style={this.props.preStyle}>
                <div className="flex flex_wrap_wrap flex_align_items_center">
                    <div style={{animation: `${state} 5s linear infinite`}}>{this.state.first}</div>
                    <div style={{animation: `${state}-last 5s linear infinite`}}>{this.state.last}</div>
                </div>
            </div>
        )
    }
}

module.exports = Carousel;