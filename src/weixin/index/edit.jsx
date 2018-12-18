/**
 * @author [zhangxin]
 * email [zhanxin@kanzhun.com]
 * create date 2018/11/28 14:25:48
 * @desc [新老用户注册]
 */
import {Toast,ImagePicker} from 'antd-mobile';
import Invoke from "@/net/invoke.js"
import {baseInit} from '_common/decorators/baseinit'

@baseInit({title: '发布'})
class Main extends React.Component {

    state = {
        data:[{
            url: 'https://zos.alipayobjects.com/rmsportal/PZUUCKTRIHWiZSY.jpeg',
            id: '2121',
        }, {
            url: 'https://zos.alipayobjects.com/rmsportal/hqQWgTXdrlmVVYi.jpeg',
            id: '2122',
        }],
        multiple: false,
    };
    onChange = (files, type, index) => {
        console.log(files, type, index);
        this.setState({
            files,
        });
    }
    render() {
        return (<Style>
            <div>
                <ImagePicker
                    files={this.state.data}
                    onChange={this.onChange}
                    onImageClick={(index, fs) => console.log(index, fs)}
                    selectable={this.state.data.length < 7}
                    multiple={this.state.multiple}
                />
            </div>

        </Style>)
    }
}

const Style = styled.div`
   background:#ffffff;
   
  `;
export default Main;

