const React = require("react");
require("../style/dz_layer.css");

class Input extends React.Component {
	constructor(props) {
       super(props);
       this.state=this.props.layerInit
    }
    componentDidMount(){
    
    }
	render(){
        return(
        	<div className="mask">
	            <div  className={this.props.show==true? 'dz_layer show' : 'dz_layer'} style={this.props.layerInit.style}>
				    <div className="hd">{this.props.layerInit.title}<a className="ly_icon close" onClick={ this.props.closeLayer}></a></div>
				    {this.props.content}
				</div>
				<div className={this.props.show==true? 'mask_layer show' : 'mask_layer'}onClick={ this.props.closeLayer} ></div>
		  </div>
        )
    }
}

module.exports = Input;