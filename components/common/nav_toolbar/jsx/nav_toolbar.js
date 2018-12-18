require("../style/nav_toolbar.scss")

class NavToolbar extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    state = {
        iphoneX: false,
        ios: false
    }

    click_back = () => {
        //var hashVal = location.hash.replace("#/", "").replace("#", "").replace(/\/.*/, "").replace(/\?.*/, "");
        ////console.log(hashVal)

        //if (hashVal == "boss" || hashVal == "geek") {
        //    try {
        //        KZ && KZ.onCloseView && KZ.onCloseView()
        //    } catch (e) {

        //    }
        //}

        history.back();
    }

    componentWillMount() {
        var iOS = /iPhone/.test(navigator.userAgent);
        var ratio = window.devicePixelRatio || 1;
        var width = window.screen.width * ratio;
        var height = window.screen.height * ratio

        this.setState({
            ios: iOS
        })

        if (iOS && width == 1125 && height === 2436) {
            this.setState({
                iphoneX: true
            })
        }
    }

    render() {
        return (
            <div className={ClassNames("nav-toolbar", { "nav-toolbar--x": this.state.iphoneX, "nav-toolbar--ios": this.state.ios })}>
                <div className="nav-toolbar__fixed KZ_dflex">
                    <div className="nav-toolbar__icon ">
                        <div className="nav-toolbar__back" onClick={this.click_back}></div>
                        <div className="nav-toolbar__close"></div>
                    </div>
                    <div className="nav-toolbar__title KZ_flex">{this.props.title}</div>
                    <div className="nav-toolbar__explain ">{this.props.explain}</div>
                </div>
            </div>
        )
    }
}

NavToolbar.defaultProps = {
    title: "",
    explain: ""
}

module.exports = NavToolbar;