/**
 * @author [zhangxin]
 * email [zhanxin@kanzhun.com]
 * create date 2018/11/28 14:25:48
 * @desc [新老用户注册]
 */
import {Toast,ImagePicker} from 'antd-mobile';
import { createGlobalStyle } from 'styled-components';
import Invoke from "@/net/invoke.js"
import {baseInit} from '_common/decorators/baseinit'

@baseInit({title: '发布'})
class Main extends React.Component {

    componentWillMount() {
        this.getClassify()
    }

    state = {
        title:'',
        content:'',
        data:[],
        multiple: false,
        classify:[],
        classifyIndex:1
    };
    getClassify(){
        Invoke.common.classify()
            .then((res) => {
                console.log(res);
                if (res.status === true) {
                    this.setState({
                        classify:res.data,
                        classifyIndex:res.data[0].id
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
    setImg(files){
        Invoke.article.img({uploadfile:files})
            .then((res) => {
                console.log(res);

            })
            .catch(function (error) {
                Toast.fail(error);
            })
    }
    submit=()=>{
        Invoke.article.create({classify_id:this.state.classifyIndex,title:this.state.title,content:this.state.content,images:this.state.data})
            .then((res) => {
                if(res.code===200){
                    Toast.info('发布成功')
                    window.location.href='/index'
                }else {
                    Toast.fail(res.msg);
                }
            })
            .catch(function (error) {
                Toast.fail(error);
            })
    }
    onChange = (files, type, index) => {
        console.log(files, type, index);
        if(type==='remove'){
            let arr=this.state.data.concat()
            arr.splice(index,1)
            this.setState({
                data:arr
            })
        }else if(type==='add'){
            this.setImg(files[files.length-1].url)
        }
        /*this.setState({
            files,
        });*/
    }
    onEdit=(e)=>{
        this.setState({
            content:e.target.value
        })
        //关键是先设置为auto，目的为了重设高度（如果字数减少）
        this.refs.myTA.style.height = 'auto';

        //如果高度不够，再重新设置
        if(this.refs.myTA.scrollHeight >= this.refs.myTA.offsetHeight){
            this.refs.myTA.style.height = this.refs.myTA.scrollHeight + 'px'
        }
    }
    inputChange=(e)=>{
        this.setState({
            title:e.target.value
        })
    }

    render() {
        return (
                <Style>
                    <GlobalStyle/>
                    <div>
                        <div className='flex flex_wrap_wrap tab'>
                            {
                                this.state.classify.map((item,index)=>{
                                    return (<div key={item.id} className={item.id===this.state.classifyIndex?'color-B7915D':''}
                                                 onClick={()=>{
                                                     this.setState({classifyIndex:item.id})
                                                 }}>#{item.name}</div>)
                                })
                            }
                        </div>
                        <input className='inputPla editInput' placeholder='请输入标题内容' value={this.state.title} onChange={this.inputChange}/>
                        <textarea className='inputPla editTextarea' value={this.state.content} onChange={this.onEdit} ref="myTA" placeholder='请输入您要发布的内容'/>
                        <ImagePicker
                            files={this.state.data}
                            onChange={this.onChange}
                            onImageClick={(index, fs) => console.log(index, fs)}
                            selectable={this.state.data.length < 7}
                            multiple={this.state.multiple}
                        />
                        <div className='submitBtn' onClick={this.submit}>确定发布</div>
                    </div>
                </Style>
)
    }
}
const GlobalStyle=createGlobalStyle`
   body{
    background-color:#FFFFFF;
   }
`;
const Style = styled.div`
   padding: 0 12px;
   position: relative;
   min-height: 100vh;
   .color-B7915D{
      color:#B7915D
   }
   .inputPla::placeholder{
     color:#CACACC
   }
   .editInput{
     padding: .5rem 0;
     border-bottom: .5px solid #F4F5F9;
     display: block;
     margin-left: 0.40rem;
     line-height:1.05rem;
     font-size: 0.75rem;
     width: 100%;
     
   }
   .editTextarea{
     width: 100%;
     margin-top: .5rem;
     line-height:1.25rem;
     font-size: 0.90rem;
     border: 0px;
     margin-left: 0.40rem;
   }
   .tab{
      >div{
        margin-right: 1.25rem;
      }
      padding: 0.75rem 8px;
      font-size:0.90rem;
      color:rgba(51,51,51,1);
      line-height:1.25rem;
   }
   .submitBtn{
      position: absolute;
      bottom: 0;
      font-size: 0.90rem;
      width:16.50rem;
      height:2.50rem;
      line-height: 2.5rem;
      background:rgba(183,145,93,1);
      border-radius:1.25rem;
      text-align: center;
      margin: auto;
      color: white;
   }
  `;
export default Main;

