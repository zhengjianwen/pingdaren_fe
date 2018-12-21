/**
 * @author [zhangxin]
 * email [zhanxin@kanzhun.com]
 * create date 2018/11/28 14:25:48
 * @desc [新老用户注册]
 */
import {Tabs,Badge} from 'antd-mobile';
import Invoke from "@/net/invoke.js"
import {baseInit} from '_common/decorators/baseinit'
import {Page} from './components/page/index'
import {TabBar} from './components/tab-bar/index'


@baseInit({title: '个人中心'})
class User extends React.Component {

    state = {
        data: {
            user:{
                name:'我是大美女',
                img:'',
                id:93746294,
                sign:'个签个签个签个签个签个签个签'
            },
            invitation: [{
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

    render() {
        const tabs = [
            { title: <Badge text={'3'}>First Tab</Badge> },
            { title: <Badge text={'今日(20)'}>Second Tab</Badge> }
            ];
        return (<Style>
            <div>
                <div className='user-top'>
                    <div className='user-message'>关注</div>
                    <img src={require('./img/demo.jpg')}/>
                    <div className='name'>我是大美女</div>
                    <div className='user-id'>ID：93746294</div>
                    <div className='sign'>个签个签个签个签个签个签个签</div>
                </div>

                <div>
                    <Tabs tabs={tabs}
                          initialPage={1}
                          onChange={(tab, index) => { console.log('onChange', index, tab); }}
                          onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '150px', backgroundColor: '#fff' }}>
                            {
                                this.state.data.invitation.map((item,index)=>{
                                    return(<div key={index}>
                                        <Page data={item}/>
                                    </div>)
                                })
                            }
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '150px', backgroundColor: '#fff' }}>
                            {
                                this.state.data.invitation.map((item,index)=>{
                                    return(<div key={index}>
                                        <Page data={item}/>
                                    </div>)
                                })
                            }
                        </div>
                    </Tabs>

                </div>
                <TabBar/>
            </div>

        </Style>)
    }
}

export default User;

const Style = styled.div`
   background: #F1F0F7;
   position: relative;
   .user-message{
    position: absolute;
    top:5px;
    right: 1.25rem;
   }
   .user-top{
   text-align: center;
    padding-top:1.30rem ;
    background: white;
    img{
        display: block;
        margin: 0 auto .5rem;
        width:5.10rem ;
        height: 5.10rem;
        border-radius: 50%;
    }
    .name{
      font-size:0.90rem;
      color:rgba(51,51,51,1);
      line-height:1.25rem;
    }
    .user-id{
      font-size:0.80rem;
      color:rgba(121,119,119,1);
      line-height:1.10rem;
    }
    .sign{
      font-size:0.60rem;
      color:rgba(51,51,51,1);
      line-height:0.85rem;
    }
   }
   
   
  `;


