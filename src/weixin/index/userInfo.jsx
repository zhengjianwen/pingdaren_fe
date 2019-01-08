/**
 * @author [zhangxin]
 * email [zhanxin@kanzhun.com]
 * create date 2018/11/28 14:25:48
 * @desc [新老用户注册]
 */
import {Toast, List, Button, WingBlank, DatePicker,Picker} from 'antd-mobile';
import Invoke from "@/net/invoke.js"
import {baseInit} from '_common/decorators/baseinit'
import {host} from "@/net/api";
let json=require('./json/city')


@baseInit({title: '个人设置'})
class User extends React.Component {

    state = {
        visible:false,
        city:[],
        user:{
            birthday:'请选择'
        }
    };

    componentWillMount() {
        this.getInfo()
        const addr=[];
        const province=Object.keys(json);
        for(let item in province){
            const key=province[item];
            const cityList=[];
            if(json[key].length>0){
                for(let item1 in json[key]){
                    const obj={
                        'value':json[key][item1],
                        'label':json[key][item1]
                    }
                    cityList.push(obj);
                }
            }
            const obj={
                'value':key,
                'label':key,
                'children':cityList
            }
            addr.push(obj);
        }
        this.setState({
            city:addr
        })
    }

    getInfo(){
        Invoke.user.info()
            .then((res) => {
                if (res.code === 200) {
                    this.setState({
                        user:res.data
                    })
                }
                else {
                    Toast.fail(res.msg, 1);
                }
            })
            .catch(function (error) {
                Toast.fail(error);
            })
    }
    getSel() {
        const value = this.state.pickerValue;
        if (!value) {
            return '';
        }
        const treeChildren = arrayTreeFilter(json.provinces, (c, level) => c.value === value[level]);
        return treeChildren.map(v => v.label).join(',');
    }

    handleChange=(e)=> {

        if(e.target){
            console.log(e.target.name + '-----' + e.target.value)
            this.setState({
                user:Object.assign({},this.state.user,{[e.target.name]: e.target.value})
            })
        }else {
            this.setState({
                user:Object.assign({},this.state.user,{province:e[0],city:e[1]})
            })
        }
    }

    render() {
        return (<Style>
            <div>
                <div className='head'>
                    <img  src={this.state.user.photo?`${host}${this.state.user.photo}`:require('./img/default.jpg')}/>
                </div>
                <List className="date-picker-list" style={{backgroundColor: 'white'}}>
                    <List.Item arrow="empty" extra={
                        <input className='name' onChange={this.handleChange} name='nickname' placeholder='请填写' value={this.state.user.nickname}/>
                    }>昵称</List.Item>
                    <List.Item arrow="empty" extra='14662046'>评大人号</List.Item>
                    <DatePicker
                        mode="date"
                        extra="请选择"
                        value={new Date(this.state.user.birthday)}
                        onChange={date => this.setState({date})}
                    >
                        <List.Item arrow="horizontal">生日</List.Item>
                    </DatePicker>
                    <List.Item arrow="horizontal" extra={
                        <select dir="rtl" onChange={this.handleChange} name="sex" value={this.state.user.sex}>
                            <option value="1">男</option>
                            <option value='0'>女</option>
                        </select>
                    }>性别</List.Item>
                    <Picker
                        name='city'
                        visible={this.state.visible}
                        data={this.state.city}
                        value={[this.state.user.province,this.state.user.city]}
                        onChange={v => this.handleChange(v)}
                        onOk={() => this.setState({ visible: false })}
                        onDismiss={() => this.setState({ visible: false })}
                    >
                        <List.Item extra={this.getSel()} onClick={() => this.setState({ visible: true })}>
                            家乡
                        </List.Item>
                    </Picker>
                    <List.Item arrow="horizontal" extra={
                        <input className='name' placeholder='请填写' name='school' onChange={this.handleChange} value={this.state.user.school}/>
                    }>学校</List.Item>

                    <List.Item arrow="horizontal" extra={
                        <input className='name' placeholder='请填写' name='autograph' onChange={this.handleChange} value={this.state.user.autograph}/>
                    }>个人签名</List.Item>
                </List>
                <WingBlank><Button type="primary" className='submit'>保存</Button></WingBlank>
                <WingBlank><Button>退出</Button></WingBlank>
                <div className=' color-4A90E2 help'>帮助/反馈</div>

            </div>

        </Style>)
    }
}

export default User;

const Style = styled.div`
   color: #888;
   position: relative;
   .help{
   margin-top: 2rem;
    width: 100%;
    text-align: center;
    text-decoration:underline
   }
   .head{
      background: #ffffff;
      text-align: center;
      padding-top: 1.50rem;
      img{
        width: 4rem;
        height: 4rem;
        border-radius: 50%;
        margin-bottom: 1rem;
      }
   }
   input{
    color: #888;
   }
   input::placeholder,select{
    color: #888;
    font-size: 16px;
   }
   .name{
      text-align: right;
      width: 6rem;
   }
   .submit{
      margin: 1rem 0;
      background-color:#CFA972
      
   }
   .submit::before{
    border: 1PX solid #CFA972!important;
   }
  `;


