/**
 * @author [zhangxin]
 * email [zhanxin@kanzhun.com]
 * create date 2018/11/28 14:25:48
 * @desc [新老用户注册]
 */
import {host} from '@/net/api'
import {Toast, Icon} from 'antd-mobile';
import Invoke from "@/net/invoke.js"
import {baseInit} from '_common/decorators/baseinit'
import WxImageViewer from 'react-wx-images-viewer';


@baseInit({title: '帖子详情'})
class Detail extends React.Component {

    state = {
        data:{},
        index: 0,
        isOpen: false,
        classify:[],
        urls:[],
        comment:'',
        user:{}
    };

    componentWillMount() {
        this.getList()
        this.getClassify()
        this.getInfo()
        document.onkeydown = (e) => {
            if (e.keyCode === 13) {

            }
        }
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
    getParameter = (param) => {
        var query = window.location.search;
        var iLen = param.length;
        var iStart = query.indexOf(param);
        if (iStart == -1) return "";
        iStart += iLen + 1;
        var iEnd = query.indexOf("&", iStart);
        if (iEnd == -1) return query.substring(iStart);
        return query.substring(iStart, iEnd);
    }

    bindSubmit(){
        $('form').on('submit', function(e){
            // 不提交
            return false;
        });
    }
    getList() {
        Invoke.article.info({},this.getParameter('aid'))
            .then((res) => {
                console.log(res);
                if (res.status === true) {
                    let urls=[]
                    res.data.images_info.map((item,index)=>{
                        urls.push(`${host}${item.path}`)
                    });
                    console.log(urls)
                    this.setState({
                        data:res.data,
                        urls:urls
                    })
                }
                else {
                    Toast.fail(res.msg, 1);
                }
            })
            .catch(function (error) {
                Toast.fail(error);
            })

    };

    onClose = () => {
        this.setState({
            isOpen: false
        })
    }

    openViewer(index) {
        this.setState({
            index,
            isOpen: true
        })
    }

    render() {
        return (<Style>
            <div>
                <div className='padding-auto-20'>
                    <div className='margin-b-10 user'>{this.state.data.name}</div>
                    <div className='margin-b-10 type'>
                        {
                            this.state.classify.map((item,index)=>{
                                if(item.id===this.state.data.classify_id){
                                    return `#${item.name}`
                                }
                            })
                        }
                    </div>
                    <div className='margin-b-10 title'>{this.state.data.title}</div>
                    <pre>{this.state.data.content}</pre>
                    <div className="flex flex_justify_content flex_wrap_wrap imgList">
                        {
                            this.state.data.images_info?this.state.data.images_info.map((item, index) => {
                                return <div key={index} className='margin-b-12 imgItem'>
                                    <img src={`${host}${item.path}`} alt="" onClick={() => {
                                        this.openViewer(index)
                                    }}/>
                                </div>
                            }):''
                        }
                    </div>
                    <div className='flex flex_align_items_center margin-t-20 count'>
                        <div className='flex flex_align_items_center'>
                            <img src={require('./img/heart.png')}/> 0
                        </div>
                        <div className='flex flex_align_items_center'>
                            <img src={require('./img/pinglun-2.png')}/>
                            {this.state.data.read_count}
                        </div>
                    </div>
                    {
                        this.state.isOpen ? <WxImageViewer onClose={this.onClose} urls={this.state.data.urls}
                                                           index={this.state.index.index}/> : ""
                    }
                </div>
                <div className='detail-space'></div>
                <div className='comment'>
                    <div className='comment-title'>评论</div>
                    {
                        this.state.data.comment?this.state.data.comment.map((item, index) => {
                        return (<div className='comment-item' key={index}>
                            <div className='flex flex_justify_content margin-b-10'>
                                <div>匿名用户1</div>
                                <div className='flex flex_align_items_center comment-favour'><img
                                    src={require('./img/favour.png')}/>2341
                                </div>
                            </div>
                            <div className='comment-des'>苹果手机系统（iOS）是目前行业内公认最优秀的系统，他的象说真的光看外观看起来还真是一个天上一个地下。</div>

                        </div>)}):<div className='noComment'>暂无评论,快来抢个沙发吧~</div>
                    }
                </div>
                <div className='comment-fix'>
                    <input className='comment-input' placeholder='善意的发言会带来善意的回应'/>
                </div>

            </div>

        </Style>)
    }
}

export default Detail;

const Style = styled.div`
   background: #FFFFFF;
   padding-bottom: 2.50rem;
   .padding-auto-20{
      padding: 0 1rem;
   }
   .user{
    padding-top: 1rem;
    font-size:0.80rem;
    font-weight:400;
    color:rgba(51,51,51,1);
   }
   .type{
    font-size:0.90rem;
    font-weight:400;
    color:rgba(183,145,93,1);
   }
   .title{
    font-size:1.00rem;
    font-weight:400;
    color:rgba(51,51,51,1);
   }
   pre{
    font-size:0.80rem;
    font-weight:400;
    color:rgba(121,119,119,1);
    line-height:1.10rem;
    margin-bottom: .5rem;
   }
   .imgList{
    .imgItem{
      width: 31%;
      height:5rem ;
      overflow: hidden;
      img{
        width: 100%;
      }
    }
   }
   .count{
      font-size: 0.90rem;
      color:#BFBFBF;
      img{
        width: 18px;
        margin-right:0.50rem ;
      }
        >div{
          padding-bottom: 1rem;
          width: 50%;
          margin-left: 1rem;
        }
        >div:first-child{
          color:#CFA972;
        }
   }
   .detail-space{
    width: 100%;
    height:0.35rem;
    background:#F1F0F7;
   }
   .comment{
    color:#333333;
    padding-left: 0.40rem;
    .comment-item{
      border-bottom:0.5px solid rgba(244,245,249,1);
      padding: 0.60rem 1.00rem 0.90rem 0.60rem;
      .comment-favour{
        color:#CFA972;
        img{
          width:0.70rem;
          margin-right: 0.20rem;
        }
      }
      .comment-des{
        font-size:0.60rem;
        color:rgba(121,119,119,1);
        line-height:0.85rem;
      }
    }
    .comment-title{
      font-size:0.80rem;
      height: 2.20rem;
      line-height: 2.20rem;
      border-bottom:0.5px solid rgba(244,245,249,1);
      padding-left: 0.60rem;
    }
   }
   .comment-fix{
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      height: 2.50rem;
      background: white;
   }
   .comment-input{
    padding-left: 1rem;
    width: 16.60rem;
    height: 1.90rem;
    background:rgba(241,240,247,1);
    border-radius:19px;
    margin: 0.20rem auto 0.3rem;
    display: block;
   }
   .noComment{
      height: 5rem;
      line-height: 5rem;
      text-align: center;
      color: #ccc;
      font-size: 0.80rem;
   }
  `;


