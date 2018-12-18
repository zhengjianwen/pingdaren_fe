import {VerrifyCode,codeReset} from '@/components/token';

const Wxlogin = styled.div`
      margin: 0 auto;
      font-size: 0.70rem;
      .item_box{
          padding: .5rem;
          padding-top: 0;
          padding-bottom: 0px;
          .am-list-body::before{
            background-color:#fff;
          }
          
      }
      .item{
          margin-bottom: .5rem;
          input{
            font-size: 14px!important; 
          }
      }
      .am-list-item{
          padding-left: 0;
      }
      .am-list-line{
          border-bottom: 1px solid #D7D7D7;
      }
      .getcode_btn{
          color:#2884FF;
      }
      //组件样式
      ._nc .stage1 .label{
        font-size: 0.70rem;
      }
      .row-code.nc-container ._nc .stage1 .slider ,
      .row-code.nc-container ._nc .stage1 .label ,
      .row-code.nc-container ._nc .stage1 .track div,
      .row-code.nc-container ._nc .stage1 .button,
      ._nc .stage1{
        border-radius:3px ;
        line-height: 1.5rem;
        height: 1.5rem;
      }
      #getCode{
        height: 1.5rem;
      }
      ._nc .icon {
        width: 25px;
        height: 25px;
      }
      ._nc .stage1 .icon {
          top: -6px;
      }
      .row-code.nc-container ._nc .stage1 .bg-green{
          background:#78c430
      }
      .slider{
        .button,.track{
           height: 1.4rem !important;
        }
      }
      
      .btn{
          width: 92%;
          margin: 0 auto;
          .am-button-warning{
            background: #FF5151;
          }
      }
`;


class Verify extends React.Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        this.seCode()
    }

    seCode=()=>{
        VerrifyCode({
            id:"#getCode",
            width:"100%",
            callback:(data)=>{
                this.props.callBack({
                    type:2,
                    cscene:"nc_login",
                    cappKey:"FFFF0N1N000000006DC1",
                    csig:data.sig,
                    ctoken:data.nc_token,
                    csessionId:data.csessionid
                });
            }
        })
    }
    render() {
        return (
            <Wxlogin>
                <div className="item_box">
                    <div id="getCode" className="row-code"></div>
                </div>
            </Wxlogin>
        )
    }
}
export default Verify;

