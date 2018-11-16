import React from 'react'
import Head from '@/components/common/Head'
import '@/style/Recharge.css'
import axios from 'axios'
import QRCode from '@/components/common/QRCode'
import copy from 'copy-to-clipboard'
import {
	Toast,
} from 'antd-mobile';
import {
	injectIntl,
	intlShape,
	FormattedMessage
} from 'react-intl';
//改变二维码尺寸
function getSize(size) {
	const clienWidth = document.documentElement.clientWidth / 4
	return Math.floor(size * clienWidth)
}
let value = sessionStorage.getItem("authorization");

class Recharge extends React.Component {
	constructor(props) {
		super(props);
		var activeKey = null;
		if (this.props.location.state) {
			activeKey = this.props.location.state.currency;
		}
		console.log(activeKey)
		this.state = {
			rechargeList: [], //充值列表
			activeKey: activeKey,
			currenciesList: [],
			currList: {},
			addr: "",
			num: null
		}
	}
	componentDidMount() {
		this.getCurrenciesDetail();
		this.getdata();
		//		console.log(this.state.activeKey)
	}

	getdata() {
		Toast.loading('Loading...', 30, () => {
			console.log(1);
		});

		setTimeout(() => {
			Toast.hide();
		}, 500);
	}

	//点击复制
	copyUrl = () => {
			copy(this.state.addr);
			Toast.success(this.props.intl.formatMessage({
				id: 'Replicating'
			}), 1);
		}
		//获取可充值列表
	getCurrenciesDetail = () => {
		axios.get('/kc/public/currencies/detail?flag=all')
			.then(res => {
				var currenciesList = res.data.data
				this.setState({
					currenciesList
				});
				for (var i in currenciesList) {
					if (currenciesList[i].currency == this.state.activeKey) {
						if (currenciesList[i].recharge == 0) {
							this.recharge(this.state.activeKey);
							this.setState({
								currList: currenciesList[i],
								num: currenciesList[i].confirm_num
							})
						}

					}
				}
			})
	}
	recharge = (currency) => {
		axios.get('/kc/wallet/currency/' + currency, {
				headers: {
					"authorization": sessionStorage.getItem("authorization")
				}
			})
			.then(res => {
				if (res.data.data) {

					this.setState({
						addr: res.data.data.address
					});
				}

			})
			.catch(function(error) {
				console.log(error);
			});
	}



	render() {
		var currList = this.state.currList;
		var currency = this.state.activeKey;
		return (
			<div className="recharge">
               <Head />
               <div>
                    <div className="otc_rechargeTop"> 			             
            				<div className="otc_addr">
            				    <ul>
				                        <li className="set">
				                                <div><i className="icon iconfont icon-caidan"></i><FormattedMessage
					                            id='walletAddr'
					                            defaultMessage="钱包地址"
					                        /></div>
				                                <div></div>
				                        </li>
				                        <li>
				                        	  <p className="otc_add">
						                     	<span className="otc_addrInfo">{this.state.addr}</span>
						                     	<span className="otc_copy" onClick={this.copyUrl}><FormattedMessage
					                            id='copy'
					                            defaultMessage="复制"
					                        /></span>
								                     </p>
				                        </li>
				                  </ul>
				                     <ul>
					                        <li className="set">
					                                <div><i className="icon iconfont icon-caidan"></i><FormattedMessage
					                            id='erCode'
					                            defaultMessage="钱包二维码"
					                        /></div>
					                                <div></div>
					                        </li>
					                        	  <div className="otc_code">
								                        <div>
								                        	 {this.state.addr ?
						                                        <QRCode value={this.state.addr} size={getSize(20)} /> :
						                                        null
						                                     }
								                        </div>
								                    </div>     			
					                  </ul>
			                   			<ul>
				                        <li className="set">
				                                <div><i className="icon iconfont icon-caidan"></i><FormattedMessage
					                            id='needNow'
					                            defaultMessage="充币须知"
					                        /></div>
				                                <div></div>
				                        </li>
				                        <div className="re_term">
				                         <FormattedMessage
					                        tagName="p"
				                            id='walletNow'
				                            defaultMessage={`充币需要{num}个网络确认才能到账。`}
				                            values={{num:this.state.num}}
				                        />  
				                 		</div>
				                  </ul>
		                    </div>
		                  					                                
			       	</div>      
					
               </div> 
			</div>
		)
	}
}

Recharge.propTypes = {
	intl: intlShape.isRequired
}
export default injectIntl(Recharge);