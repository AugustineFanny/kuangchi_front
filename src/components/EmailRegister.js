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
	Button
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
		newPwd: false,
        newError: "",
        chechPwd: false,
        chechError: "",
        userPwd: false,
        userError: "",
		isDisabled: false,
		buttonText: this.props.intl.formatMessage({
			id: 'getCode'
		}),
		countdown: 0,
		isDisabled1: false,
		inviteCode: null
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
			let invite_code = qs["i"];
			// sessionStorage.setItem("inviteCode", qs["i"]);
			this.setState({
				inviteCode: invite_code
			})
		}
	}
	handleClick = (e) => {
		e.preventDefault();
		let inviteCode = this.state.inviteCode;
		var ident = this.props.form.getFieldValue("ident");
		if (!ident) {
			Toast.success(this.props.intl.formatMessage({
				id: 'emailMsg2'
			}), 2);
			return;
		}
		var captcha = this.props.form.getFieldValue("captcha");
		if (!captcha) {
			Toast.success(this.props.intl.formatMessage({
				id: 'loginInput3'
			}), 2);
			return;
		}
		var username = this.props.form.getFieldValue("username")
        if (!username || this.state.userPwd) {
            Toast.fail(this.props.intl.formatMessage({
                id: 'regUser'
            }), 2);
            return;
        }

        var password = this.props.form.getFieldValue("password")
        if (!password || this.state.newPwd) {
            Toast.fail(this.props.intl.formatMessage({
                id: 'login_title4'
            }), 2);
            return;
        }

        var check_password = this.props.form.getFieldValue("check_password")
        if (!check_password || this.state.chechPwd) {
            Toast.fail(this.props.intl.formatMessage({
                id: 'sureInput'
            }), 2);
            return;
        }
        if (password != check_password) {
            Toast.fail(this.props.intl.formatMessage({
                id: 'pwddiff'
            }), 2);
            return;
		}

		var values = {
            ident: ident,
            captcha: captcha,
            username: username,
            password: password,
            check_password: check_password
		}
        if (inviteCode !== null)
			values["invite_code"] = inviteCode;

			console.log(values)
			
		axios.post("/kc/register", values, {
			headers: {
				"Content-Type": "application/json",
			}
		})
		.then(res => {
			if (res.data.code == '100200') {
				Toast.success(this.props.intl.formatMessage({
					id: 'registersuc'
				}), 2);
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

	//验证码判断
	captcha = () => {
			let value = this.props.form.getFieldValue("ident");
			var re = /^[\S]*@[\S]*$/;
			if (!value) {
				Toast.fail(this.props.intl.formatMessage({
					id: 'emailMsg2'
				}), 2);
				return;
			}
			if (value && !re.test(value)) {
				Toast.fail("请输入正确的邮箱", 2);
				return;
			}
			axios.get('/kc/captcha/send-captcha', {
					params: {
						"ident": value,
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
						codeTest(this.props, res.data.code);

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
			}), 2)

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
	          	{/* <section><p><Link to="/kuangfront/login"><FormattedMessage
                            id='login'
                             defaultMessage = "登录"
						/></Link></p></section> */}
				<section><div className="login-logo"></div></section>
						
	          	<section>
	          		<div className="otc_phoneregister">    
			          	<List>
				          <InputItem
				            {...getFieldProps('ident',{
				            	 rules: [{
		                              type: 'email', message: '请输入正确的邮箱地址!',
		                            }],
				            })}
				            placeholder={this.props.intl.formatMessage({
									id: 'regTitle6'
								})}				           
				          >
						  <i className="icon iconfont icon-39"></i>
						  </InputItem>
				         <div className="otc-code">
					         	<div className="otc-code-l">
							         <InputItem
							            {...getFieldProps('captcha')}
							            placeholder={this.props.intl.formatMessage({
									id: 'loginInput3'
								})}							            
							         >
									 <i className="icon iconfont icon-yanzhengma"></i>
									 </InputItem>
						        </div>
						        <Button className="otc-code-r" onClick={this.captcha} disabled={this.state.isDisabled}>{this.state.buttonText}</Button>
				         
				         </div>
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
									id: 'regUser'
								})}
								error={this.state.userPwd}
								onErrorClick={
									this.pdUsername
								}
								ref={el => this.autoFocusInst = el}                                
							>
						
						<i className="icon iconfont icon-yonghu"></i>
						</InputItem> 
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
						
						<i className="icon iconfont icon-mima"></i>
						</InputItem> 
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
						
						<i className="icon iconfont icon-mima"></i>
						</InputItem> 
				        {/**<Flex>
					        <Flex.Item>
					          <AgreeItem data-seed="agreement" onChange={this.isCheck} defaultChecked>
					               <FormattedMessage
		                             id='read'
		                        />FADAX <Link to="/kuangfront/terms"><FormattedMessage
                            id='terms'
                             defaultMessage = "服务条款"
                        /></Link>
					          </AgreeItem>
					        </Flex.Item>
				     	  </Flex>**/}
				     	  <Button id="otc_but" onClick={this.handleClick} ><FormattedMessage
                            id='register'
                             defaultMessage = "注册"
                        /></Button>
						<p className="register-backlogin">
							<Link to="/kuangfront/login">
								<i className="icon iconfont icon-fanhui"></i>
								<FormattedMessage
									id='login'
									defaultMessage = "登录"
								/>
							</Link>
						</p>
						
				          
				        </List>
				       
				    </div>
				    </section>
			</div>
		)
	}
}
const EmailRegister = createForm()(BasicInputExample);
EmailRegister.propTypes = {
	intl: intlShape.isRequired
}
export default injectIntl(EmailRegister);