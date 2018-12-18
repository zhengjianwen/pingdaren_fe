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
                            return (<div className='content-list' key={index}>
                                <div className='content-list-type'>
                                    攻略
                                </div>
                                <div className={ClassNames(['banner-img__wrapper'], {hide: !item.img})}>
                                    <img src={require('./img/demo.jpg')}/>
                                </div>
                                <div className='title'>{item.title}</div>
                                <div className='des'>{item.des}</div>
                                <div className='flex flex_align_items_center count'>
                                    <div className='flex flex_align_items_center'>
                                        <Icon type="heart" theme="filled" color='#CFA972' size='md' />{item.love}</div>
                                    <div className='flex flex_align_items_center'>
                                        <Icon type="message" />
                                        {item.talk}
                                        </div>
                                </div>
                            </div>)
                        })
                    }
                </div>
                <div className='flex flex_align_items_center flex_justify_content color-333333 tabBar'>
                    <div>HOME</div>
                    <Icon type="plus" color='#CFA972' size='md'/>
                    <div>ME</div>
                </div>
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
    .content-list{
      background:rgba(255,255,255,1);
      border-radius:11px;
      margin: 10px 0;
      padding: 0.70rem 0.50rem;
      .content-list-type{
        height: 1rem;
        line-height: 1rem;
        font-weight: 400;
        display: inline-block;
        color:#CFA972;
        font-size: 0.70rem;
        padding: 0 0.25rem ;
        border: .5px solid #CFA972;
        margin-bottom: 0.50rem;
      }
      .banner-img__wrapper{
        position: relative;
        width: 100%;
        overflow: hidden;
        height: 9.00rem;
        margin-bottom: 0.60rem;
        img{
          position: absolute;
          top:50%;
          margin-top:-50%;
          width: 100%;
        } 
      }
      .title{
        font-size:0.90rem;
        font-weight:500;
        color:#333333;
        line-height:1.25rem;
        margin-bottom: 0.50rem;
      }
      .des{
        font-size:0.70rem;
        font-weight:400;
        color:rgba(159,159,159,1);
        line-height:1.00rem;
        margin-bottom: 0.75rem;
      }
      .count{
      font-size: 0.90rem;
      color:#BFBFBF;
        >div{
          width: 50%;
          margin-left: 1rem;
        }
        >div:first-child{
          color:#CFA972;
        }
      }
      
    }
   }
   .tabBar{
    z-index: 10;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 2.90rem;
    background:rgba(255,255,255,1);
    padding: 0 2.40rem;
    font-weight:600;
   }
   
  `;
export default Main;

