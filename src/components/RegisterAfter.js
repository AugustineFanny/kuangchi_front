import React from 'react'
import '../style/RegisterAfter.css'
import axios from 'axios'
import {
    Link
} from 'react-router-dom'
import {
    List,
    InputItem,
    WhiteSpace,
    Toast
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
class BasicInputExample extends React.Component {
    state = {
        confirmDirty: false,
        newPwd: false,
        newError: "",
        chechPwd: false,
        chechError: "",
        userPwd: false,
        userError: ""
    };

    componentDidMount() {

    }

    handleConfirmBlur = (e) => {
            const value = e.target.value;
            this.setState({
                confirmDirty: this.state.confirmDirty || !!value
            });
        }
        // 用户名为4到30位的非特殊字符
    pdUsername = () => {
        Toast.fail(`${
            this.state.userError
        }`, 2);
    }
    checkUsername = (rule, value, callback) => {
        if (value && !/^[a-zA-Z]\w{3,29}$/.test(value)) {
            //Toast.fail('用户名为4到30位的非特殊字符，首字符必须为字母', 1);
            this.setState({
                userPwd: true,
                userError: this.props.intl.formatMessage({
                    id: 'regTitle5'
                })
            })
        } else if (value == "") {
            this.setState({
                userPwd: true,
                userError: this.props.intl.formatMessage({
                    id: 'regUser'
                })
            })
        } else {
            this.setState({
                userPwd: false
            })
        }
    }

    //密码至少由6位字符组成，须包含字母和数字
    newPwderr = () => {
        Toast.fail(`${
            this.state.newError
        }`, 2);
    }

    checkConfirm = (rule, value, callback) => {
            if (value && !(/(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^.{6,16}$/.test(value))) {
                this.setState({
                    newPwd: true,
                    newError: this.props.intl.formatMessage({
                        id: 'ito_forget_input6'
                    })
                })
            } else if (value == "") {
                this.setState({
                    newPwd: true,
                    newError: this.props.intl.formatMessage({
                        id: 'login_title4'
                    })
                })
            } else {
                this.setState({
                    newPwd: false
                })
            }
        }
        //确认密码
    checkPwderr = () => {
        Toast.fail(`${
            this.state.chechError
        }`, 2);
    }
    checkPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            this.setState({
                chechPwd: true,
                chechError: this.props.intl.formatMessage({
                    id: 'sureInput'
                })
            })
        } else if (value == "") {
            this.setState({
                chechPwd: true,
                chechError: this.props.intl.formatMessage({
                    id: 'sureInput'
                })
            })
        } else {
            this.setState({
                chechPwd: false,
            })
        }
    }

    handleClick = (e) => {
        e.preventDefault();
        var username = this.props.form.getFieldValue("username")
        if (!username || this.state.userPwd) {
            Toast.fail(this.props.intl.formatMessage({
                id: 'regUser'
            }), 1);
            return;
        }

        var password = this.props.form.getFieldValue("password")
        if (!password || this.state.newPwd) {
            Toast.fail(this.props.intl.formatMessage({
                id: 'login_title4'
            }), 1);
            return;
        }

        var check_password = this.props.form.getFieldValue("check_password")
        if (!check_password || this.state.chechPwd) {
            Toast.fail(this.props.intl.formatMessage({
                id: 'sureInput'
            }), 1);
            return;
        }
        if (password != check_password) {
            Toast.fail(this.props.intl.formatMessage({
                id: 'pwddiff'
            }), 1);
            return;
        }
        var values = {
            ident: sessionStorage.getItem("ident"),
            captcha: sessionStorage.getItem("captcha"),
            country_code: sessionStorage.getItem("country_code"),
            username: username,
            password: password,
            check_password: check_password
        }
        var inviteCode = sessionStorage.getItem("inviteCode");
        if (inviteCode)
            values["invite_code"] = inviteCode;
        axios.post("/kc/register", values, {
                headers: {
                    "Content-Type": "application/json",
                }
            })
            .then(res => {
                if (res.data.code == '100200') {
                    Toast.success(this.props.intl.formatMessage({
                        id: 'registersuc'
                    }), 1);
                    sessionStorage.removeItem('captcha');
                    sessionStorage.removeItem('ident');
                    sessionStorage.removeItem('country_code');
                    setTimeout(function() {
                        window.location.href = "/kuangfront/login";
                    }, 1000)

                } else {
                    codeTest(this.props, res.data.code);
                }
            })
            .catch(err => {
                console.log(err);
            })

    }
    render() {
        const {
            getFieldProps
        } = this.props.form;
        return (
            <div className="registerafter">
                <section>
                    <div className="otc_registerafter">
                        <List>
                            <FormattedMessage
                                tagName="p"
                                id='regUser'
                                defaultMessage = "请填写你的用户名"
                            />
                              <InputItem
                                    {...getFieldProps('username',{
                                        rules:[
                                      {
                                          validator: this.checkUsername
                                       }
                                    ],
                                    })}
                                    clear="editable"                                    
                                    placeholder={this.props.intl.formatMessage({
                                        id: 'regTitle9'
                                    })}
                                    error={this.state.userPwd}
                                    onErrorClick={
                                        this.pdUsername
                                    }
                                    ref={el => this.autoFocusInst = el}                                
                               >
                               </InputItem> 
                               <FormattedMessage
                                tagName="p"
                                id='password'
                                defaultMessage = "创建密码"
                            />
                              <InputItem
                                    {...getFieldProps('password',{
                                        rules:[
                                      {
                                          validator: this.checkConfirm
                                       }
                                    ],
                                    })}
                                    clear="editable"
                                    defaultValue=""
                                    placeholder={this.props.intl.formatMessage({
                                        id: 'newInput'
                                    })}
                                    type="password"
                                    error={this.state.newPwd}
                                    onErrorClick={
                                        this.newPwderr
                                    }
                                    ref={el => this.autoFocusInst = el}
                                
                               >
                               </InputItem>     
                                 <FormattedMessage
                                tagName="p"
                                id='surePwd'
                                defaultMessage = "确认密码"
                            />
                              <InputItem
                                    {...getFieldProps('check_password',{
                                        rules: [
                                           {
                                              validator: this.checkPassword,
                                            }
                                        ],
                                    })}
                                    clear="editable"
                                    defaultValue=""
                                    placeholder={this.props.intl.formatMessage({
                                        id: 'surePwd'
                                    })}
                                    type="password"
                                    error={this.state.chechPwd}
                                    onErrorClick={
                                        this.checkPwderr
                                    }
                                    ref={el => this.autoFocusInst = el}                       
                               >
                               </InputItem>     
                               <List.Item  id="otc_but">
                                    <div onClick={this.handleClick}>  <FormattedMessage
                                id='complete'
                                defaultMessage = "完成"
                            /></div>
                               </List.Item>
                        </List> 
                    </div>
                </section>
            </div>
        )
    }
}
const RegisterAfter = createForm()(BasicInputExample);
RegisterAfter.propTypes = {
    intl: intlShape.isRequired
}
export default injectIntl(RegisterAfter);