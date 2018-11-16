import React from 'react'
import Head from '../common/Head'
import '@/style/Safely.css'
import axios from 'axios'
import {
    List,
    InputItem,
    Button,
    Toast,
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

class PhonetestForm extends React.Component {
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
    captcha = () => {
        var that = this;
        let value = this.props.form.getFieldValue("ident");
        let country_code = this.props.form.getFieldValue("country_code")[0];
        if (value == undefined || value == "") {
            Toast.fail(this.props.intl.formatMessage({
                id: 'phonetnumber'
            }), 1.5);
        } else if (value && this.fChkMail(value) == false) {
            Toast.fail(this.props.intl.formatMessage({
                id: 'phoneMsg1'
            }), 1.5);
        } else {
            axios.get('/kc/self/send-bind-captcha', {
                    params: {
                        "ident": value,
                        "country_code": country_code
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
                        Toast.success(res.data.msg, 1.5);
                    }

                })
                .catch(function(error) {
                    console.log(error);
                });
        }

    }
    fChkMail = (szMail) => {
        var szReg = /^\d+$/;
        var bChk = szReg.test(szMail);
        return bChk;
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            var ident = this.props.form.getFieldValue("ident")
            if (ident == undefined || ident == "") {
                Toast.fail(this.props.intl.formatMessage({
                    id: 'phonetnumber'
                }), 1.5);
            }
            if (!err && ident) {
                values["country_code"] = values["country_code"][0];
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
                <div className="tao_emailtest tao_phonetest">
                    <List style={{ backgroundColor: 'white' }} className="picker-list">
                     <Picker className="choseArea" data={this.area} cols={1} {...getFieldProps('country_code',{
                                initialValue:["86"]
                            })} className="forss"  onOk={v => console.log(v)} >
                              <List.Item arrow="horizontal">地区</List.Item>
                            </Picker>
                    <List.Item
                          extra={<Button type="ghost" size="small" inline onClick={this.captcha} disabled={this.state.isDisabled}>{this.state.buttonText}</Button>}
                          multipleLine
                        >
                        <FormattedMessage
                            id='phonetnumber1'
                            defaultMessage="输入你的手机号码"
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
                                id: 'phonetnumber'
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
                      <Button  type="primary" inline onClick={this.handleSubmit}><FormattedMessage
                            id='Improve_validation'
                        /></Button>
                     </div>
                </div>
            </div>
        )
    }
}
const Phonetest = createForm()(PhonetestForm);
Phonetest.propTypes = {
    intl: intlShape.isRequired
}
export default injectIntl(Phonetest);