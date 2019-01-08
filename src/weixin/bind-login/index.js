import {List, InputItem, WhiteSpace, Flex, Toast, Button} from 'antd-mobile';
import {createForm} from 'rc-form';
import queryString from 'query-string';
import Invoke from "@/net/invoke.js"
import API from "../../../net/api";

const Wxlogin = styled.div`
      width: 18.75rem;
      margin: 0 auto;
      .item_box{
          padding: 1.5rem;
          padding-top: 0;
          padding-bottom: 0px;
          .am-list-body::before{
            background-color:#fff;
          }
      }
      .title{
        margin-top: 2rem;
        font-size: 16px;
        color: #252F31;
        text-align: left;
        line-height: 16px;
        line-height: 30px;
        padding-left: 1.5rem;
      }
      .item{
          margin-bottom: 2rem;
      }
      .am-list-item{
          padding-left: 0;
      }
      .am-list-line{
          border-bottom: 1px solid #D7D7D7;
      }
      .getcode_btn{
          color:#2884FF;
      }
      .btn{
          width: 16.55rem;
          margin: 0 auto;
          .am-button-warning{
            background: #CFA972;
          }
      }
`


const parsed = queryString.parse(location.search);


class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            phone: "",
            text: "",
            code: "",
            isShow: false,
            count: 60, // 秒数初始化为60秒
            liked: true, // 文案默认为‘获取验证码‘
            csig: "",
            ctoken: "",
            csessionId: "",
            openId: ""

        }
    }

    componentDidMount() {
        console.log(this.props)
        document.title = "登录"
        document.getElementsByTagName('body')[0].className = "white"
        this.seCode()
    }

    //错误提示
    showToast = (text) => {
        Toast.info(text, 1);
    }
    getPhoneNumber = (e) => {
        this.setState({
            phone: e
        })
    }
    handleCode = (e) => {
        this.setState({
            code: e
        })
    }
    submit = (e) => {
        let _this = this
        this.props.form.validateFields((error, value) => {
            if (this.state.phone == "") {
                Toast.info("请填写手机号", 1);
                return false
            }
            if (!(/^[1][3456789][0-9]{9}$/).test(this.state.phone)) {
                Toast.info("手机格式不对", 1);
                return false
            }
            if (this.state.code == "") {
                Toast.info("请填写手机验证码", 1);
                return false
            }
            let formData = {
                phone: this.state.phone,
                code: this.state.code,
                token: window.sessionStorage.getItem("token"),
            }
            const data = Object.assign(formData, parsed);
            Invoke.common.user(data)
                .then((res) => {
                    if (res.code ==200) {
                        _this.setState({
                            phone: "",
                            code: ""
                        })
                        Toast.success('登录成功', 1);
                        window.location.href='/'
                    }
                    else {
                        Toast.success(res.msg, 1);
                    }

                })
                .catch(function (error) {
                    this.setState({
                        liked: true,
                        count: 60
                    })
                });
        });
    }

//获取短信验证码
    handleClick = () => {
        let _this = this
        if (this.state.phone == "") {
            Toast.info("请填写手机号", 1);
            return false
        }
        if (!(/^1(?:3\d|4[4-9]|5[0-35-9]|6[67]|7[013-8]|8\d|9\d)\d{8}$/).test(this.state.phone)) {
            Toast.info("手机格式不对", 1);
            return false
        }
        if (!this.state.liked) {
            return false
        }
        this.setState({
            liked: false
        })
        let count = this.state.count
        //发送验证码
        let data = {
            token: window.sessionStorage.getItem("token"),
            phone: this.state.phone,

        }
        Invoke.common.vc(data)
            .then((res) => {
                if (res.code === 200) {
                    Toast.info(res.msg, 1);
                }
            })
            .catch(function (error) {
                _this.setState({
                    liked: true,
                    count: 60
                })
            });
        const timer = setInterval(() => {
            this.setState({
                count: (count--),
                isShow: false
            }, () => {
                if (count == 0) {
                    clearInterval(timer);
                    _this.setState({
                        csig: "",
                        ctoken: "",
                        csessionId: "",
                        liked: true,
                        count: 60
                    })
                }
            })
        }, 1000)
    }
    seCode = () => {
    }

    render() {
        const {getFieldProps} = this.props.form;
        return (
            <Wxlogin>
                <div className="title">使用手机号快速登录</div>
                <div className="item_box">
                    <List renderHeader={() => ''}>
                        <div className="item">
                            <InputItem
                                {...getFieldProps('tel')}
                                placeholder="请输入手机号"
                                value={this.state.phone}
                                type="tel"
                                onChange={this.getPhoneNumber}
                                maxLength="11"
                            />
                        </div>
                        <div className="item">
                            <Flex>
                                <Flex.Item>
                                    <div id="getCode" className="row-code"></div>
                                </Flex.Item>

                            </Flex>
                        </div>
                        <div className="item">
                            <Flex>
                                <Flex.Item>
                                    <InputItem
                                        {...getFieldProps('code')}
                                        placeholder="请输入验证码"
                                        maxLength="6"
                                        type="tel"
                                        onChange={this.handleCode}
                                        value={this.state.code}
                                    />
                                </Flex.Item>
                                <div onClick={this.handleClick} className="getcode_btn">
                                    {this.state.liked ? "获取验证码" : this.state.count + 's后重试'}
                                </div>
                            </Flex>
                        </div>
                    </List>
                </div>
                <WhiteSpace/>
                <div className="btn">
                    <Button type="warning" onClick={this.submit} ka="save_point">确定</Button>
                </div>


            </Wxlogin>
        )
    }
}

const WLogin = createForm()(Login);
export default WLogin;

