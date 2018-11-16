import React from 'react'
import Head from '@/components/common/Head'
import '@/style/Deposit.css'
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
    Link,
    Redirect
} from 'react-router-dom'
import {
    showDatetime
} from '@/components/common/utils'
import {
    injectIntl,
    intlShape,
    FormattedMessage,
    defineMessages
} from 'react-intl';
const alert = Modal.alert;



class BasicInputExample extends React.Component {
    constructor(props) {
        super(props);
        var activeKey = null;
        if (this.props.location.state) {
            activeKey = this.props.location.state.currency;
        }
        this.state = {
            buttonText: this.props.intl.formatMessage({
                id: 'getCode'
            }),
            method: this.props.intl.formatMessage({
                id: 'emailReg'
            }),
            defaultValue: "EMAIL",
            redirect: false,
            unclick: false,
            methods: "withdraw",
            activeKey: activeKey,
            maxNum: 0,
        }
    }

    componentDidMount() {
        this.getCurrenciesDetail()
    }
    getCurrenciesDetail = () => {
            axios.get('/kc/public/currencies/detail?flag=all')
                .then(res => {
                    var currenciesList = res.data.data
                    this.setState({
                        currenciesList
                    });
                    for (var i in currenciesList) {
                        if (currenciesList[i].currency == this.state.activeKey) {
                            // this.recharge(this.state.activeKey);
                            // this.setState({
                            //     currList: currenciesList[i]
                            // })
                            this.getMaxnum(this.state.activeKey)
                        }
                    }

                })
        }
        //验证码判断
    captcha = () => {
        var that = this;
        var mode = this.state.defaultValue;
        axios.get('/kc/self/verify-code', {
                params: {
                    "mode": mode,
                    "type": "TRANSFEROUT"
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
                            })
                            clearInterval(int);
                        }

                    }, 1000);
                } else {
                    Toast.fail(res.data.msg, 1.5)
                }

            })
            .catch(function(error) {
                console.log(error);
            });
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            const form = this.props.form;
            var verify_code = form.getFieldValue("verify_code");
            var fund_password = form.getFieldValue("fund_password");
            if (verify_code == undefined || verify_code == "") {
                Toast.fail(this.props.intl.formatMessage({
                    id: 'loginInput3'
                }), 1.5);
            }
            if (fund_password == undefined || fund_password == "") {
                Toast.fail(this.props.intl.formatMessage({
                    id: 'ito_input_join1'
                }), 1.5);
            }
            if (!err && verify_code && fund_password) {
                this.setState({
                    unclick: true
                })
                values.currency = this.state.activeKey;
                values.method = this.state.methods;
                values.verify_mode = this.state.defaultValue;
                values.amount = Number(values["amount"]);
                axios.post("/kc/wallet/transfer-out", values, {
                        headers: {
                            "Content-Type": "application/json",
                            "authorization": sessionStorage.getItem("authorization"),
                        }
                    })
                    .then(res => {
                        if (res.data.code == "100200") {
                            Toast.success(this.props.intl.formatMessage({
                                id: 'success2'
                            }), 1.5);
                            this.props.form.resetFields();
                            this.setState({
                                isDisabled: false
                            });
                        } else {
                            Toast.fail(res.data.msg, 1.5)
                        }
                        this.setState({
                            unclick: false
                        })
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }
        });
    }
    getMaxnum(currency) {
        axios.get('/kc/wallet/usable/' + currency, {
                params: {
                    "mode": "ALL"
                },
                headers: {
                    "Content-Type": "application/json",
                    "authorization": sessionStorage.getItem("authorization")
                }
            })
            .then((res) => {
                var maxNum = res.data.data;
                this.setState({
                    maxNum: maxNum,
                    data: maxNum
                })
            })
            .catch(function(error) {
                console.log(error);
            });
    }

    changePwd = () => {
        this.setState({
            redirect: true
        });
    }
    render() {
        const {
            getFieldProps,
            getFieldError,
        } = this.props.form;
        const messages = defineMessages({
            placeholder: {
                id: 'wdrlmessage4',
                defaultMessage: '您最多可以转出{maxNum} {activeKey}',
                values: {
                    maxNum: this.state.maxNum,
                    activeKey: this.state.activeKey
                }
            },
        });
        if (this.state.redirect) {
            return <Redirect push to="/kuangfront/fundpwd" />;
        }
        return (
            <div className="otc_deposit">
				<Head />
				<div className="deposit_Info">
					 <List style={{ backgroundColor: 'white' }} className="picker-list">
					 	 <InputItem
                          {...getFieldProps('address', {
                            rules: [
                              { required: true, message: this.props.intl.formatMessage({
                                        id: 'wdrlmessage1'
                                    }) },
                            ],
                          })}
                          clear
                          error={!!getFieldError('address')}
                          onErrorClick={() => {
                            Toast.fail(this.props.intl.formatMessage({
                                        id: 'wdrlmessage1'
                                    }), 2);
                          }}
                          placeholder={this.props.intl.formatMessage({
                                        id: 'wdrlmessage1'
                                    })}
                        ><FormattedMessage
                            id='recharge_addr'
                            defaultMessage="地址"
                        />  </InputItem>
                         <InputItem
                          {...getFieldProps('amount', {
                            rules: [
                              { required: true, message: this.props.intl.formatMessage({
                                        id: 'wdrlmessage2'
                                    }) },
                            ],
                          })}
                          clear
                          type="digit"
                          error={!!getFieldError('amount')}
                          onErrorClick={() => {
                            Toast.fail(this.props.intl.formatMessage({
                                        id: 'wdrlmessage2'
                                    }), 2);
                          }}
                          placeholder={this.props.intl.formatMessage(messages.placeholder,{ maxNum: this.state.maxNum,activeKey:this.state.activeKey })}
                        ><FormattedMessage
                            id='sellAmount'
                            defaultMessage="数量"
                        /> </InputItem>
                         <List.Item>
		                    <div className="tao_deposit" onClick={() => alert(this.props.intl.formatMessage({
                                        id: 'choseMethod'
                                    }), <div></div>, [
		                      
		                      /**{ text: this.props.intl.formatMessage({
                                        id: 'phone1'
                                    }), onPress: () => this.setState({
		                        method: this.props.intl.formatMessage({
                                        id: 'phone1'
                                    }),
		                        defaultValue:"SMS"
		                      }) },**/
                                    { text: this.props.intl.formatMessage({
                                        id: 'emailReg'
                                    }), onPress: () => this.setState({
                                method: this.props.intl.formatMessage({
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
                            id='code1'
                            defaultMessage="验证码"
                        />
                          <List.Item.Brief>
                            <InputItem
                          {...getFieldProps('verify_code', {
                          })}
                          clear
                          error={!!getFieldError('verify_code')}
                          onErrorClick={() => {
                            Toast.fail(this.props.intl.formatMessage({
                                        id: 'loginInput3'
                                    }), 2);
                          }}
                        ></InputItem>
                          </List.Item.Brief>
                    </List.Item>
                    <List.Item
                          extra={<Button type="ghost" size="small" inline onClick={this.changePwd} ><FormattedMessage
                            id='ito_forget'
                            defaultMessage="忘记密码"
                        /> </Button>}
                          multipleLine
                        >
                         <FormattedMessage
                            id='Capitalcipher'
                            defaultMessage="资金密码"
                        />
                          <List.Item.Brief>
                            <InputItem
                          {...getFieldProps('fund_password', {
                          })}
                          clear
                          type="password"
                          error={!!getFieldError('fund_password')}
                          onErrorClick={() => {
                            Toast.fail(this.props.intl.formatMessage({
                                        id: 'ito_input_join1'
                                    }), 2);
                          }}
                        ></InputItem>
                          </List.Item.Brief>
                    </List.Item>
                       
					 </List>
					   <div className="tao_fundBtn">
                      <Button   type="primary" inline onClick={this.handleSubmit} ><FormattedMessage
                            id='sureWdrl'
                            defaultMessage="确认提币"
                        /> </Button>
                     </div>    
				</div> < /div>
        )
    }
}
const Deposit = createForm()(BasicInputExample);

Deposit.propTypes = {
    intl: intlShape.isRequired
}
export default injectIntl(Deposit);