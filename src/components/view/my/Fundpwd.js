import React from 'react'
import Head from '@/components/common/Head'
import '@/style/Safely.css'
import "@/iconfont/iconfont.css"
import axios from 'axios'
import {
    List,
    InputItem,
    Button,
    Toast,
    Modal
} from 'antd-mobile';
import {
    createForm
} from 'rc-form';
import {
    injectIntl,
    intlShape,
    FormattedMessage,
} from 'react-intl';
import {
    codeTest
} from '@/components/common/utils';
const alert = Modal.alert;
class FundpwdForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isDisabled: false,
            buttonText: this.props.intl.formatMessage({
                id: 'getCode'
            }),
            countdown: 0,
            defaultValue: "EMAIL",
            method: this.props.intl.formatMessage({
                id: 'emailReg'
            }),
            fundpwdErr: false,
            fundpwdError: "",
            checkfundpwd: false,
            checkErr: "",
            iftrue: "",
            iftrue2: ""
        }
    }
    changeMethod = (e) => {
        this.setState({
            defaultValue: e.target.value
        })
    }
    fundpwdErr = () => {
        Toast.fail(`${
            this.state.fundpwdError
        }`, 2);
    }
    checkpwdErr = () => {
        Toast.fail(`${
            this.state.checkErr
        }`, 2);
    }
    checkpwd = (rule, value, callback) => {
        const form = this.props.form;
        if (value && !(/(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^.{6,16}$/.test(value))) {
            this.setState({
                fundpwdErr: true,
                iftrue: "no",
                fundpwdError: this.props.intl.formatMessage({
                    id: 'ito_forget_input6'
                })
            })
        } else if (value == "") {
            this.setState({
                fundpwdErr: true,
                iftrue: "no",
                fundpwdError: this.props.intl.formatMessage({
                    id: 'fundMsg2'
                })
            })
        } else {
            this.setState({
                fundpwdErr: false,
                iftrue: "yes"
            })
        }
    }
    checkfundPwd = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('fund_password')) {
            this.setState({
                checkfundpwd: true,
                iftrue2: "no",
                checkErr: this.props.intl.formatMessage({
                    id: 'fundMsg3'
                })
            })
        } else if (value == "") {
            this.setState({
                iftrue2: "no",
                checkfundpwd: true,
                checkErr: this.props.intl.formatMessage({
                    id: 'fundMsg3'
                })
            })
        } else {
            this.setState({
                checkfundpwd: false,
                iftrue2: "yes",
            })
        }
    }
    captcha = () => {
        var that = this;
        var mode = this.state.defaultValue;
        axios.get('/kc/self/verify-code', {
                params: {
                    "mode": mode,
                    "type": "FUNDPASSWORD"
                },
                headers: {
                    "Content-Type": "application/json",
                    "authorization": sessionStorage.getItem("authorization")
                }
            })
            .then((res) => {
                if (res.data.code == "100200") {
                    this.setState({
                        isDisabled: true,
                        buttonText: '60s',
                        countdown: 60
                    });
                    let int = setInterval(() => {
                        let countdown = this.state.countdown - 1;
                        if (countdown > 0) {
                            this.setState({
                                buttonText: countdown + 's',
                                countdown: countdown
                            });
                        } else {
                            this.setState({
                                buttonText: this.props.intl.formatMessage({
                                    id: 'getCode'
                                }),
                                isDisabled: false
                            });
                            clearInterval(int);
                        }
                    }, 1000);
                } else {
                    codeTest(this.props, res.data.code)
                }
            })
            .catch(function(error) {
                console.log(error);
            });
    }
    handleSubmit = (e) => {
        e.preventDefault();

        const form = this.props.form;
        var verify_code = form.getFieldValue("verify_code");
        var fund_password = form.getFieldValue("fund_password");
        var check_password = form.getFieldValue("check_password");
        var mode = this.state.defaultValue;
        if (verify_code == undefined || verify_code == "") {
            Toast.fail(this.props.intl.formatMessage({
                id: 'loginInput3'
            }), 1.5);
        }
        if (fund_password == undefined || fund_password == "") {
            Toast.fail(this.props.intl.formatMessage({
                id: 'fundMsg2'
            }), 1.5);
        }
        if (check_password == undefined || check_password == "") {
            Toast.fail(this.props.intl.formatMessage({
                id: 'fundMsg3'
            }), 1.5);
        }
        if (verify_code && fund_password && check_password && this.state.iftrue == "yes" && this.state.iftrue2 == "yes") {

            axios.post("/kc/self/fund-password", {
                    verify_mode: mode,
                    verify_code: verify_code,
                    fund_password: fund_password,
                    check_password: check_password
                }, {
                    headers: {
                        "Content-Type": "application/json",
                        "authorization": sessionStorage.getItem("authorization")
                    }
                })
                .then(res => {
                    if (res.data.code == "100200") {
                        Toast.success(this.props.intl.formatMessage({
                            id: 'success2'
                        }), 1.5);
                        setTimeout(function() {
                            window.location.reload();
                        }, 1000)

                    } else {
                        codeTest(this.props, res.data.code)
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        }

    }
    render() {
        const {
            getFieldProps,
            getFieldError,
        } = this.props.form;
        return (
            <div>
                <Head />   
                <div className="tao_fundPwd">
                    <List style={{ backgroundColor: 'white' }} className="picker-list">
                    <List.Item>
                    <div className="tao_fundMethod" onClick={() => alert(this.props.intl.formatMessage({
                                    id: 'choseMethod'
                                }), <div></div>, [
                     
                      /**{ text: this.props.intl.formatMessage({
                                    id: 'phone1'
                                }), onPress: () => this.setState({
                        method:this.props.intl.formatMessage({
                                    id: 'phone1'
                                }),
                        defaultValue:"SMS"
                      }) },**/
                        { text: this.props.intl.formatMessage({
                                    id: 'emailReg'
                                }), onPress: () => this.setState({
                        method:this.props.intl.formatMessage({
                                    id: 'emailReg'
                                }),
                        defaultValue:"EMAIL"
                      }) },
                    ])}
                    ><FormattedMessage
                            id='method'
                            defaultMessage="验证方式"
                        /><span>{this.state.method}<i className="icon iconfont icon-jiantou"></i></span>  </div>
                       
                     </List.Item>
                    <List.Item
                          extra={<Button type="ghost" size="small" inline onClick={this.captcha} disabled={this.state.isDisabled}>{this.state.buttonText}</Button>}
                          multipleLine
                        >
                        <FormattedMessage
                            id='loginInput4'
                            defaultMessage="输入验证码"
                        />
                          <List.Item.Brief>
                            <InputItem
                          {...getFieldProps('verify_code', {
                          })}
                          clear
                          type="email"
                          error={!!getFieldError('verify_code')}
                          onErrorClick={() => {
                            Toast.fail(this.props.intl.formatMessage({
                                    id: 'regTitle6'
                                }), 2);
                          }}
                        ></InputItem>
                          </List.Item.Brief>
                    </List.Item>
                    <List.Item>
                     <FormattedMessage
                            tagName="p"
                            id='fundPwd1'
                            defaultMessage="输入资金密码"
                        />
                      <List.Item.Brief>
                       <InputItem
                          {...getFieldProps('fund_password', {
                            rules: [
                              { required: true, message: '输入你的资金密码' },
                                 {
                                  validator: this.checkpwd,
                                }
                            ],
                          })}
                          clear
                            type="password"
                            error={this.state.fundpwdErr}
                            onErrorClick={this.fundpwdErr}
                        ></InputItem>
                      </List.Item.Brief>
                    </List.Item>  
                      <List.Item>
                       <FormattedMessage
                            tagName="p"
                            id='surefundPwd'
                            defaultMessage="再次输入你的资金密码"
                        />
                      <List.Item.Brief>
                       <InputItem
                          {...getFieldProps('check_password', {
                            rules: [
                              { required: true, message: '再次输入你的资金密码' },
                              {
                                  validator: this.checkfundPwd,
                                }
                            ],
                          })}
                            clear
                            type="password"
                            error={this.state.checkfundpwd}
                            onErrorClick={this.checkpwdErr}
                        ></InputItem>
                      </List.Item.Brief>
                    </List.Item>  
                        
                      
                   </List> 
        <div className="tao_fundBtn">
                      <Button  type="primary" inline onClick={this.handleSubmit} ><FormattedMessage
                            id='submit'
                            defaultMessage="提交"
                        /></Button>
                     </div>    
                </div> < /div>
        )
    }
}
const Fundpwd = createForm()(FundpwdForm);
Fundpwd.propTypes = {
    intl: intlShape.isRequired
}
export default injectIntl(Fundpwd);