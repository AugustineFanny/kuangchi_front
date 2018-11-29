import React from 'react'
import Head from '../common/Head'
import axios from 'axios'
import {
  Link,
  Redirect
} from 'react-router-dom'
import {
  limitAmount,
  limitPrice,
  codeTest
} from '../common/utils'
import {
  Picker,
  List,
  InputItem,
  DatePicker,
  ImagePicker,
  Button,
  Toast,
  Switch,
  Checkbox,
  Modal
} from 'antd-mobile';
import {
  injectIntl,
  intlShape,
  FormattedMessage,
} from 'react-intl';
import {
  createForm
} from 'rc-form';
import '@/style/Subscription.css'

class SubscriptionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cuur: [],
      price: null,
      currency: null,
      showPrice: false,
      finance: {},
      amountList: null,
      amount_fet: 0,
      editable: false,
      redirect: false,
      amount: null,
      gotoSure: false
    }
  }
  componentWillMount() {

  }
  componentDidMount() {
    this.getList();
    this.getCurr();
    // this.getCurrenciesDetail();
  }
  getList = () => {
    axios.get("/kc/self/invites", {
        headers: {
          "authorization": sessionStorage.getItem("authorization")
        }
      })
      .then(res => {
        if (res.data.code == '100103') {
          window.location.href = "/kuangfront/login";
        } else if (res.data.code == '100200') {
          this.setState({
            list: res.data.data
          })
        } else {
          Toast.fail(res.data.msg, 1);
        }
      })
  }
  getCurr = () => {
    axios.get("/kc/public/IUU/exchange", {
        headers: {
          "authorization": sessionStorage.getItem("authorization")
        }
      })
      .then(res => {
        if (res.data.code == '100103') {
          window.location.href = "/kuangfront/login";
        } else if (res.data.code == '100200') {
          var res = res.data.data;
          var arr = [];
          for (var i in res) {
            var obj = {
              'value': i,
              'label': i
            }
            arr.push(obj)
          }
          this.setState({
            cuur: arr
          })
        } else {
          Toast.fail(res.data.msg, 1);
        }
      })
  }
  isValidFloat(str) {
    return /^[0-9.]+$/.test(str);
  }
  changeCurr = (value) => {
      var val = value[0];
      axios.get("/kc/public/IUU/exchange", {
          headers: {
            "authorization": sessionStorage.getItem("authorization")
          }
        })
        .then(res => {
          if (res.data.code == '100103') {
            window.location.href = "/kuangfront/login";
          } else if (res.data.code == '100200') {
            var res = res.data.data;

            this.setState({
              showPrice: true,
              price: res[val],
              currency: val,
              editable: true,
              amount: null,
              amount_fet: 0
            }, () => {
              // this.getCurrenciesDetail(val)
            })
          } else {
            Toast.fail(res.data.msg, 1);
          }
        })
    }
    // getCurrenciesDetail(curr) {
    //     axios.get('/kc/public/currencies/detail?flag=all')
    //       .then(res => {
    //         if (res.data.code == "100200") {
    //           var currencies = res.data.data;
    //           var finance = {};
    //           for (var i in currencies) {
    //             var raw = currencies[i];
    //             finance[[raw.currency]] = {
    //               "amount": 0,
    //               "lockAmount": 0,
    //               "usableAmount": 0
    //             };
    //           }
    //         }
    //         var val = curr;
    //         this.setState({
    //           finance: finance
    //         }, () => {
    //           this.getTotalassets(val);
    //         });
    //       })
    //   }
    //总资产
    // getTotalassets(curr) {
    //     axios.get('/kc/wallet/finance', {
    //         headers: {
    //           "Content-Type": "application/json",
    //           "authorization": sessionStorage.getItem("authorization")
    //         }
    //       })
    //       .then((res) => {
    //         if (res.data.data) {
    //           this.setState({
    //             data: res.data.data
    //           })
    //         }
    //         var oldFinance = {...this.state.finance
    //         };
    //         var finance = res.data.data;
    //         for (var index in finance) {
    //           var raw = finance[index];
    //           if (raw.currency in oldFinance) {
    //             oldFinance[raw.currency].amount = raw.amount;
    //             oldFinance[raw.currency].lockAmount = raw.lock_amount;
    //             oldFinance[raw.currency].usableAmount = limitAmount(raw.amount - raw.lock_amount);
    //           }
    //         }
    //         this.setState({
    //           amountList: oldFinance[curr]
    //         });
    //       })
    //       .catch(function(error) {
    //         console.log(error);
    //       });
    // }

  changeAmount = (val) => {
    var price = this.state.price;
    var amount_fet;
    amount_fet = val * price;
    var amount_fet = amount_fet.toString();
    var l = amount_fet.split(".");
    if (l.length > 1 && l[1].length > 2) {
      amount_fet = Number(limitPrice(amount_fet));
      this.setState({
        amount: val,
        amount_fet: amount_fet
      })
    } else {
      amount_fet = Number(amount_fet);
      this.setState({
        amount: val,
        amount_fet: amount_fet
      })
    }
    // this.setState({
    //   amount: val,
    //   amount_fet: amount_fet
    // })
  }
  limitBtc = (num) => {
    return Math.floor(num * 1000000) / 1000000
  }
  changeable = (val) => {
    var price = this.state.price;
    var amount = val / price;
    var amount = amount.toString();
    var l = amount.split(".");
    if (l.length > 1 && l[1].length > 2) {
      amount = String(this.limitBtc(amount))
      this.setState({
        amount: amount,
        amount_fet: val
      })
    } else {
      amount = String(amount);
      this.setState({
        amount: amount,
        amount_fet: val
      })
    }
  }
  changePwd = () => {
    this.setState({
      redirect: true
    });
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (values["base"] == undefined) {
        Toast.fail(this.props.intl.formatMessage({
          id: 'nocuur'
        }), 1.5);
        return;
      }
      if (this.state.amount == undefined) {
        Toast.fail(this.props.intl.formatMessage({
          id: 'AmountInto'
        }), 1.5);
        return;
      }
      if (values["fund_password"] == undefined) {
        Toast.fail(this.props.intl.formatMessage({
          id: 'fundMsg2'
        }), 1.5);
        return;
      }
      if (!err) {
        this.setState({
          unclick: true
        })
        values['base'] = values['base'][0];
        values['amount'] = Number(this.state.amount);
        values['cur_amount'] = Number(this.state.amount_fet);
        axios.post("/kc/wallet/orders", values, {
            headers: {
              "Content-Type": "application/json",
              "authorization": sessionStorage.getItem("authorization")
            }
          })
          .then(res => {
            if (res.data.code == "100200") {
              this.props.form.resetFields();
              this.setState({
                showPrice: false,
                order: res.data.data,
                gotoSure: true
              })
            } else if (res.data.code == "100102") {
              Toast.fail(res.data.msg, 1.5);
            } else {
              codeTest(this.props, res.data.code)
            }
            if (res) {
              this.setState({
                unclick: false
              })
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
    // var usableAmount;
    // if (this.state.amountList) {
    //   usableAmount = this.state.amountList.usableAmount
    // } else {
    //   usableAmount = 0;
    // }
    var ratio;
    var placeholder;
    var placeholder2;
    var extra;
    var extra2;
    if (this.state.showPrice) {
      ratio = `1 ${this.state.currency} = ${this.state.price} IUU`;
      // placeholder = this.props.intl.formatMessage({
      //   id: 'ableUse'
      // }) + `${usableAmount} `;
      placeholder2 = `${ this.state.amount_fet}`;
      extra = <div>{this.state.currency} </div>;
      extra2 = <div> IUU</div>;
    }
    if (this.state.redirect) {
      return <Redirect push to="/kuangfront/fundpwd" />;
    }
    if (this.state.gotoSure) {
      return <Redirect push to = {
        {
          pathname: '/kuangfront/subinfo',
          state: {
            order: this.state.order,
          }
        }
      }
      />;
    }
    return (
      <div className="Subscription">
                  <Head />
                   <List style={{ backgroundColor: 'white' }} className="picker-list">
                      <Picker data={this.state.cuur} extra={this.props.intl.formatMessage({
                                  id: 'select'
                              })} okText={this.props.intl.formatMessage({
                                  id: 'ok'
                              })} dismissText={this.props.intl.formatMessage({
                                  id: 'no'
                              })}
                              cols={1} {...getFieldProps('base',{
                           onChange: this.changeCurr
                    })} className="forss"  >
                      <List.Item arrow="horizontal"><FormattedMessage
                            id='cuur'
                            defaultMessage="交易币种"
                        /></List.Item>
                    </Picker>
                      <InputItem className="trad_price"
                          value={ratio}
                          editable={false}
                        ><FormattedMessage
                            id='Proportion'
                            defaultMessage="兑换比例"
                        /></InputItem>
                      <InputItem
                            {...getFieldProps('amount',{
                                onChange:this.changeAmount
                            })}
                            placeholder={null}
                            extra={extra}
                            clear
                            type="digit"
                            value={this.state.amount}
                            // error={!!getFieldError('amount')}
                            editable={this.state.editable}
                            onErrorClick={() => {
                              Toast.fail(this.props.intl.formatMessage({
                                  id: 'adErr2'
                              }), 2);
                            }}
                      ><FormattedMessage
                            id='sellAmount'
                            defaultMessage="数量"
                        /></InputItem>
                          <InputItem
                            {...getFieldProps('able',{
                                onChange:this.changeable
                            })}
                            value={placeholder2}
                            extra={extra2}
                            clear
                            type="digit"
                            // value={this.state.amount}
                            // error={!!getFieldError('amount')}
                            editable={this.state.editable}
                            onErrorClick={() => {
                              Toast.fail(this.props.intl.formatMessage({
                                  id: 'adErr2'
                              }), 2);
                            }}
                      ><i className="icon iconfont icon-zhuanhuan"></i></InputItem>
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
                     <div className="subBtn">
                          <Button disabled={this.state.unclick} type="primary" inline onClick={this.handleSubmit}>   <FormattedMessage
                                        id='subscription'
                                        defaultMessage="认购"
                                    /></Button>
                     </div>
               </div>
    )
  }
}
const Subscription = createForm()(SubscriptionForm);

Subscription.propTypes = {
  intl: intlShape.isRequired
}
export default injectIntl(Subscription);