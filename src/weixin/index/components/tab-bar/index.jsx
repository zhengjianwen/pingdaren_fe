import {Icon} from 'antd-mobile';

export const TabBar = (props) => {
    return (
        <Style>
            <div className='flex flex_align_items_center flex_justify_content color-333333 tabBar'>
                <div onClick={()=>{window.location.href=`/html/hybrid/index`}}>HOME</div>
                <Icon type="plus" color='#CFA972' size='md' onClick={()=>{window.location.href=`/html/hybrid/edit`}}/>
                <div onClick={()=>{window.location.href=`/html/hybrid/user`}}>ME</div>
            </div>
        </Style>
    )
}
const Style = styled.div`
     .tabBar{
    z-index: 10;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 2.90rem;
    background:rgba(255,255,255,1);
    padding: 0 2.40rem;
    font-weight:600;
   }
   
  `;