const React = require("react");
require("../style/box_b.css");

class Box_b extends React.Component{
    constructor(){
        super()
        this.state = { 
            currentIndex :1
        }
    }
     componentDidMount () {
        
    }
    htmlState(type){
       if(type==2){
          return (
             <a className="more" href={this.props.InitData.More.url}>{this.props.InitData.More.title}</a>
          )
       }
       if(type==3){
          return (
             <span className="right_txt">{this.props.InitData.right}</span>
          )
       }
        if(type==4){
          return (
              <span className="tit">-{this.props.InitData.tit}</span>
          )
       }
      
    }
    render(){
        return(
            <div className="box_b dz_m_t_20">
                <div className="hd">
                    <h2><em></em>{this.props.InitData.title}</h2>
                    {this.htmlState(this.props.InitData.type)}
                </div>
                <div className="box_nr p-left">
                     {this.props.children}
                </div>
            </div>
        )
    }
}

module.exports = Box_b;