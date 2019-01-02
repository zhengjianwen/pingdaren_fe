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


@baseInit({title: '消息'})
class News extends React.Component {

    state = {
        data: [{
            date:'今天',
            title:'标题标题啊标题',
            des:'消息内容啊消息内容啊。看得见啊烦死疯狂啊附近的歌都是祝福慧子分慧子 vz息内容啊。看得见啊烦死疯狂啊附近的歌都是祝福慧子分慧子 vz息内容。'
        },
            {
                date:'8月12日',
                title:'标题标题啊标题',
                des:'消息内容啊消息内容啊。看得见啊烦死疯狂啊附近的歌都是祝福慧子分慧子 vz息内容啊。看得见啊烦死疯狂啊附近的歌都是祝福慧子分慧子 vz息内容。'


            },{
                date:'8月12日',
                title:'标题标题啊标题',
                des:'消息内容啊消息内容啊。看得见啊烦死疯狂啊附近的歌都是祝福慧子分慧子 vz息内容啊。看得见啊烦死疯狂啊附近的歌都是祝福慧子分慧子 vz息内容。'


            }]
    };

    render() {
        return (<Style>
            <div>
                <div className='news'>
                    {this.state.data.map((item,index)=>{
                        return(<div className='new-item' key={index}>
                            <div className='new-item-date'>{item.date}</div>
                            <div className='new-item-content'>
                                <div className='new-item-title'>{item.title}</div>
                                <div className='new-item-des'>{item.des}</div>
                            </div>
                        </div>)
                    })}
                </div>
            </div>

        </Style>)
    }
}

export default News;

const Style = styled.div`
    body{
      background: #F1F0F7;
    }
   .news{
      .new-item{
        .new-item-date{
          padding: 0.75rem 1.00rem 0.25rem;
          color:#CFA972;
          font-size: 0.70rem;
        }
        .new-item-content{
          background: #ffffff;
          padding: 0.50rem 1.00rem;
          color:#333333;
          .new-item-title{
            font-size: 0.80rem;
            font-weight:500;
            line-height:1.10rem;
            margin-bottom: .5rem;
          }
          .new-item-des{
            font-size: 0.70rem;
            line-height:1.00rem;
          }
        }
      }
   }
   
   
  `;


