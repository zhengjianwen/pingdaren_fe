const React = require("react");
const ReactDOM = require("react-dom");

class Toast extends React.Component {
	constructor(props) {
       super(props);
    }
    componentDidMount(){

    }
	render(){
        return(
		    <div className="dz_layer_nr L_fedback">
			        <div className="tit"><i className="icon_true"></i></div>
			        <div className="info">
			            {this.props.text}
			        </div>
			    </div>
        )
    }
}

module.exports = Toast;