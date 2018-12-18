import {
    Router,
    //BrowserRouter as Router,
    //HashRouter as Router,
    Route,
    Switch,
} from "react-router-dom";

import History from '@/entry/browser-history.js';

import AppRouter from "@/entry/app-router.js"


import NotFound from "@/src/other/not-found/index.js";

class RootRouter extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Router history={History} >
                <Switch>
                   
                    <Route path="/404" component={NotFound} />
                    <Route path="/" component={AppRouter} />
                </Switch>
            </Router>
        )
    }
}

export default RootRouter;
