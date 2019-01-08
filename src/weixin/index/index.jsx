/**
 * @author [zhangxin]
 * email [zhanxin@kanzhun.com]
 * create date 2018/11/28 14:25:48
 * @desc [新老用户注册]
 */
import {Toast, Icon} from 'antd-mobile';
import Invoke from "@/net/invoke.js"
import {baseInit} from '_common/decorators/baseinit'
import ReactIscroll from '_common/react-iScroll/react-iScroll'
import {debounce} from '@/js/utils/base'
import {Page} from './components/page/index'
import {TabBar} from './components/tab-bar/index'


@baseInit({title: '首页'})
class Main extends React.Component {

    state = {
        page:0,
        classify:[],
        data:[],
        text:"",
        hasMore:true,
        top:true
    };

    componentWillMount() {
        this.getClassify();
        this.getList()
        window.onscroll =()=> {
            let t = document.documentElement.scrollTop || document.body.scrollTop;
            let top=t<43?true:false;
            top!==this.state.top?this.setState({
                top:top
            }):''


        };
    }

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

    getList(){
        if(this.state.text===''){//未输入查询条件时可以翻页
            Invoke.article.list({p:this.state.page,self:false})
                .then((res) => {
                    console.log(res);
                    if (res.status === true) {
                        if(res.data.length===0){
                            this.setState({
                                hasMore:false
                            })
                        }else {
                            this.setState({
                                data:this.state.data.concat(res.data)
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
        }

    };
    onScrollEnd=()=> {
        console.log('加载更多')
        if(this.state.hasMore){
            this.setState({
                page:this.state.page+1
            },()=>{
                this.getList(this.state.page)
            });

        }

    };
    toDetail=(item)=>{
        console.log(item)
        window.location.href=`/detail?aid=${item.id}`
    };
    bindChange=debounce((e)=>{
        this.setState({
            text:e.target.value
        })
        Invoke.article.search({condition:e.target.value})
            .then((res) => {
                console.log(res);
                if (res.status === true) {
                    this.setState({
                        data:res.data
                    })
                }
                else {
                    Toast.fail(res.msg, 1);
                }
            })
            .catch(function (error) {
                Toast.fail(error);
            })
    },500);

    render() {
        return (<Style>
            <div>
                <div className={ClassNames('search-content', {hide: !this.state.top})}>
                    <div className='flex flex_align_items_center search'>
                        <Icon type="search" color='#CFA972' size='md'/>
                        <input placeholder='请输入您想要搜索的内容' onChange={this.bindChange}/>
                    </div>
                </div>
                <ReactIscroll onScrollEnd={this.onScrollEnd}>
                    <div className='content'>
                        {
                            this.state.data.length!==0?this.state.data.map((item, index) => {
                                return (<div key={index} onClick={()=>{this.toDetail(item)}}>
                                    <Page data={item} classify={this.state.classify}/>
                                </div>)
                            }):<div className='noData'>暂无内容</div>
                        }
                    </div>
                </ReactIscroll>
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
   .noData{
      height: 100vh;
      line-height: 100vh;
      text-align: center;
      font-size: 0.80rem;
   }
   
  `;
export default Main;

