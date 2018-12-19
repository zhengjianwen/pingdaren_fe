/**
 * @author [zhangxin]
 * email [zhanxin@kanzhun.com]
 * create date 2018/11/28 14:25:48
 * @desc [新老用户注册]
 */
import {Toast, Icon} from 'antd-mobile';
import Invoke from "@/net/invoke.js"
import {baseInit} from '_common/decorators/baseinit'
import {debounce} from '@/js/utils/base'


@baseInit({title: '个人中心'})
class User extends React.Component {

    state = {
        data: {
            user:'评大人'
        }
    };

    render() {
        return (<Style>
            <div>
                个人设置
            </div>

        </Style>)
    }
}

export default User;

const Style = styled.div`
   background: #F1F0F7;
  `;


