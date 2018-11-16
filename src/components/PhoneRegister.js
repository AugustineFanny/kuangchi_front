import React from 'react'
import '../style/PhoneRegister.css'
import axios from 'axios'
import {
    Link
} from 'react-router-dom'

import {
    List,
    InputItem,
    WhiteSpace,
    Toast,
    Checkbox,
    Flex,
    Button,
    Modal,
    Picker
} from 'antd-mobile';
import {
    createForm
} from 'rc-form';
import {
    injectIntl,
    intlShape,
    FormattedMessage,
} from 'react-intl';
const alert = Modal.alert;

const CheckboxItem = Checkbox.CheckboxItem;
const AgreeItem = Checkbox.AgreeItem;
const fail = (msg) => {
    Toast.fail(msg);
};
//清除字符串空格的函数
function telNumber(num) {
    while (num.indexOf(" ") != -1) {
        num = num.replace(" ", "");
    }
    return num
}
class BasicInputExample extends React.Component {

    state = {
        isDisabled: false,
        buttonText: this.props.intl.formatMessage({
            id: 'getCode'
        }),
        countdown: 0,
        isDisabled1: false,
        defaultValue: "SMS",
        method: this.props.intl.formatMessage({
            id: 'phone1'
        }),
    };
    componentDidMount() {
        //获取邀请码
        var qs = (function(a) {
            if (a == "") return {};
            var b = {};
            for (var i = 0; i < a.length; ++i) {
                var p = a[i].split('=');
                if (p.length != 2) continue;
                b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
            }
            return b;
        })(window.location.search.substr(1).split('&'));

        if (qs["i"]) {
            sessionStorage.setItem("inviteCode", qs["i"])
        }
    }
    area = [{
        "value": "93",
        "label": "阿富汗 93",
    }, {
        "value": "260",
        "label": "赞比亚 260",
    }, {
        "value": "86",
        "label": "中国 86",
    }, {
        "value": "84",
        "label": "越南 84",
    }, {
        "value": "967",
        "label": "也门 967",
    }, {
        "value": "60",
        "label": "马来西亚 60",
    }]

    handleClick = () => {
        var ident = this.props.form.getFieldValue("ident");
        if (!ident) {
            Toast.success(this.props.intl.formatMessage({
                id: 'phoneNum2'
            }), 1.5);
            return;
        }

        var captcha = this.props.form.getFieldValue("captcha");
        if (!captcha) {
            Toast.success(this.props.intl.formatMessage({
                id: 'loginInput3'
            }), 1.5);
            return;
        }


        this.props.form.validateFields((err, values) => {
            if (!err) {

                var inviteCode = sessionStorage.getItem("inviteCode");
                if (inviteCode)
                    values["invite_code"] = inviteCode;
                values["country_code"] = values["country_code"][0];

                axios.post("/kc/register-captcha", values, {
                        headers: {
                            "Content-Type": "application/json",
                        }
                    })
                    .then(res => {
                        if (res.data.code == '100200') {

                            sessionStorage.setItem("ident", values.ident);
                            sessionStorage.setItem("captcha", values.captcha);
                            sessionStorage.setItem("country_code", values.country_code);
                            window.location.href = "/kuangfront/registerafter";
                        } else {
                            Toast.fail(res.data.msg, 1.5);
                        }
                    })
                    .catch(err => {
                        console.log(err)

                    })
            }
        });
    }

    //验证码判断
    captcha = () => {
            let value = this.props.form.getFieldValue("ident");
            let country_code = this.props.form.getFieldValue("country_code")[0];
            if (!value) {
                Toast.success(this.props.intl.formatMessage({
                    id: 'phoneNum2'
                }), 1.5);
                return;
            }

            axios.get('/kc/captcha/send-captcha', {
                    params: {
                        "ident": value,
                        "country_code": country_code,
                        "type": "REGISTER"
                    }
                })
                .then(res => {
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
                        fail(res.data.msg)
                        console.log(res.data.msg)
                    }
                })
                .catch(function(error) {
                    console.log(error);
                });
        }
        //复选框判断
    isCheck = (e) => {
        if (e.target.checked == false) {

            this.setState({
                isDisabled1: true,
            })
            Toast.fail(this.props.intl.formatMessage({
                id: 'regTitle4'
            }), 1)

            return;
        } else {
            this.setState({
                isDisabled1: false,
            })
        }
    }

    render() {
        const {
            getFieldProps
        } = this.props.form;
        return (
            <div className="phoneregister">
                <section><p><Link to="/kuangfront/login"><FormattedMessage
                            id='login'
                             defaultMessage = "登录"
                        /></Link></p></section>
                <section>
                    <div className="otc_phoneregister">    
                        <List>
                        <FormattedMessage
                            tagName="p"
                            id="111111"
                             defaultMessage = "请选择地区"
                        />
                         <Picker data={this.area} cols={1} {...getFieldProps('country_code',{
                                initialValue:["86"]
                            })} className="forss"  onOk={v => console.log(v)} >
                              <List.Item arrow="horizontal"></List.Item>
                            </Picker>
                        <FormattedMessage
                            tagName="p"
                            id='phonetnumber'
                            defaultMessage = "请输入你的手机号"
                        />
                          <InputItem
                            {...getFieldProps('ident')}
                            placeholder={this.props.intl.formatMessage({
                                    id: 'phoneNum2'
                                })}
                          />
                          <FormattedMessage
                            tagName="p"
                            id='loginInput3'
                             defaultMessage = "请输入验证码"
                        />
                          
                         <div className="otc-code">
                                
                                <Button className="otc-code-r" onClick={this.captcha} disabled={this.state.isDisabled}>{this.state.buttonText}</Button>
                                <div className="otc-code-l">
                                     <InputItem
                                        {...getFieldProps('captcha')}
                                        placeholder={this.props.intl.formatMessage({
                                            id: 'loginInput3'
                                        })}                                     
                                     />
                                </div>
                         </div>
                         
                          <Flex>
                            <Flex.Item>
                              <AgreeItem data-seed="agreement" onChange={this.isCheck} defaultChecked>
                                 <FormattedMessage
                                     id='read'
                                /> FADAX <Link to="/kuangfront/terms"><FormattedMessage
                            id='terms'
                             defaultMessage = "服务条款"
                        /></Link>
                              </AgreeItem>
                            </Flex.Item>
                          </Flex>
                          <Button id="otc_but" onClick={this.handleClick} disabled={this.state.isDisabled1}><FormattedMessage
                            id='register'
                             defaultMessage = "注册"
                        /></Button>
                          
                        </List>
                       
                    </div> </section>

            </div>
        )
    }
}
const PhoneRegister = createForm()(BasicInputExample);
PhoneRegister.propTypes = {
    intl: intlShape.isRequired
}
export default injectIntl(PhoneRegister);