import React from 'react'
import Head from '@/components/common/Head'
import '@/style/Safely.css'
import "@/iconfont/iconfont.css"
import axios from 'axios'
import {
    Link
} from 'react-router-dom'
import {
    injectIntl,
    intlShape,
    FormattedMessage,
} from 'react-intl';
class Safely extends React.Component {
    constructor() {
        super();
        this.state = {
            fund: false,
            emaildis: false,
            phonedis: false

        }
    }
    componentDidMount() {
        axios.get('/kc/self/safe', {
                headers: {
                    "Content-Type": "application/json",
                    "authorization": sessionStorage.getItem("authorization")
                }
            })
            .then((res) => {
                var data = res.data.data;
                if (data.fund == true) {
                    this.setState({
                        fund: true,
                    })
                }
                if (data.email) {
                    this.setState({
                        emaildis: true
                    })
                }
                if (data.mobile) {
                    this.setState({
                        phonedis: true
                    })
                }
            })
            .catch(function(error) {
                console.log(error);
            });
    }
    render() {
        return (
            <div className="tao_safe">
                <Head />
                <div className="tao_safeInfo">
                     <ul>
                         <Link to={"/kuangfront/changepwd"}>
                            <li>
                            <FormattedMessage
                                tagName="div"
                                id='loginpwd'
                                defaultMessage = "登录密码"
                            />
                                <div><FormattedMessage
                                id='changepwd'
                                defaultMessage = "修改"
                            /><span></span><i className="icon iconfont icon-jiantou"></i></div>
                            </li>
                        </Link>
                        {
                            this.state.emaildis?
                            <li>    
                              <FormattedMessage
                                tagName="div"
                                id='emailtest'
                                defaultMessage = "邮箱验证"
                            />
                                <div><FormattedMessage
                                id='verified'
                                defaultMessage = "已验证"
                            /><i className="icon iconfont icon-jiantou"></i></div>
                            </li>:
                            <Link to={"/kuangfront/emailtest"}>
                            <li>   
                              <FormattedMessage
                                tagName="div"
                                id='emailtest'
                                defaultMessage = "邮箱验证"
                            /> 
                                <div><FormattedMessage
                                id='unverified'
                                defaultMessage = "未验证"
                            /><i className="icon iconfont icon-jiantou"></i></div>
                            </li></Link>
                        }
                        {/**
                            this.state.phonedis?
                            <li>    
                              <FormattedMessage
                                tagName="div"
                                id='phonetest'
                                defaultMessage = "手机验证"
                            />
                                <div><FormattedMessage
                                id='verified'
                                defaultMessage = "已验证"
                            /><i className="icon iconfont icon-jiantou"></i></div>
                            </li>:
                            <Link to={"/kuangfront/phonetest"}>
                            <li>    
                              <FormattedMessage
                                tagName="div"
                                id='phonetest'
                                defaultMessage = "手机验证"
                            />
                                <div><FormattedMessage
                                id='unverified'
                                defaultMessage = "未验证"
                            /><i className="icon iconfont icon-jiantou"></i></div>
                            </li></Link>
                        **/}
                            <Link to={"/kuangfront/fundpwd"}>
                            <li>    
                              <FormattedMessage
                                tagName="div"
                                id='payPwd'
                                defaultMessage = "资金密码"
                            />
                                <div>{this.state.fund?<FormattedMessage
                                id='paychange'
                                defaultMessage = "修改"
                            />:<FormattedMessage
                                id='notset'
                                defaultMessage = "未设置"
                            />}<i className="icon iconfont icon-jiantou"></i></div>
                            </li></Link>
                        
                       
                    </ul>       
                </div>
                
            </div>
        )
    }
}

Safely.propTypes = {
    intl: intlShape.isRequired
}
export default injectIntl(Safely);