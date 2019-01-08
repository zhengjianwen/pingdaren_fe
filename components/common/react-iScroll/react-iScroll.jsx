import './index.scss'

class ReactIscroll extends React.Component {
    constructor(props) {
        super(props);
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
    render() {

        return (<div>
            {this.props.children}
        </div>)
    }
}

ReactIscroll.defaultProps = {
    hide: false
}

module.exports = ReactIscroll;