import React from 'react'
import Head from '@/components/common/Head'
import '@/style/Safely.css'
import axios from 'axios'
import {
    List,
    InputItem,
    Button,
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


class EmailtestForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isDisabled: false,
            buttonText: this.props.intl.formatMessage({
                id: 'getCode'
            }),
            countdown: 0
        }
    }
    componentDidMount() {

    }

    captcha = () => {
        var that = this;
        let value = this.props.form.getFieldValue("ident");
        if (value == undefined || value == "") {
            Toast.fail(this.props.intl.formatMessage({
                id: 'emailInout'
            }), 1.5);
        } else if (value && this.fChkMail(value) == false) {
            Toast.fail(this.props.intl.formatMessage({
                id: 'errEmail'
            }), 1.5);
        } else {
            axios.get('/kc/self/send-bind-captcha', {
                    params: {
                        "ident": value,
                    },
                    headers: {
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

    }
    fChkMail = (szMail) => {
        var szReg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
        var bChk = szReg.test(szMail);
        return bChk;
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            var ident = this.props.form.getFieldValue("ident")
            if (ident == undefined || ident == "") {
                Toast.fail(this.props.intl.formatMessage({
                    id: 'emailInout'
                }), 1.5);
            }
            if (!err && ident) {
                axios.post("/kc/self/bind", values, {
                        headers: {
                            "Content-Type": "application/json",
                            "authorization": sessionStorage.getItem("authorization")
                        }
                    })
                    .then(res => {
                        if (res.data.code != "100200") {
                            Toast.fail(res.data.msg, 1.5);
                        } else {
                            Toast.success(this.props.intl.formatMessage({
                                id: 'success2'
                            }), 1.5);
                            setTimeout(() => {
                                window.location.href = "/kuangfront/safely";
                            }, 1000)
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }
        });


    }
    render() {
        const {
            getFieldProps,
            getFieldError,
        } = this.props.form;
        return (
            <div>
                <Head />
                <div className="tao_emailtest">
                    <List style={{ backgroundColor: 'white' }} className="picker-list">
                    <List.Item
                          extra={<Button type="ghost" size="small" inline onClick={this.captcha} disabled={this.state.isDisabled}>{this.state.buttonText}</Button>}
                          multipleLine
                        >
                         <FormattedMessage
                            id='regTitle6'
                            defaultMessage="输入你的邮箱地址"
                        /> 
                         
                          <List.Item.Brief>
                            <InputItem
                          {...getFieldProps('ident', {
                          })}
                          clear
                          type="email"
                          error={!!getFieldError('ident')}
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
                            id='loginInput4'
                        /> 
                      <List.Item.Brief>
                       <InputItem
                          {...getFieldProps('captcha', {
                            rules: [
                              { required: true, message: '输入验证码' },
                            ],
                          })}
                          clear
                             error={!!getFieldError('captcha')}
                          onErrorClick={() => {
                            Toast.fail(this.props.intl.formatMessage({
                                id: 'loginInput3'
                            }), 2);
                          }}
                        ></InputItem>
                      </List.Item.Brief>
                    </List.Item>  
                     
                        
                      
                   </List>     
                    <div className="tao_emailBtn">
                      <Button  type="primary" inline onClick={this.handleSubmit} > <FormattedMessage
                            id='Improve_validation'
                        /> </Button>
                     </div>
                </div>
            </div>
        )
    }
}
const Emailtest = createForm()(EmailtestForm);
Emailtest.propTypes = {
    intl: intlShape.isRequired
}
export default injectIntl(Emailtest);