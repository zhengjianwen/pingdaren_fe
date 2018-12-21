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
import {Page} from './components/page/index'
import {TabBar} from './components/tab-bar/index'


@baseInit({title: '首页'})
class Main extends React.Component {

    state = {
        data: {
            list: [{
                type: 0,
                img: './img/demo.jpg',
                title: '办公与游戏兼得电脑，强烈推荐给你门门门赶快去买！！',
                des: '办公与游戏兼得电脑，强烈推荐给你门men e门……',
                love: 23412311,
                talk: 23412311

            },
                {
                    type: 1,
                    img: './img/demo.jpg',
                    title: '办公与游戏兼得电脑，强烈推荐给你门门门赶快去买！！',
                    des: '办公与游戏兼得电脑，强烈推荐给你门men e门……',
                    love: 23412311,
                    talk: 23412311

                },
                {
                    type: 1,
                    img: null,
                    title: '办公与游戏兼得电脑，强烈推荐给你门门门赶快去买！！',
                    des: '办公与游戏兼得电脑，强烈推荐给你门men e门游戏兼得电脑，强烈推游戏兼得电脑，强烈推游戏兼得电脑，强烈推游戏兼得电脑，强烈推……',
                    love: 23412311,
                    talk: 23412311

                },
                {
                    type: 0,
                    img: './img/demo.jpg',
                    title: '办公与游戏兼得电脑，强烈推荐给你门门门赶快去买！！',
                    des: '办公与游戏兼得电脑，强烈推荐给你门men e门……',
                    love: 23412311,
                    talk: 23412311

                },
                {
                    type: 0,
                    img: null,
                    title: '办公与游戏兼得电脑，强烈推荐给你门门门赶快去买！！',
                    des: '办公与游戏兼得电脑，强烈推荐给你门men e门游戏兼得电脑，强烈推游戏兼得电脑，强烈推游戏兼得电脑，强烈推游戏兼得电脑，强烈推……',
                    love: 23412311,
                    talk: 23412311

                }]
        }
    };
    /**
     * 节流手机号校验
     */
    vail = debounce(() => {
        let reg = /^[1][3456789][0-9]{9}$/;
        if (!reg.test(this.state.phone)) {
            Toast.info('请输入正确手机号', 1);
            return
        }
        this.handleSubmit()
    }, 200);

    /**
     * 节流判断滑块是否隐藏
     */
    handleVerify = debounce((e) => {
        if (e.length === 11) {
            this.setState({
                verifyState: true
            })
        } else {
            this.setState({
                verifyState: false
            })
        }
    }, 200);

    /**
     * 绑定成功提交后台
     */
    handleSubmit = () => {

        try {
            Common.statistics.sendEvent({pageKey: 'prefer_peck', eventName: 'imme_get_coupon', p1: 'prefer_peck'})
        } catch (e) {

        }
        if (!this.state.token) {
            Toast.fail('请滑动获取验证码', 1);
            return
        }
        Invoke.award.allReceive({...this.state.token, phone: this.state.phone})
            .then((res) => {
                if (res.rescode == 0) {
                    Toast.success('已领取成功', 1);
                    this.setState({
                        init: false
                    })
                    console.log(this.verify)
                    console.log(this.verify.seCode)
                }
                else {
                    Toast.fail(res.resmsg, 1);
                }
            })
            .finally(() => {
                this.verify.seCode()
            })
            .catch(function (error) {
                Toast.fail(error);
            })
    };

    /**
     * input输入
     */
    handleChange = (e) => {
        console.log(e.target.value)
        this.handleVerify(e.target.value)
        this.setState({
            phone: e.target.value
        })
    }
    success = (e) => {
        console.log(e)
        this.setState({
            token: e
        })
    }
    changePhone = () => {
        try {
            Common.statistics.sendEvent({pageKey: 'prefer_peck', eventName: 'alter_account'})
        } catch (e) {

        }
        this.setState({
            phone: '',
            init: true
        })
    }

    render() {
        return (<Style>
            <div>
                <div className='search-content'>
                    <div className='flex flex_align_items_center search'>
                        <Icon type="search" color='#CFA972' size='md'/>
                        <input placeholder='请输入您想要搜索的内容 '/>
                    </div>
                </div>
                <div className='content'>
                    {
                        this.state.data.list.map((item, index) => {
                            return (<div key={index}>
                                <Page data={item}/>
                            </div>)
                        })
                    }
                </div>
                <TabBar/>
            </div>

        </Style>)
    }
}

const Style = styled.div`
   background: #F1F0F7;
   .search-content{
    z-index: 10;
    position: fixed;
    top:0;
    left: 0;
    right: 0;
    background:rgba(255,255,255,1);
    .search{
        margin: 0.25rem 1.00rem;
        background:rgba(241,240,247,1);
        border-radius:5px;
        height: 1.65rem;
        padding: 0 0.70rem;
        input{
          width: 90%;
          margin-left: 0.50rem;
          background:rgba(241,240,247,1);
        }
        input::-webkit-input-placeholder{
          text-align: center;
          font-size: 0.60rem;
          color:#C8C8C8
        }
    }
   }
   .content{
    padding:2.25rem 0.50rem  3.40rem;
   }
   
  `;
export default Main;

