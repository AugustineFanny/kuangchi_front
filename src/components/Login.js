import React from 'react'
import '../style/Login.css'
import axios from 'axios'
import {
	BrowserRouter as Router,
	Route,
	Link,
	Redirect,
	withRouter
} from 'react-router-dom'

import {
	List,
	InputItem,
	WhiteSpace,
	Toast,
	Modal
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
	fakeAuth,
	codeTest
} from '@/components/common/utils'

const fail = (msg) => {
	Toast.fail(msg);
};
class BasicInputExample extends React.Component {
		constructor(props) {
				var token = sessionStorage.getItem("authorization");
				var aa;
				super(props);
				if (token) {
					aa = true
				} else {
					aa = false
				}
				this.state = {
					redirectToReferrer: aa,

					img: "/kc/captcha/code?_=" + Date.now()
				}
				this.changeCode = this.changeCode.bind(this)
			}
			//改变验证码
		changeCode() {
			this.setState({
				img: "/kc/captcha/code?_=" + Date.now()
			})
		}
		componentWillMount() {
			// this._isMounted = true;
			var token = sessionStorage.getItem("authorization");
			if (token) {
				fakeAuth.authenticate(() => {
					this.setState({
						redirectToReferrer: true
					});
				});

			}
		}
		componentWillUnmount() {
			this.setState = (state, callback) => {
				return;
			};
		}
		componentWillReceiveProps(nextProps) {
			var token = sessionStorage.getItem("authorization");
			if (token) {
				fakeAuth.authenticate(() => {
					this.setState({
						redirectToReferrer: true
					});
				});
			}
		}
		componentDidMount() {
			// this.autoFocusInst.focus();
		}
		handleClick = () => {
			var ident = this.props.form.getFieldValue("ident")
			if (!ident) {
				Toast.fail(this.props.intl.formatMessage({
					id: 'login_title3'
				}), 1);
				return;
			}
			var password = this.props.form.getFieldValue("password")
			if (!password) {
				Toast.fail(this.props.intl.formatMessage({
					id: 'loginInput2'
				}), 1);
				return;
			}
			var code = this.props.form.getFieldValue("code")
			if (!code) {
				Toast.fail(this.props.intl.formatMessage({
					id: 'loginInput3'
				}), 1);
				return;
			}
			this.props.form.validateFields((err, values) => {
				if (!err) {
					axios.post("/kc/login", values, {

						}, {
							headers: {
								"Content-Type": "application/json",
								// "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MTAyMjY0NTEsImlzcyI6InZrYmNlbCJ9.6SyUXqXOsJomDOxa0J-f_LTy5Et7Jn3jQnUs3WaOiJ4"
							}
						})
						.then(res => {
							if (res.data.code == '100200') {
								var value = res.headers.authorization;

								//console.log(res.data.data.username)
								Toast.success(this.props.intl.formatMessage({
									id: 'successLogin'
								}), 1);
								setTimeout(() => {
									sessionStorage.setItem("authorization", value);
									sessionStorage.setItem("username", res.data.data.username);
									fakeAuth.authenticate(() => {
										this.setState({
											redirectToReferrer: true
										});
									});
								}, 1000)

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
		render() {
				const {
					from
				} = this.props.location.state || {
					from: {
						pathname: "/kuangfront/finance"
					}
				};
				const {
					redirectToReferrer
				} = this.state;

				if (redirectToReferrer) {
					return <Redirect to={from} />;
				}
				const {
					getFieldProps
				} = this.props.form;
				return (
						<div className="login">
	         	<section><p><Link to="/kuangfront/emailregister"><FormattedMessage
                            id='register'
                             defaultMessage = "注册"
                        /></Link></p></section>
	            <section><div style={{width:"212px",height:"34px"}}></div></section>
	            <section>
		            <div className="otc_login">        
				        <List>
					          <InputItem
					            {...getFieldProps('ident')}
					            clear="editable"
					            defaultValue=""
					            placeholder={this.props.intl.formatMessage({
									id: 'login_title'
								})}
					            ref={el => this.autoFocusInst = el}
					          ><img src={require('../img/username.svg')} alt=""/><label></label></InputItem>
					          
					          <InputItem
					            {...getFieldProps('password')}
					            clear="editable"
					            defaultValue=""
					            placeholder={this.props.intl.formatMessage({
									id: 'loginpwd'
								})}
					            type="password"
					            ref={el => this.customFocusInst = el}
					          ><img src={require('../img/password.svg')} alt=""/><label></label></InputItem>
					          
					         <div className="otc-code">
					         	<div className="otc-code-l">
							         <InputItem
							            {...getFieldProps('code')}
							            placeholder={this.props.intl.formatMessage({
									id: 'ito_forget_code'
								})}							            
							         >
					         		 	<img src={require('../img/code.svg')} alt=""/><label></label>
					         		</InputItem>
						        </div>
						        <div className="otc-code-r"> <img onClick={this.changeCode} src={this.state.img} alt=""/></div>
				         
				        	 </div>
					          
					          <p className="forgetpwd"><Link to="/kuangfront/forgetpwd"><FormattedMessage
                            id='ito_forget'
                             defaultMessage = "忘记密码"
                        /></Link></p>
					          
					          <List.Item  id="otc_but">
					          	<div onClick={this.handleClick}><FormattedMessage
                            id='login'
                             defaultMessage = "登录"
                        /></div>
					          </List.Item>
					          				          
					        
					    </List>  
     			 </div> < /section> < /div >
		)
	}
}
const Login = createForm()(BasicInputExample);
Login.propTypes = {
	intl: intlShape.isRequired
}
export default injectIntl(Login);