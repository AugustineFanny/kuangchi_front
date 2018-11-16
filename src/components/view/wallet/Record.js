import React from 'react'
import '@/style/Wdetail.css'
import Head from '@/components/common/Head'
import Account from '@/components/common/Account'
import axios from 'axios'
import {
    Link
} from 'react-router-dom'
import {
    limitAmount,
    showDatetime
} from '@/components/common/utils'
import {
    Toast,
    Tabs,
    Pagination
} from 'antd-mobile';
import {
    injectIntl,
    intlShape,
    FormattedMessage,
} from 'react-intl';
class Wdetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currency: this.props.location.state.currency,
            finance: this.props.location.state.finance,
            id: this.props.location.state.id,
            page_no: this.props.location.state.page_no,
            direction: this.props.location.state.direction,
            record: {}
        }
    }
    componentWillMount() {

    }
    componentDidMount() {
        this.reandextract(this.state.currency, this.state.page_no, this.state.direction)
    }

    //获取记录
    reandextract = (currency, page, direction) => {
        axios.get('/kc/wallet/transfers', {
                params: {
                    direction: direction,
                    page: page,
                    currency: currency
                },
                headers: {
                    "Content-Type": "application/json",
                    "authorization": sessionStorage.getItem("authorization")
                }
            })
            .then(res => {
                var list = res.data.data.list;
                for (var i in list) {
                    if (list[i].id == this.state.id) {
                        var record = {...this.state.record
                        };
                        record = list[i];
                        record.time = showDatetime(list[i].create_time);
                        this.setState({
                            record: record
                        })
                    }
                }
            })
            .catch(function(error) {
                console.log(error);
            });
    }
    showStatus = (str, confirmations) => {
        switch (str) {
            case 0:
                var needConfirm = 1;
                for (var i in this.state.currenciesList) {
                    var coin = this.state.currenciesList[i];
                    if (this.state.activeKey == coin.currency)
                        needConfirm = coin.confirm_num;
                }
                str = '' + confirmations + '/' + needConfirm;
                break;
            case 1:
                str = <FormattedMessage
                            id='abnormal'
                            defaultMessage="异常"
                        />
                break;
            case 2:
                str = <FormattedMessage
                            id='complete'
                            defaultMessage="完成"
                        />
                break;
            case 3:
                str = <FormattedMessage
                            id='Tobeaudited'
                            defaultMessage="待审核"
                        />
                break;
            case 4:
                str = <FormattedMessage
                            id='Auditfailure'
                            defaultMessage="审核失败"
                        />
                break;
        }
        return str;
    }
    render() {
        let finance = this.state.finance;
        var currency = this.state.currency;
        var record = this.state.record;
        return (

            <div className="wallet_detail">
                        <Head />
                        <div className="wallet_tit">
                            <h2>{currency}</h2>
                               <p><FormattedMessage
                            id='total'
                            defaultMessage="总额"
                        /><span>{finance[currency].amount}</span></p>
                            <p><FormattedMessage
                            id='usable'
                            defaultMessage="可用"
                        /><span>{finance[currency].usableAmount}</span></p>
                            <p><FormattedMessage
                            id='frozen'
                            defaultMessage="冻结"
                        /><span>{finance[currency].lockAmount}</span></p>
                           
                        </div>
                        <div className="wallet_Info">
                        <div className="wallet_Infos"></div>

                            <div>
                                <div className="record_info">
                                    <p><FormattedMessage
                            id='recharge_addr'
                            defaultMessage="地址"
                        /> : <span>{record.to}</span></p>
                                    <p><FormattedMessage
                            id='recharge_amount'
                            defaultMessage="数量"
                        /> : <span>{record.amount}</span></p>
                                    <p className="txid">Txid : <span>{record.hash}</span></p>
                                    <p><FormattedMessage
                            id='recharge_state'
                            defaultMessage="状态"
                        /> : {this.showStatus(record.status, record.confirmations)}</p>
                                    <p><FormattedMessage
                            id='recharge_time'
                            defaultMessage="时间"
                        /> : <span>{record.time}</span></p>
                                </div>
                            </div>
                        </div>   
                    </div>
        )
    }
}
Wdetail.propTypes = {
    intl: intlShape.isRequired
}
export default injectIntl(Wdetail);