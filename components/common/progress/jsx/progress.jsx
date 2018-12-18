const React = require("react");
require("../style/progress.css");

class Progress extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className="progress" style={this.props.parentsStyle}>
                <div className="progressChild" style={Object.assign({},{width:this.props.currentPercent},this.props.childStyle)}></div>
            </div>
        )
    }
}

module.exports = Progress;