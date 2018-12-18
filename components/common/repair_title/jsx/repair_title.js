const NavToolbar = require("@/src/common/nav_toolbar/jsx/nav_toolbar")

class Repair extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    cache = {
        prevTitle: ""
    }

    state = {
        title: document.title
    }

    componentWillMount() {
        this.cache.prevTitle = document.title;

        //console.log("modify title componentWillMount")
    }

    componentDidMount() {
        //console.log("modify title componentDidMount")

        if (this.props.title) {
            document.title = this.props.title;

            this.setState({
                title: this.props.title
            })
        }
    }

    componentWillUnmount() {
        //console.log("modify title componentWillUnmount")

        document.title = this.cache.prevTitle;

        this.setState({
            title: this.cache.prevTitle
        })
    }

    componentWillReceiveProps(nextProps) {
        //console.log("modify title componentWillReceiveProps")
        //console.log(this.props.title, nextProps.title)
        if (this.props.title !== nextProps.title) {
            document.title = nextProps.title;

            this.setState({
                title: nextProps.title
            })
        }
    }

    render() {
        if (Common.url.referrer.indexOf("/html/dcoin.html") > -1) {
            return <NavToolbar title={this.state.title} />
        }

        return null
    }
}

Repair.defaultProps = {
    title: ""
}

module.exports = Repair;