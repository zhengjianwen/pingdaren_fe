/**
 * @author [zhangxin]
 * email [zhanxin@kanzhun.com]
 * create date 2018/11/28 14:25:48
 * @desc [新老用户注册]
 */
import {Toast, List, Button, WingBlank, DatePicker} from 'antd-mobile';
import Invoke from "@/net/invoke.js"
import {baseInit} from '_common/decorators/baseinit'


@baseInit({title: '个人设置'})
class User extends React.Component {

    state = {
        data: {
            user: '张鑫'
        }
    };

    onChange(e) {
        console.log(e.target.name + '-----' + e.target.value)
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        return (<Style>
            <div>
                <div className='head'>
                    <img src={require('./img/demo.jpg')}/>
                </div>
                <List className="date-picker-list" style={{backgroundColor: 'white'}}>
                    <List.Item arrow="empty" extra={
                        <input className='name' placeholder='请填写'/>
                    }>昵称</List.Item>
                    <List.Item arrow="empty" extra='14662046'>评大人号</List.Item>
                    <DatePicker
                        mode="date"
                        extra="请选择"
                        value={this.state.date}
                        onChange={date => this.setState({date})}
                    >
                        <List.Item arrow="horizontal">生日</List.Item>
                    </DatePicker>
                    <List.Item arrow="horizontal" extra={
                        <select dir="rtl" onBlur={this.onChange.bind(this)} name="degree"
                                ref={(inputDate) => {
                                    this.degreeConfig = inputDate;
                                }}>
                            <option value=''>请选择</option>
                            <option value="0">男</option>
                            <option value='1'>女</option>
                        </select>
                    }>性别</List.Item>
                    <List.Item arrow="horizontal" extra={
                        <input className='name' placeholder='请选择'/>
                    }>家乡</List.Item>
                    <List.Item arrow="horizontal" extra={
                        <input className='name' placeholder='请填写'/>
                    }>学校</List.Item>

                    <List.Item arrow="horizontal" extra={
                        <input className='name' placeholder='请填写'/>
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
   color:#171717;
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


