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
class ChangepwdForm extends React.Component {
  constructor() {
    super();
    this.state = {
      newPwd: false,
      newError: "",
      chechPwd: false,
      chechError: ""
    }
  }

  newPwderr = () => {
    Toast.fail(`${
            this.state.newError
        }`, 2);
  }
  checkPwderr = () => {
    Toast.fail(`${
            this.state.chechError
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
          id: 'newPwdinput'
        })
      })
    } else {
      this.setState({
        newPwd: false
      })
    }
  }
  checkPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('new_password')) {
      this.setState({
        chechPwd: true,
        chechError: this.props.intl.formatMessage({
          id: 'oldMsg3'
        })
      })
    } else if (value == "") {
      this.setState({
        chechPwd: true,
        chechError: this.props.intl.formatMessage({
          id: 'newPwdinput'
        })
      })
    } else {
      this.setState({
        chechPwd: false,
      })
    }
  }
  handleSubmit = (e) => {
    e.preventDefault();

    const form = this.props.form;
    var password = form.getFieldValue("password");
    var new_password = form.getFieldValue("new_password");
    var check_password = form.getFieldValue("check_password");
    if (password == undefined || password == "") {
      Toast.fail(this.props.intl.formatMessage({
        id: 'oldInput'
      }), 2);
    }
    if (new_password == undefined || new_password == "") {
      Toast.fail(this.props.intl.formatMessage({
        id: 'newPwdinput'
      }), 2);
    }
    if (check_password == undefined || check_password == "") {
      Toast.fail(this.props.intl.formatMessage({
        id: 'sureInput'
      }), 2);
    }
    if (new_password != check_password) {
      Toast.fail(this.props.intl.formatMessage({
        id: 'pwddiff'
      }), 1.5);
      return;
    }
    if (password && new_password && check_password) {
      var authorization = sessionStorage.getItem("authorization")
      axios.post("/kc/self/change-password", {
          "password": password,
          "new_password": new_password,
          "check_password": check_password
        }, {
          headers: {
            "Content-Type": "application/json",
            "authorization": authorization
          }
        })
        .then(res => {
          if (res.data.code != "100200") {
            codeTest(this.props, res.data.code)
          } else {
            Toast.success(this.props.intl.formatMessage({
              id: 'success'
            }), 1.5);
            setTimeout(function() {
              window.location.reload();
            }, 500)
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
      <div className="tao_changepwd">
                <Head />
                <div className="tao_changeInfo">
                 <List style={{ backgroundColor: 'white' }} className="picker-list">
                 <FormattedMessage
                      tagName="p"
                              id='oldInput'
                              defaultMessage = "输入你的当前登录密码"
                          />
                      <InputItem
                          {...getFieldProps('password', {
                            rules: [
                              { required: true, message: '输入你的当前登录密码' },
                            ],
                          })}
                          clear
                            type="password"
                          error={!!getFieldError('password')}
                          onErrorClick={() => {
                            Toast.fail(this.props.intl.formatMessage({
                              id: 'oldInput'
                            }), 2);
                          }}
                        ></InputItem>
                        <FormattedMessage
                      tagName="p"
                              id='newPwdinput'
                              defaultMessage = "输入你的新登录密码"
                          />
                      <InputItem
                          {...getFieldProps('new_password', {
                            rules: [
                              { required: true, message: '输入你的新登录密码' },
                              {
                                  validator: this.checkConfirm,
                                }
                            ],
                          })}
                          clear
                          type="password"
                          error={this.state.newPwd}
                          onErrorClick={
                            this.newPwderr
                          }
                        ></InputItem>
                        <FormattedMessage
                      tagName="p"
                              id='oldMsg3'
                              defaultMessage = "确认你的新登录密码"
                          />
                      <InputItem
                          {...getFieldProps('check_password', {
                            rules: [
                              { required: true, message: '确认你的新登录密码' },
                               {
                                  validator: this.checkPassword,
                                }
                            ],
                          })}
                          clear
                            type="password"
                          error={this.state.chechPwd}
                          onErrorClick={this.checkPwderr}
                        ></InputItem>
                   </List>     
                   <FormattedMessage
                      tagName="p"
                              id='newInput'
                              defaultMessage = "密码至少6位字符，须包含字母和数字"
                          />
                    <div className="tao_changeBtn">
                      <Button  type="primary" inline onClick={this.handleSubmit} > <FormattedMessage
                              id='changepwd'
                              defaultMessage = "修改密码"
                          /></Button>
                     </div>
                </div>
            </div>
    )
  }
}
const Changepwd = createForm()(ChangepwdForm);
Changepwd.propTypes = {
  intl: intlShape.isRequired
}
export default injectIntl(Changepwd);