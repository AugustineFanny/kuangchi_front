import React from 'react'
import {
  Carousel,
} from 'antd-mobile';
import Head from '@/components/common/Head'
import Account from '@/components/common/Account'
import axios from 'axios'
import {
  Link,
  Redirect
} from 'react-router-dom'
import '@/style/Switchto.css'
import {
  createForm
} from 'rc-form';
import {
  List,
  InputItem,
  Button,
  Toast,
  Modal
} from 'antd-mobile';
import {
  injectIntl,
  intlShape,
  FormattedMessage,
  defineMessages
} from 'react-intl';
import {
  codeTest
} from '@/components/common/utils';

class SwitchtoForm extends React.Component {
  constructor() {
    super();
    this.state = {
      redirect: false,
      unclick: false,
    }
  }
  componentDidMount() {

  }
  changePwd = () => {
    this.setState({
      redirect: true
    });
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      const form = this.props.form;
      var amount = form.getFieldValue("amount");
      var fund_password = form.getFieldValue("fund_password");
      if (amount == undefined || amount == "") {
        Toast.fail(this.props.intl.formatMessage({
          id: 'AmountInto'
        }), 1.5);
        return;
      }
      if (fund_password == undefined || fund_password == "") {
        Toast.fail(this.props.intl.formatMessage({
          id: 'ito_input_join1'
        }), 1.5);
        return;
      }
      if (!err) {
        this.setState({
          unclick: true
        })
        values.amount = Number(values["amount"]);
        axios.post("/kc/wallet/" + "FET" + "/locked", values, {
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
              setTimeout(() => {
                window.location.reload();
              }, 500)
            } else if (res.data.code == "100102") {
              Toast.fail(res.data.msg, 1.5);
            } else {
              codeTest(this.props, res.data.code)
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
    if (this.state.redirect) {
      return <Redirect push to="/kuangfront/fundpwd" />;
    }
    return (
      <div className="Switchto">
          <Head />
          <Account />
          <ul className="headul">
           <li>    
              <div><i className="icon iconfont icon-bangzhuzhongxin"></i><FormattedMessage
                                id='Prompt'
                                defaultMessage = "友情提示"
                             /></div>
              <div></div>
          </li>
           <div className="prompt">  
                 <FormattedMessage
                  tagName="div"
                  id='PromptInfo'
                  defaultMessage = "FET转入矿池，锁定时间将从当前日期开始自动延后60天"
               />  
          </div>
          </ul>
           <List style={{ backgroundColor: 'white' }} className="picker-list">
                         <InputItem
                          {...getFieldProps('amount', {
                            rules: [
                              { required: true, message: "请输入数量" },
                            ],
                          })}
                          clear
                          type="digit"
                          error={!!getFieldError('amount')}
                          onErrorClick={() => {
                            Toast.fail( "请输入数量", 2);
                          }}
                        ><FormattedMessage
                                id='turnAmount'
                                defaultMessage = "转入数量"
                             /></InputItem>
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
                                id='turnin'
                                defaultMessage = "转入"
                             /></Button>
                     </div>    
      </div>

    )
  }
}

const Switchto = createForm()(SwitchtoForm);

Switchto.propTypes = {
  intl: intlShape.isRequired
}
export default injectIntl(Switchto);