import "@/entry/base.scss";
import 'antd-mobile/dist/antd-mobile.css'; 
import ReactDOM from "react-dom";

import { Provider } from "react-redux";
import RootRouter from "@/entry/router.js"
import store from "@/redux/store.js";

document.title = "店长直聘";

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