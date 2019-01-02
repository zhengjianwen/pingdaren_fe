import "@/entry/base.scss";
import 'antd-mobile/dist/antd-mobile.css'; 
import ReactDOM from "react-dom";
import Invoke from "@/net/invoke.js"
import { Provider } from "react-redux";
import RootRouter from "@/entry/router.js"
import store from "@/redux/store.js";
import {Toast} from "antd-mobile/lib/index";

document.title = "评大人";
if (!window.sessionStorage["token"]) {
    Invoke.common.getToken({
        key:'13968114520'
    })
        .then((res) => {
            console.log(res);
            window.sessionStorage["token"] = res.data;
        })
        .catch(function (error) {
            Toast.fail(error);
        })
}

if (module.hot) {
    module.hot.accept()
}

ReactDOM.render(
        <Provider store={store}  >
            <RootRouter />
        </Provider>
     ,
    document.getElementById("root")
)