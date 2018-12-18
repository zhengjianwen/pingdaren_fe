import { List, InputItem,Flex,Toast,Button } from 'antd-mobile';
import { createForm } from 'rc-form';
import queryString from 'query-string';
import {VerrifyCode,codeReset} from '@/components/token';
import Invoke from "@/net/invoke.js"

const Wxlogin = styled.div`
      margin: 0 auto;
      font-size: 0.70rem;
      .item_box{
          padding: .5rem;
          padding-top: 0;
          padding-bottom: 0px;
          .am-list-body::before{
            background-color:#fff;
          }
          
      }
      .item{
          margin-bottom: .5rem;
          input{
            font-size: 14px!important; 
          }
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
      //组件样式
      ._nc .stage1 .label{
        font-size: 0.70rem;
      }
      .row-code.nc-container ._nc .stage1 .slider ,
      .row-code.nc-container ._nc .stage1 .label ,
      .row-code.nc-container ._nc .stage1 .track div,
      .row-code.nc-container ._nc .stage1 .button,
      ._nc .stage1{
        line-height: 1.5rem;
        height: 1.5rem;
      }
      #getCode{
        height: 1.5rem;
      }
      ._nc .icon {
        width: 25px;
        height: 25px;
      }
      ._nc .stage1 .icon {
          top: -6px;
      }
      .row-code.nc-container ._nc .stage1 .bg-green{
          background:#78c430
      }
      .slider{
        .button,.track{
           height: 1.4rem !important;
        }
      }
      
      .btn{
          width: 92%;
          margin: 0 auto;
          .am-button-warning{
            background: #FF5151;
          }
      }
`;


const parsed = queryString.parse(location.search);


class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            phone:"",
            text:"",
            code:"",
            isShow:false,
            count: 60, // 秒数初始化为60秒
            liked: true, // 文案默认为‘获取验证码‘
            csig:"",
            ctoken:"",
            csessionId:"",
            openId:""

        }
    }
    componentDidMount() {
        this.seCode()
    }
    //错误提示
    showToast=(text)=> {
        Toast.info(text, 1);
    }
    getPhoneNumber=(e)=>{
        this.setState({
            phone:e
        })
    }
    handleCode=(e)=>{
        this.setState({
            code:e
        })
    }
    submit = (e) => {
        let _this=this
        this.props.form.validateFields((error, value) => {
            if(this.state.phone==""){
                Toast.info("请填写手机号", 1);
                return false
            }
            if(!(/^[1][3456789][0-9]{9}$/).test(this.state.phone)){
                Toast.info("手机格式不对", 1);
                return false
            }
            if(this.state.csessionId==""){
                Toast.info("请滑动获取验证码", 1);
                return false
            }
            if(this.state.code==""){
                Toast.info("请填写手机验证码", 1);
                return false
            }
            let formData={
                phone:this.state.phone,
                code:this.state.code,
            }
            const data = Object.assign(formData, parsed);
            this.props.asyn(data)
                .then((res)=>{
                    if(res.rescode==0){
                        _this.setState({
                                phone:"",
                                code:""
                        })
                    } else {
                        Toast.fail(res.resmsg, 1);
                    }
                    this.props.callback(res)

                })
                .catch((error)=> {
                    this.setState({
                        liked: true ,
                        count: 60
                    })
                });
        });
    }

//获取短信验证码
    handleClick = () => {
        this.props.statisticsCode();
        let _this=this
        if(this.state.phone==""){
            Toast.info("请填写手机号", 1);
            return false
        }
        if(!(/^[1][3456789][0-9]{9}$/).test(this.state.phone)){
            Toast.info("手机格式不对", 1);
            return false
        }
        if(this.state.csessionId==""){
            Toast.info("请滑动获取验证码", 1);
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
        let data={
            phone:this.state.phone,
            type:2,
            cscene:"nc_login",
            cappKey:"FFFF0N1N000000006DC1",
            csig:this.state.csig,
            ctoken:this.state.ctoken,
            csessionId:this.state.csessionId
        }
        Invoke.wxlogin.getPhoneCode(data)
            .then((res)=>{
                if(res.rescode==0){
                    Toast.info(res.resmsg, 1);
                }
                else
                {
                    //重置滑动验证码
                    codeReset({
                        id:"#getCode",
                        width:"100%",
                        callback:function(data){
                            console.log(data)
                            _this.setState({
                                csig:data.sig,
                                ctoken:data.nc_token,
                                csessionId:data.csessionid
                            })
                        }
                    })
                }
            })
            .catch(function (error) {
                _this.setState({
                    csig:"",
                    ctoken:"",
                    csessionId:"",
                    liked: true ,
                    count: 60
                },function(){
                    codeReset({
                        id:"#getCode",
                        width:"100%",
                        callback:function(data){
                            _this.setState({
                                csig:data.sig,
                                ctoken:data.nc_token,
                                csessionId:data.csessionid
                            })
                        }
                    })
                })
            });
        const timer = setInterval(() => {
            this.setState({
                count:(count--),
                isShow:false
            },()=>{
                if(count==0){
                    clearInterval(timer);
                    _this.setState({
                        csig:"",
                        ctoken:"",
                        csessionId:"",
                        liked: true ,
                        count: 60
                    },function(){
                        codeReset({
                            id:"#getCode",
                            width:"100%",
                            callback:function(data){
                                _this.setState({
                                    csig:data.sig,
                                    ctoken:data.nc_token,
                                    csessionId:data.csessionid
                                })
                            }
                        })
                    })
                    
                }
            })
        },1000)
    }
    seCode=()=>{

        let _this=this
        VerrifyCode({
            id:"#getCode",
            width:"100%",
            callback:function(data){
                console.log(data)
                _this.setState({
                    csig:data.sig,
                    ctoken:data.nc_token,
                    csessionId:data.csessionid
                })
            }
        })
    }
    render() {
        const { getFieldProps } = this.props.form;
        return (
            <Wxlogin>
                <div className="item_box">
                    <List>
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
                                        maxLength="5"
                                        type="tel"
                                        onChange={this.handleCode}
                                        value={this.state.code}
                                    />
                                </Flex.Item>
                                <div onClick={this.handleClick} className="getcode_btn">
                                    {this.state.liked?"获取验证码":this.state.count + 's后重试'}
                                </div>
                            </Flex>
                        </div>
                    </List>
                </div>
                <div className="btn">
                    <Button type="warning" onClick={this.submit} >确定</Button>
                </div>
            </Wxlogin>
        )
    }
}
const WLogin = createForm()(Login);
export default WLogin;

