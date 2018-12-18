import { Result, Icon, WhiteSpace,Button } from 'antd-mobile';

const NotPage= styled.div`
      .img{
        width:10rem;
        margin:0 auto;
        img{
            width:100%
        }
      }
      .am-icon-md {
        width: 60px;
        height: 60px;
        }
        .am-result-title {
        color: #333;
        font-size: 52px;
        padding: 30px 0 18px 0;
        margin-left: 15px;
        }
        .btn{
            text-align:center;
            margin-top:20px;
        }
`
class NotFound extends React.Component {
    constructor(props) {
        super(props)
        this.state={
             imgUrl:require("./img/404.png")
        }
    }

    componentDidMount() {
        document.title = "404 - 店长直聘"
    }
    pageBack=(e)=>{
        window.history.go(-1)
    }
    render() {
        return (
            <NotPage>
               <div className="img">
                   <img src={this.state.imgUrl} />
               </div>
               <div className="btn">
               <Button type="primary" inline size="small" style={{ marginRight: '4px' }} onClick={this.pageBack} >返回</Button>
               </div>
               
            </NotPage>
        )
    }
}

export default NotFound;