import React from 'react'
import "../iconfont/iconfont.css"
import '../style/My.css'
import axios from 'axios'
import {
    Link
} from 'react-router-dom'
import {
    showAvatar,
} from './common/utils'
import {
    Modal,
    Button,
    WhiteSpace,
    WingBlank,
    Toast
} from 'antd-mobile';
import {
    injectIntl,
    intlShape,
    FormattedMessage,
} from 'react-intl';
const alert = Modal.alert;

const showAlert = () => {
    const alertInstance = alert('Delete', 'Are you sure???', [{
        text: 'Cancel',
        onPress: () => console.log('cancel'),
        style: 'default'
    }, {
        text: 'OK',
        onPress: () => console.log('ok')
    }, ]);

    setTimeout(() => {
        // 可以调用close方法以在外部close
        alertInstance.close();
    }, 1000);
};

class My extends React.Component {
    constructor() {
        super();
        this.state = {
            relInfo: {}
        }
    }

    componentDidMount() {
        this.getInfo()
    }
    getInfo = () => {

        axios.get('/kc/self/info', {
                headers: {
                    "Content-Type": "application/json",
                    "authorization": sessionStorage.getItem("authorization")
                }
            })
            .then((res) => {
                var data = res.data.data;
                this.setState({
                    relInfo: data
                })
            })
            .catch(function(error) {
                console.log(error);
            });
    }
    render() {
        return (
            <div className="tao_my">
                 <div className="tao_myhead">
                    <section><img src={showAvatar(this.state.relInfo.avatar)} alt=""/></section>
                    <section>
                        <p className="username">{this.state.relInfo.username}</p>
                     
                    </section>
                   
                 </div>    
                 <div className="tao_myBody">
                    <ul>
                            <li className="set">
                               
                            </li>
                         <Link to={"/kuangfront/information"}>
                        <li>
                            <div><i className="icon iconfont icon-jibenxinxi"></i><FormattedMessage
                            id='information'
                             defaultMessage = "基本信息"
                        /></div>
                            <div><i className="icon iconfont icon-jiantou"></i></div>
                        </li>
                         </Link>  
                        <Link to={"/kuangfront/safely"}>
                            <li>
                                <div><i className="icon iconfont icon-anquan"></i><FormattedMessage
                            id='safe'
                             defaultMessage = "账户安全"
                        /></div>
                                <div><i className="icon iconfont icon-jiantou"></i></div>
                            </li>
                        </Link>
                        <Link to={"/kuangfront/setting"}>
                        <li>
                          <div>  <i className="icon iconfont icon-shezhi1"></i><FormattedMessage
                            id='setup'
                             defaultMessage = "系统设置"
                        /></div>
                            <div><i className="icon iconfont icon-jiantou"></i></div>
                        </li>
                        </Link>
                        <Link to={"/kuangfront/share"}>
                        <li>
                          <div>  <i className="icon iconfont icon-erweima1688"></i><FormattedMessage
                            id='shareQR'
                             defaultMessage = "分享二维码"
                        /></div>
                            <div><i className="icon iconfont icon-jiantou"></i></div>
                        </li>
                        </Link>
                       
                        
                    </ul>
                    <div className="outlogin" onClick={() => alert(this.props.intl.formatMessage({
                                        id: 'sureOut'
                                    }), '', [
                        { text: this.props.intl.formatMessage({
                                        id: 'appealcancel'
                                    }), onPress: () => console.log('取消') },
                        {
                            text: this.props.intl.formatMessage({
                                        id: 'sure'
                                    }),
                            onPress: () => new Promise((resolve) => {
                                axios.get('/kc/logout')
                                .then((res) => {
                                    if (res.data.code == '100200') {
                                        setTimeout(() =>{
                                                window.location.href = "/kuangfront/login";
                                            }, 1000)
                                            sessionStorage.removeItem('authorization');
                                            sessionStorage.removeItem('username');
                                    }
                                })
                                .catch(function(error) {
                                    console.log(error);
                                });
                            }),
                          },
                       ])
                        }>
                           <span><FormattedMessage
                            id='out'
                             defaultMessage = "退出登录"
                        /></span>
                        </div>
                 </div>

            < /div>
        )
    }
}

My.propTypes = {
    intl: intlShape.isRequired
}
export default injectIntl(My);