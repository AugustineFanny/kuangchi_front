import React from 'react'
import Head from '../common/Head'
import axios from 'axios'
import '@/style/subinfo.css'
import QRCode from '@/components/common/QRCode'
import copy from 'copy-to-clipboard'
import Foot from '@/components/common/Foot'
import Subform from './Subform'
import {
    Toast,
    InputItem,
    Button,
    ActivityIndicator,
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
    showDatetime,
    showDate,
    codeTest
} from '../common/utils'
const alert = Modal.alert;

function getSize(size) {
    const clienWidth = document.documentElement.clientWidth / 40
    return Math.floor(size * clienWidth)
}
class SubinfoForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currImg: [],
            orderInfo: {},
            addr: "",
            animating: true,
            showmask: false
        }
    }
    componentDidMount() {
        this.getOrder();
    }

    getOrder = () => {
        var order = this.props.location.state.order;
        axios.get("/kc/wallet/order/" + order, {
                headers: {
                    "authorization": sessionStorage.getItem("authorization")
                }
            })
            .then(res => {
                if (res.data.code == '100103') {
                    window.location.href = "/kuangfront/login";
                } else if (res.data.code == '100200') {
                    var res = res.data.data;
                    var orderInfo = {...this.state.orderInfo
                    };
                    orderInfo = res;
                    orderInfo.create_time = showDatetime(res.create_time);
                    this.setState({
                        orderInfo: orderInfo,
                        addr: res.address
                    })
                    if (res) {
                        this.setState({
                            animating: false
                        })
                    }
                } else if (res.data.code == "100102") {
                    Toast.fail(res.data.msg, 1.5);
                } else {
                    codeTest(this.props, res.data.code)
                }

            })
    }
    gotoSure = () => {
        this.setState({
            showmask: true
        })
    }
    closemask = () => {
        this.setState({
            showmask: false
        })
    }
    cancelOrder = () => {
        alert(this.props.intl.formatMessage({
            id: 'cantit'
        }), '', [{
            text: this.props.intl.formatMessage({
                id: 'appealcancel'
            }),
            onPress: () => console.log("取消")
        }, {
            text: this.props.intl.formatMessage({
                id: 'sure'
            }),
            onPress: () => {
                var order = this.props.location.state.order;
                axios.delete("/kc/wallet/order/" + order, {
                        headers: {
                            "authorization": sessionStorage.getItem("authorization")
                        }
                    })
                    .then(res => {
                        if (res.data.code == '100103') {
                            window.location.href = "/kuangfront/login";
                        } else if (res.data.code == '100200') {
                            Toast.success(this.props.intl.formatMessage({
                                id: 'success2'
                            }), 1.5);
                            this.getOrder()
                        } else if (res.data.code == "100102") {
                            Toast.fail(res.data.msg, 1.5);
                        } else {
                            codeTest(this.props, res.data.code)
                        }
                    })
            }
        }, ])
    }

    statusfun = (status) => {
            switch (status) {
                case 0:
                case "0":
                    return <span className="noPay"><FormattedMessage
                                                id='changeStatus2'
                                                defaultMessage = "未付款"
                                            /></span>;
                case 1:
                case "1":
                    return <span className="toexamine"><FormattedMessage
                                                id='changeStatus3'
                                                defaultMessage = "已付款,待审核"
                                            /></span>;
                case 2:
                case "2":
                    return <span className="complete"><FormattedMessage
                                                id='finish'
                                                defaultMessage = "完成"
                                            /></span>;
                case 3:
                case "3":
                    return <span className="cancel"><FormattedMessage
                                                id='changeStatus5'
                                                defaultMessage = "取消"
                                            /></span>;
                case 4:
                case "4":
                    return <span className="autocancel"><FormattedMessage
                                                id='tradeState5'
                                                defaultMessage = "自动取消"
                                            /></span>;
            }
        }
        //点击复制
    copyUrl = () => {
        copy(this.state.addr);
        Toast.success(this.props.intl.formatMessage({
            id: 'Replicating'
        }), 1);
    }
    render() {
        const {
            getFieldProps,
            getFieldError,
        } = this.props.form;

        var orderInfo = this.state.orderInfo;

        return (
            <div className="subinfo">
                 <Head />
                 {
                    this.state.animating?  
                    <ActivityIndicator
                        toast
                        text="Loading..."
                        animating={this.state.animating}
                      />:
                      <div>
                          <div className="subinfo_content">
                            <div className="subinfo_head">
                                <span className="subinfo_logo"><FormattedMessage
                                                                        id='subscriptions'
                                                                        defaultMessage = "认购"
                                                                    /></span>
                                <span>{orderInfo.currency}</span>
                                <span>{this.statusfun(orderInfo.status)}</span>
                            </div>
                            <div className='subinfo_box'>
                                <p><FormattedMessage
                                    id='totla_amount'
                                    defaultMessage = "总金额"
                                /><span className="subinfo_tit">{orderInfo.base_amount} {orderInfo.base}</span></p>
                                <p><FormattedMessage
                                    id='sellAmount'
                                    defaultMessage = "数量"
                                /><span>{orderInfo.currency_amount} {orderInfo.currency}</span></p>
                                <p><FormattedMessage
                                    id='order'
                                    defaultMessage = "订单号"
                                /><span>{orderInfo.order}</span></p>
                                <p><FormattedMessage
                                    id='recharge_time'
                                    defaultMessage = "时间"
                                /><span>{orderInfo.create_time}</span></p>
                                <p><FormattedMessage
                                    id='Proportion'
                                    defaultMessage = "兑换比例"
                                /><span>1 {orderInfo.base} = {orderInfo.exchange} {orderInfo.currency}</span></p>
                            </div>
                            {
                                 orderInfo.status == "0"?
                                 <div className="subinfo_form">
                                      <InputItem className="trad_price"
                                        value = {orderInfo.address}
                                        editable={false}
                                    ><FormattedMessage
                                    id='add'
                                    defaultMessage = "地址"
                                /></InputItem>
                                    <section className="addr_img" onClick={this.copyUrl}>
                                         {this.state.addr ?
                                                    <QRCode value={this.state.addr} size={getSize(20)} /> :
                                                    null
                                                 }
                                    </section> 
                                </div>:null
                            }
                            
                         </div>
                         {
                            this.state.showmask?
                            <div className="mask">
                                <Subform closemask={this.closemask} order={this.props.location.state.order} getOrder={this.getOrder}/>
                            </div>:null
                         }
                         
                         {
                            orderInfo.status == "0"?
                                <div className="subinfo_foot">
                                        <Button  inline onClick={this.cancelOrder}><FormattedMessage
                                    id='appealcancel'
                                    defaultMessage = "取消"
                                /></Button>
                                        <Button  inline onClick={this.gotoSure}><FormattedMessage
                                    id='payFinish'
                                    defaultMessage = "支付完成"
                                /></Button>
                                </div>:<Foot />
                         }
                    </div>
                }
               
                 
            </div>
        )
    }
}
const Subinfo = createForm()(SubinfoForm);
Subinfo.propTypes = {
    intl: intlShape.isRequired
}
export default injectIntl(Subinfo);