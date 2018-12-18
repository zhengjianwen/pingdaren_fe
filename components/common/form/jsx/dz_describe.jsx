const React = require("react");
const Validform = require('vali');
const $DZ = require('base');

class Textarea extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            num: this.props.init.min,
            max: this.props.init.max,
            value: this.props.value,
            describe: this.props.value
        }

    }
    componentDidMount() {
        let val = this.state.describe
        if (val) {
            let len = $DZ.GetLength(val, this.props.init.type)
            this.setState({
                num: len
            })
        }
    }
    componentWillReceiveProps(newProps) {
        if (newProps.value != this.state.value) {
            //console.log(newProps);
            let val = newProps.value
            if (val) {
                let len = $DZ.GetLength(val, this.props.init.type)
                this.setState({
                    num: len,
                    value: newProps.value,
                    describe: newProps.value
                });
            }

        }
    }

    //componentWillUpdate(n,p){
    //   if(n.value!=this.state.value){
    //      let val=n.value
    //      let len=$DZ.GetLength(val,this.props.init.type)
    //      this.setState({
    //           num:len,
    //           value:n.value,
    //           describe:n.value
    //      })
    //   }
    //}

    staTistics = (e) => {
        let val = e.target.value
        let len = $DZ.GetLength(val, this.props.init.type)
        //console.log(val)
        this.setState({
            num: len,
            describe: e.target.value
        });
        if (typeof this.props.changeCallback == "function") {
            this.props.changeCallback(e.target.value);
        }
        var T = this.props.this; //外层父组件this
        var _self = this;
        var data = {
            num: this.state.num,
            max: this.state.max,
            msg: "描述文字不能超过" + this.state.max + "个字",
            index: this.props.index
        }
        Validform.customFun.range(T, data, function () {
            let flg;
            if (parseInt(len) > parseInt(data.max)) {
                T.setState({
                    index: data.index,
                    init: { "msg": data.msg, "flag": false, "val": false }
                })
                flg = false;
                console.log(T)
            }
            else {
                T.setState({
                    index: data.index,
                    init: { "msg": "", "flag": true, "val": false }
                })
                flg = true;
            }
            return flg
        })
    }

    render() {
        return (
            <div>
                <textarea name={this.props.name}
                    className="kz_input required"
                    maxLength="1000"
                    placeholder={this.props.placeholder}
                    style={this.props.style}
                    onChange={this.staTistics}
                    value={this.state.describe} >
                </textarea>
                <div className="tips">
                    {this.props.tips}
                    <span className="right">
                        <b className={this.state.num > this.state.max ? "red" : ""}>{this.state.num}</b><em>/</em>{this.state.max}
                    </span>
                </div>
            </div>
        )
    }
}
module.exports = Textarea;
