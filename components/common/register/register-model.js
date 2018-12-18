/**
 * @author [zhangxin]
 * email [zhanxin@kanzhun.com]
 * create date 2018/11/29 15:37:04
 * @desc [注册Model]
 */
import {Modal} from 'antd-mobile';
import WLogin from './form';

class RegisterDialog extends React.Component {
    constructor(props) {
        super(props)
        this.state={
            hide:false
        }
    }
    show=()=> {
        this.setState({
            hide: !this.state.hide
        })
    };
    success=(e)=>{
        this.props.callback(e)

    }
    render() {
        return (
                <Modal transparent
                       wrapClassName='wrapClassName'
                       onClose={this.show}
                       visible={this.state.hide} closable={true}
                       maskClosable={true}
                       >
                    <WLogin hide={this.show} callback={this.success} statisticsCode={this.props.statisticsCode} asyn={this.props.asyn}/>
                </Modal>
        )
    }
}

export default RegisterDialog;

