import {host} from '@/net/api'
export const Page = (props) => {
    return (
        <Style>
            <div>
                <div className='content-list'>
                    <div className='content-list-type'>
                        {
                            props.classify.map((item,index)=>{
                                if(item.id===props.data.classify_id){
                                    return item.name
                                }
                            })
                        }
                    </div>
                    <div className={ClassNames(['banner-img__wrapper'], {hide: !props.data.images_info[0]})}>
                        {props.data.images_info[0]?<img src={`${host}${props.data.images_info[0].path}`}/>:''}
                        {/*<img src={props.data.images_info[0].path}/>*/}
                    </div>
                    <div className='title'>{props.data.title}</div>
                    <div className='des'>{props.data.content}</div>
                    <div className='flex flex_align_items_center count'>
                        <div className='flex flex_align_items_center'>
                            <img src={require('../../img/heart.png')}/>0</div>
                        <div className='flex flex_align_items_center'>
                            <img src={require('../../img/pinglun-2.png')}/>
                            {props.data.read_count}
                        </div>
                    </div>
                </div>
            </div>
        </Style>
    )
}
const Style = styled.div`
   .content-list{
      background:rgba(255,255,255,1);
      border-radius:11px;
      margin: 10px 0;
      padding: 0.70rem 0.50rem;
      .content-list-type{
        border-radius:2px;
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
        word-break:break-all;
        display:-webkit-box;
        -webkit-line-clamp:3;
        -webkit-box-orient:vertical;
        overflow:hidden;
      }
      .count{
      font-size: 0.90rem;
      color:#BFBFBF;
      img{
        width: 18px;
        margin-right:0.50rem ;
      }
        >div{
          width: 50%;
          margin-left: 1rem;
        }
        >div:first-child{
          color:#CFA972;
        }
      }
      
    }
   
  `;