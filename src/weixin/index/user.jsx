/**
 * @author [zhangxin]
 * email [zhanxin@kanzhun.com]
 * create date 2018/11/28 14:25:48
 * @desc [新老用户注册]
 */
import {Tabs, Badge} from 'antd-mobile';
import Invoke from "@/net/invoke.js"
import {baseInit} from '_common/decorators/baseinit'
import {Page} from './components/page/index'
import {TabBar} from './components/tab-bar/index'
import {Toast} from "antd-mobile/lib/index";
import {host} from "@/net/api";
import ReactIscroll from '_common/react-iScroll/react-iScroll'


@baseInit({title: '个人中心'})
class User extends React.Component {

    state = {
        classify:[],
        user: {
            name: '---',
            img: '',
            id: 0,
            classify:[],
            sign: '请求失败'
        },

        myList:[],
        myListPage:0,
        myListHasMore:true,
        loveList:{},
        loveListPage:1,
    };

    componentWillMount() {
        this.getInfo()
        this.getClassify()
        this.getList()
    }
    /*
    *   查看自己的帖子
    *
    * */
    getList(){
        Invoke.article.list({p:this.state.myListPage,self:true})
            .then((res) => {
                console.log(res);
                if (res.status === true) {
                    if(res.data.length===0){
                        this.setState({
                            myListHasMore:false
                        })
                    }else {
                        this.setState({
                            myList:this.state.myList.concat(res.data)
                        })
                    }
                }
                else {
                    Toast.fail(res.msg, 1);
                }
            })
            .catch(function (error) {
                Toast.fail(error);
            })

    };

    getClassify(){
        Invoke.common.classify()
            .then((res) => {
                console.log(res);
                if (res.status === true) {
                    this.setState({
                        classify:res.data
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
    onScrollEnd=()=> {
        console.log('加载更多')
        /*if(this.state.hasMore){
            this.setState({
                page:this.state.page+1
            },()=>{
                this.getList(this.state.page)
            });

        }*/

    };
    toUserInfo=()=>{
        window.location.href=`/html/hybrid/userInfo`
    };
    render() {
        const tabs = [
            {title: <Badge>我的</Badge>},
            {title: <Badge>收藏</Badge>}
        ];
        return (<Style>
            <div>
                <div className='user-top'>
                    <div className='user-message'>关注</div>
                    {console.log(this.state.user.photo)}
                    <img onClick={this.toUserInfo} src={this.state.user.photo?`${host}${this.state.user.photo}`:require('./img/default.jpg')}/>
                    <div className='name'>{this.state.user.nickname}</div>
                    <div className='user-id'>ID：{this.state.user.id}</div>
                    <div className='sign'>{this.state.user.autograph}</div>
                </div>

                <div>
                    <ReactIscroll onScrollEnd={this.onScrollEnd}>
                        <Tabs tabs={tabs}
                              initialPage={0}
                              onChange={(tab, index) => {
                                  console.log('onChange', index, tab);
                              }}
                              onTabClick={(tab, index) => {
                                  console.log('onTabClick', index, tab);
                              }}
                        >
                            {
                                this.state.myList.length!==0?this.state.myList.map((item, index) => {
                                    return (<div key={index} onClick={()=>{this.toDetail(item)}}>
                                        <Page data={item} classify={this.state.classify}/>
                                    </div>)
                                }):<div className='noData'>暂无内容</div>
                            }
                            {
                                this.state.myList.length!==0?this.state.myList.map((item, index) => {
                                    return (<div key={index} onClick={()=>{this.toDetail(item)}}>
                                        <Page data={item} classify={this.state.classify}/>
                                    </div>)
                                }):<div className='noData'>暂无内容</div>
                            }
                        </Tabs>
                    </ReactIscroll>


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
  .noData{
      height: 60vh;
      line-height: 100vh;
      text-align: center;
      font-size: 0.80rem;
   }
   .user-message{
    position: absolute;
    top:5px;
    right: 1.25rem;
   }
   .user-top{
   text-align: center;
    padding-top:1.30rem ;
    background: white;
    border-bottom: 0.5px solid rgba(241,240,247,1);
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


