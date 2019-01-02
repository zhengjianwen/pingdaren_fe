import './index.scss'

class ReactIscroll extends React.Component {
    constructor(props) {
        super(props);
        this.state={
        }
    }

    componentDidMount() {
        window.addEventListener("scroll",this.handleScroll)
    }
    componentWillUnmount() {
        window.removeEventListener("scroll",this.handleScroll)
    }

    handleScroll=(e)=>{
        let scrollTop=document.body.scrollTop || document.documentElement.scrollTop;
        const documentHeight = event.target.body.clientHeight
        const Height = window.screen.availHeight
        const isBottom = (scrollTop+ Height >= documentHeight )
        if(isBottom){
            this.props.onScrollEnd()
        }
    }
    refresh=()=>{
    }
    render() {

        return (<div>
            {this.props.children}
        </div>)
    }
}

ReactIscroll.defaultProps = {
    type: 1,
    hide: false
}

module.exports = ReactIscroll;