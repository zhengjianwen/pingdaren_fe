require("../style/loading.scss");

class Loading extends React.Component {
    constructor(props) {
        super(props)
        this.state={
            animation:false,
            hide:false,
            type: this.props.type
        }
    }

    componentWillMount() {
        if(this.props.hide==true){
            this.setState({
                animation:true
            })
        }
    }
    componentWillReceiveProps(nextProps){
        if (nextProps.hide == true && nextProps.type == 3) {
            this.setState({
                animation:true
            })
            return
        }
        this.setState({
            hide: nextProps.hide
        })
    }
    onAnimationEnd=()=>{
        this.setState({
            hide:true,
            type:2
        })
    }

    render() {
        var cLoading = "";
        if (this.state.type == 1) {
            cLoading = <div className="loading-com__1">
                <span className="loading-com__item"></span>
                <span className="loading-com__item"></span>
                <span className="loading-com__item"></span>
                <span className="loading-com__item"></span>
                <span className="loading-com__item"></span>
            </div>;
        }
        if (this.state.type == 2) {
            cLoading = <div className="loading-com__2">
                <div className="spinner">
                    <div className="spinner-container container1">
                        <div className="circle1"></div>
                        <div className="circle2"></div>
                        <div className="circle3"></div>
                        <div className="circle4"></div>
                    </div>
                    <div className="spinner-container container2">
                        <div className="circle1"></div>
                        <div className="circle2"></div>
                        <div className="circle3"></div>
                        <div className="circle4"></div>
                    </div>
                    <div className="spinner-container container3">
                        <div className="circle1"></div>
                        <div className="circle2"></div>
                        <div className="circle3"></div>
                        <div className="circle4"></div>
                    </div>
                </div>
            </div>
        }
        if (this.state.type == 3) {
            cLoading = <div className={this.state.animation === true ?"loading-com__3 animation3":"loading-com__3"}
                            onAnimationEnd={this.onAnimationEnd}>
                <div className="loading-com__2">
                    <div className="spinner">
                        <div className="spinner-container container1">
                            <div className="circle1"></div>
                            <div className="circle2"></div>
                            <div className="circle3"></div>
                            <div className="circle4"></div>
                        </div>
                        <div className="spinner-container container2">
                            <div className="circle1"></div>
                            <div className="circle2"></div>
                            <div className="circle3"></div>
                            <div className="circle4"></div>
                        </div>
                        <div className="spinner-container container3">
                            <div className="circle1"></div>
                            <div className="circle2"></div>
                            <div className="circle3"></div>
                            <div className="circle4"></div>
                        </div>
                    </div>
                </div>

            </div>
        }
/*        if(this.state.hide){
            //alert(123)
            window.removeEventListener('touchmove', function (e) {
                e.preventDefault();
            }, { passive: false })
        }else {
            //alert(456)
            window.addEventListener('touchmove', function (e) {
                e.preventDefault();
            }, { passive: false })
        }*/
        return (
            <div className={this.state.hide ? "loading-com hide" : "loading-com"}>
                {cLoading}
            </div>
        )
    }
}

Loading.defaultProps = {
    type: 1,
    hide: false
}

module.exports = Loading;