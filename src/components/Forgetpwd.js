import React from 'react'
import '../style/Forgetpwd.css'
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
//清除字符串空格的函数
function telNumber(num) {
	while (num.indexOf(" ") != -1) {
		num = num.replace(" ", "");
	}
	return num
}
const fail = (msg) => {
	Toast.fail(msg);
};
class BasicInputExample extends React.Component {
	state = {
		confirmDirty: false,
		isDisabled: false,
		buttonText: this.props.intl.formatMessage({
			id: 'getCode'
		}),
		countdown: 0,
		newPwd: false,
		newError: "",
		chechPwd: false,
		chechError: ""
	};

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
		//密码至少由6位字符组成，须包含字母和数字
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
		//确认密码
	checkPassword = (rule, value, callback) => {
		const form = this.props.form;
		if (value && value !== form.getFieldValue('check_password')) {
			this.setState({
				chechPwd: true,
				chechError: this.props.intl.formatMessage({
					id: 'pwddiff'
				})
			})
		} else if (value == "") {
			this.setState({
				chechPwd: true,
				chechError: this.props.intl.formatMessage({
					id: 'oldMsg3'
				})
			})
		} else {
			this.setState({
				chechPwd: false,
			})
		}
	}
	componentDidMount() {

	}
	handleClick = () => {
		const form = this.props.form;
		var ident = form.getFieldValue("ident");
		if (!ident) {
			Toast.fail(this.props.intl.formatMessage({
				id: 'ito_forget_input2'
			}), 1.5);
			return;
		}
		var captcha = form.getFieldValue("captcha");
		if (!captcha) {
			Toast.fail(this.props.intl.formatMessage({
				id: 'ito_forget_input4'
			}), 1.5);
			return;
		}
		var new_password = form.getFieldValue("new_password");
		var check_password = form.getFieldValue("check_password");
		if (!new_password || this.state.newPwd) {
			Toast.fail(this.props.intl.formatMessage({
				id: 'newPwdinput'
			}), 1.5);
			return;
		}
		if (!check_password || this.state.chechPwd) {
			Toast.fail(this.props.intl.formatMessage({
				id: 'oldMsg3'
			}), 1.5);
			return;
		}
		if (new_password != check_password) {
			Toast.fail(this.props.intl.formatMessage({
				id: 'pwddiff'
			}), 1.5);
			return;
		}
		var ident2 = telNumber(ident);
		axios.post("/kc/reset-password", {
				"ident": ident2,
				"captcha": captcha,
				"new_password": new_password,
				"check_password": check_password
			}, {
				headers: {
					"Content-Type": "application/json",
				}
			})
			.then(res => {
				if (res.data.code == '100200') {
					Toast.success(this.props.intl.formatMessage({
						id: 'reSuccess'
					}), 1.5);
					setTimeout(function() {
						window.location.href = "/kuangfront/login";
					}, 1000)
				} else {
					codeTest(this.props, res.data.code);
				}
			})
			.catch(err => {
				console.log(err)

			})
	}
	captcha = () => {
		let value = this.props.form.getFieldValue("ident");
		if (!value) {
			Toast.fail(this.props.intl.formatMessage({
				id: 'ito_forget_input2'
			}), 1.5);
			return;
		}
		axios.get('/kc/captcha/send-captcha', {
				params: {
					"ident": value,
					"type": "RESETPASSWORD"
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
					codeTest(this.props, res.data.code);
				}
			})
			.catch(function(error) {
				console.log(error);
			});
	}

	render() {
		const {
			getFieldProps
		} = this.props.form;
		return (
			<div className="forgetpwd">
		<section><p><Link to="/kuangfront/login"><FormattedMessage
                            id='login'
                             defaultMessage = "登录"
                        /></Link></p></section>
	            <section><div style={{width:"212px",height:"14px"}}></div></section>
                <section>
                	<div className="otc_forgetpwd"> 
                		<List>
                			 <InputItem
					            {...getFieldProps('ident')}
					            clear="editable"
					            defaultValue=""
					            placeholder={this.props.intl.formatMessage({
									id: 'forget1'
								})}
					            ref={el => this.autoFocusInst = el}
					          ><img src={require('../img/phone2.svg')} alt=""/><label></label>
	            			 </InputItem>
					          
					            <div className="otc-code">
						         	<div className="otc-code-l">
								         <InputItem
								            {...getFieldProps('captcha')}
								            placeholder={this.props.intl.formatMessage({
											id: 'loginInput4'
										})}							            
								         ><img src={require('../img/code.png')} alt=""/><label></label>
								          </InputItem>
							        </div>
							        <div className="otc-code-r" onClick={this.captcha} disabled={this.state.isDisabled}>{this.state.buttonText}</div>
					         
				         		</div>
					           <InputItem
						            {...getFieldProps('new_password',{
						            	rules:[
		                              { required: true, message: '请输入正确的密码组合' },
		                              {
		                                  validator: this.checkConfirm
		                               }
		                            ],
						            })}
						            clear="editable"
						            defaultValue=""
						            placeholder={this.props.intl.formatMessage({
										id: 'newPwd'
									})}
						            type="password"
						             error={this.state.newPwd}
			                          onErrorClick={
			                            this.newPwderr
			                          }
						            ref={el => this.autoFocusInst = el}
					            
						       ><img src={require('../img/password.svg')} alt=""/><label></label>
						       </InputItem>		
						       
						      	 <InputItem
						            {...getFieldProps('check_password',{
						            	rules: [
			                              { required: true, message: '确认你的新登录密码' },
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
                         			onErrorClick={this.checkPwderr}
						            ref={el => this.autoFocusInst = el}
					            
						        ><img src={require('../img/confirmpwd.svg')} alt=""/><label></label>
						        </InputItem>		
						       
						        <List.Item  id="otc_but">
					          		<div onClick={this.handleClick}><FormattedMessage
                            id='sure'
                             defaultMessage = "确定"
                        /></div>
					          </List.Item>
                		</List>
                	</div>
                </section>
            </div>
		)
	}
}
const Forgetpwd = createForm()(BasicInputExample);
Forgetpwd.propTypes = {
	intl: intlShape.isRequired
}
export default injectIntl(Forgetpwd);