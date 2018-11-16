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
		isDisabled: false,
		buttonText: this.props.intl.formatMessage({
			id: 'getCode'
		}),
		countdown: 0,
		isDisabled1: false,
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
	handleClick = () => {
		var ident = this.props.form.getFieldValue("ident");
		if (!ident) {
			Toast.success(this.props.intl.formatMessage({
				id: 'emailMsg2'
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
				axios.post("/kc/register-captcha", values, {
						headers: {
							"Content-Type": "application/json",
						}
					})
					.then(res => {
						if (res.data.code == '100200') {
							sessionStorage.setItem("ident", values.ident);
							sessionStorage.setItem("captcha", values.captcha);
							window.location.href = "/kuangfront/registerafter";
						} else {
							codeTest(this.props, res.data.code);
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
			var re = /^[\S]*@[\S]*$/;
			if (!value) {
				Toast.fail(this.props.intl.formatMessage({
					id: 'emailMsg2'
				}), 1);
				return;
			}
			if (value && !re.test(value)) {
				Toast.fail("请输入正确的邮箱", 1);
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
                            id='regTitle6'
                             defaultMessage = "请输入你的邮箱地址"
                        />
				          <InputItem
				            {...getFieldProps('ident',{
				            	 rules: [{
		                              type: 'email', message: '请输入正确的邮箱地址!',
		                            }],
				            })}
				            placeholder={this.props.intl.formatMessage({
									id: 'regTitle6'
								})}				           
				          />
				            <FormattedMessage
			          		tagName="p"
                            id='loginInput3'
                             defaultMessage = "请输入验证码"
                        />
				         <div className="otc-code">
					         	<div className="otc-code-l">
							         <InputItem
							            {...getFieldProps('captcha')}
							            placeholder={this.props.intl.formatMessage({
									id: 'loginInput3'
								})}							            
							         />
						        </div>
						        <Button className="otc-code-r" onClick={this.captcha} disabled={this.state.isDisabled}>{this.state.buttonText}</Button>
				         
				         </div>
				         
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