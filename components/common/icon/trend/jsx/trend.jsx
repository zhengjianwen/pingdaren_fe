/**
 * @author [zhangxin]
 * email [zhanxin@kanzhun.com]
 * create date 2018/09/06 15:51:48
 * @desc [动态箭头]
 */
require("../style/index.scss");
const React = require("react");

class Trend extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        const state=this.props.trend!==1?'up':'down'
        return (
            <div className="trend" >
                <div>
                    <img src={require(`../img/${state}.png`)} style={{animation:`${state} 2.5s linear infinite`}}/>
                    <img src={require(`../img/${state}.png`)} style={{animation:`${state}-last 2.5s linear infinite`}}/>
                </div>
            </div>
        )
    }
}

module.exports = Trend;