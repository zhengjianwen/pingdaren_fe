/**
 * @author [zhangxin]
 * email [zhanxin@kanzhun.com]
 * create date 2018/11/28 14:25:48
 * @desc [新老用户注册]
 */
import {Toast, Icon} from 'antd-mobile';
import Invoke from "@/net/invoke.js"
import {baseInit} from '_common/decorators/baseinit'
import WxImageViewer from 'react-wx-images-viewer';


@baseInit({title: '帖子详情'})
class Detail extends React.Component {

    state = {
        data: {
            user:'评大人',
            type:'#体检报告',
            title:'iphone X 用了三个月的感受',
            content:'1、苹果手机系统（iOS）是目前行业内公认最优秀的系统，他的流畅度，安全度都是安卓比不上的。相同配置下，苹果能流畅运行的，安卓不见得可以。 2、苹果的价格很微妙，它的价格恰好浮动在国人收入的中上阶段，几乎很大一部分人收入能超过的5k的少之胜少，无意用了iphone又预示着一个人收入能力 3、，国人目前不再看中一件东西的好与坏，重要的是不是能出去别人能认识你用的就是牌子货，这就是B格的象征。因为纵观各种大bbs社区等等，只要用iphone你就是土豪的象征，只要用安卓你就是屌丝的象征，说真的光看外观看起来还真是一个天上一个地下。',
            imgList:[
                require('./img/demo.jpg'),
                require('./img/demo.jpg'),
                require('./img/demo.jpg'),
                require('./img/demo.jpg')
            ],
            comment:[{
                name:'小明',
                love:435345,
                text:'苹果手机系统（iOS）是目前行业内公认最优秀的系统，他的象说真的光看外观看起来还真是一个天上一个地下。'
            },
                {
                    name:'小明',
                    love:435345,
                    text:'苹果手机系统（iOS）是目前行业内公认最优秀的系统，他的象说真的光看外观看起来还真是一个天上一个地下。'
                },
                {
                    name:'小明',
                    love:435345,
                    text:'苹果手机系统（iOS）是目前行业内公认最优秀的系统，他的象说真的光看外观看起来还真是一个天上一个地下。'
                },
                {
                    name:'小明',
                    love:435345,
                    text:'苹果手机系统（iOS）是目前行业内公认最优秀的系统，他的象说真的光看外观看起来还真是一个天上一个地下。'
                },
                {
                    name:'小明',
                    love:435345,
                    text:'苹果手机系统（iOS）是目前行业内公认最优秀的系统，他的象说真的光看外观看起来还真是一个天上一个地下。'
                }]
        },
        index: 0,
        isOpen: false
    };
    onClose = () =>{
        this.setState({
            isOpen: false
        })
    }

    openViewer (index){
        this.setState({
            index,
            isOpen: true
        })
    }
    render() {
        return (<Style>
            <div>
                <div className='padding-auto-20'>
                    <div className='margin-b-10 user'>{this.state.data.user}</div>
                    <div className='margin-b-10 type'>{this.state.data.type}</div>
                    <div className='margin-b-10 title'>{this.state.data.title}</div>
                    <pre>{this.state.data.content}</pre>
                    <div className="flex flex_justify_content flex_wrap_wrap imgList">
                        {
                            this.state.data.imgList.map((item, index) => {
                                return <div  key={index} className='margin-b-12 imgItem'>
                                    <img src={item} alt="" onClick={()=>{this.openViewer(index)}}/>
                                </div>
                            })
                        }
                    </div>
                    <div className='flex flex_align_items_center margin-t-20 count'>
                        <div className='flex flex_align_items_center'>
                            <img src={require('./img/heart.png')}/> 123123123</div>
                        <div className='flex flex_align_items_center'>
                            <img src={require('./img/pinglun-2.png')}/>
                            123123123
                        </div>
                    </div>
                    {
                        this.state.isOpen ? <WxImageViewer onClose={this.onClose} urls={this.state.data.imgList} index={this.state.index.index}/> : ""
                    }
                </div>
                <div className='detail-space'></div>
                <div className='comment'>
                    <div className='comment-title'>评论</div>
                    {this.state.data.comment.map((item,index)=>{
                        return(<div className='comment-item' key={index}>
                            <div className='flex flex_justify_content margin-b-10'>
                                <div>匿名用户1</div>
                                <div className='flex flex_align_items_center comment-favour'><img src={require('./img/favour.png')}/>2341</div>
                            </div>
                            <div className='comment-des'>苹果手机系统（iOS）是目前行业内公认最优秀的系统，他的象说真的光看外观看起来还真是一个天上一个地下。</div>

                        </div>)
                    })}
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
  `;


