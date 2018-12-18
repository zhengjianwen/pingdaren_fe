require("../style/loading.scss");

let ToastInstance = null;
let ToastContainer = document.createElement("div");
ToastContainer.className = "toast-container";
document.body.appendChild(ToastContainer);

class ToastComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false
            , loading: false
            , text: "努力加载中..."
            , classList: []
            , style: {}
        };
        ToastInstance = this;
    }

    componentDidMount() { }

    render() {
        return (
            <div style={this.state.style} className={ClassNames("toast", this.state.classList, { "toast--show": this.state.show })}>
                <div className="toast__panel">

                    {
                        this.state.loading == true
                            ? (
                                <div className="toast__content">
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

                                    {
                                        this.state.text
                                            ? <p className="toast__txt">{this.state.text}</p>
                                            : null
                                    }
                                </div>
                            )
                            : (
                                <div className="toast__content">
                                    {
                                        this.state.text
                                            ? this.state.text
                                            : null
                                    }
                                </div>
                            )
                    }


                </div>
            </div>
        )
    }
};

ReactDOM.render(<ToastComponent />, ToastContainer);

let Timer = 0;
let DefaultState = {
    show: false
    , loading: false
    , text: "努力加载中"
    , classList: []
    , style: {}
};

const Toast = {
    preventDefault(e) {
        e.preventDefault();
    },
    open(options) {
        window.addEventListener('touchmove', this.preventDefault, { passive: false })
        clearTimeout(Timer);
        ToastInstance.setState(prevState => {
            var state = Object.assign({}, DefaultState, options, { show: true });
            return state;
        }, () => {
            //clearTimeout(Timer);
            Timer = setTimeout(() => {
                this.immediateClose();
            }, options.time || 2000);
        })
    }

    , loading(options) {
        clearTimeout(Timer);
        ToastInstance.setState(prevState => {
            var state = Object.assign({}, DefaultState, options, { show: true, loading: true });
            return state;
        })
    }

    , immediateClose() {
        ToastInstance.setState({
            show: false
        })
        window.removeEventListener('touchmove', this.preventDefault,{ passive: false })
    }

    , close(time = 500) {
        clearTimeout(Timer);
        Timer = setTimeout(() => {
            this.immediateClose();
        }, time);
    }
}

module.exports = Toast;