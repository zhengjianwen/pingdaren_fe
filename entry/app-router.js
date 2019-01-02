import {
    Route,
    Switch,
    Redirect
} from "react-router-dom";

import Loadable from 'react-loadable';

import Index from "@/src/weixin/index/index.jsx"

// const DZonline = process.env.NODE_ENV === "production";
// if (DZonline === false) {
//     import VConsole from 'vconsole/dist/vconsole.min.js'
//     new VConsole();
// }


function Loading() {
    return (
        <div className="page-load">
            <div className="icon-wrap">
                <i className="icon__img icon__loading"></i>
            </div>
        </div>
    );
}
const LoadComponent = (opts) => {
    return Loadable(Object.assign({
        loading: Loading,
        delay: 20000,
        timeout: 10000,
    }, opts));
};

const Edit = LoadComponent({ loader: () => import("@/src/weixin/index/edit.jsx") });
const Detail = LoadComponent({ loader: () => import("@/src/weixin/index/detail.jsx") });
const User = LoadComponent({ loader: () => import("@/src/weixin/index/user.jsx") });
const UserInfo = LoadComponent({ loader: () => import("@/src/weixin/index/userInfo.jsx") });
const News = LoadComponent({ loader: () => import("@/src/weixin/index/news.jsx") });
const Login = LoadComponent({ loader: () => import("@/src/weixin/bind-login/index.js") });

let AuthComponent = (props, Component) => {
    // console.log(props, Component)
    return <Component {...props} />
}

//路由
class AppRouter extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Switch>
                {/* <Route exact path={`/`} render={props => AuthComponent(props, Index)} /> */}
                <Route path={`/index`} render={props => AuthComponent(props, Index)} />
                <Route path={`/edit`} render={props => AuthComponent(props, Edit)} />
                <Route path={`/detail`} render={props => AuthComponent(props, Detail)} />
                <Route path={`/user`} render={props => AuthComponent(props, User)} />
                <Route path={`/userinfo`} render={props => AuthComponent(props, UserInfo)} />
                <Route path={`/news`} render={props => AuthComponent(props, News)} />
                <Route path={`/login`} render={props => AuthComponent(props, Login)} />
{/*
                <Route path={`/login/:id?`} render={props => AuthComponent(props, Login)} />
*/}
                <Redirect to="/404" />
            </Switch>
        )
    }
}


export default AppRouter;
