import React from 'react'
import '@/style/Wdetail.css'
import Head from '@/components/common/Head'
import Account from '@/components/common/Account'
import axios from 'axios'
import {
    Link
} from 'react-router-dom'
import {
    limitAmount
} from '@/components/common/utils'
import {
    Toast,
    Tabs,
    Pagination,
    ActivityIndicator
} from 'antd-mobile';
import {
    injectIntl,
    intlShape,
    FormattedMessage
} from 'react-intl';
class Wdetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            total_page: 0,
            current: 0,
            rechargeList: [], //充值列表
            currency: this.props.location.state.currency,
            finance: this.props.location.state.finance,
            direction: 0,
            currencies: [],
            nowcurr: [],
            animating: true
        }
    }
    componentWillMount() {

    }
    componentDidMount() {
        this.reandextract(this.state.currency, 1, 0)
        this.getCurrenciesDetail()
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
                var total_page = res.data.data.total_page;
                var current = res.data.data.page_no;
                this.setState({
                    total_page: total_page,
                    current: current,
                    rechargeList: res.data.data.list
                });
            })
            .catch(function(error) {
                console.log(error);
            });
    }
    handleTableChange = (current) => {
        this.reandextract(this.state.currency, current, this.state.direction);
    }
    changeTab = (tab, index) => {
        this.setState({
            direction: index
        })
        this.reandextract(this.state.currency, 1, index)
    }
    recordPath(currency, finance, id, page_no, direction) {
        return {
            pathname: '/kuangfront/record',
            state: {
                currency: currency,
                finance: finance,
                id: id,
                page_no: page_no,
                direction: direction
            }
        }
    }
    getCurrenciesDetail() {
        axios.get('/kc/public/currencies/detail?flag=all')
            .then(res => {
                var currencies = res.data.data;
                var nowcurr = [];
                for (var i in currencies) {
                    if (currencies[i].currency == this.state.currency) {
                        nowcurr = currencies[i]
                    }
                }
                this.setState({
                    currencies: currencies,
                    nowcurr: nowcurr
                });
            })
    }
    rechargePath(currency) {
        return {
            pathname: '/kuangfront/recharge',
            state: {
                currency: currency,
            }
        }
    }
    withdrawPath(currency) {
        return {
            pathname: '/kuangfront/withdrawals',
            state: {
                currency: currency,
            }
        }
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
                        />;
                break;
            case 2:
                str = <FormattedMessage
                            id='complete'
                        />;
                break;
            case 3:
                str = <FormattedMessage
                            id='Tobeaudited'
                        />;
                break;
            case 4:
                str = <FormattedMessage
                            id='Auditfailure'
                        />;
                break;
        }
        return str;
    }
    render() {
        let finance = this.state.finance;
        var currency = this.state.currency;
        var direction = this.state.direction;
        var currencies = this.state.currencies;
        var nowcurr = this.state.nowcurr;
        const tabs = [{
            title: this.props.intl.formatMessage({
                id: 'recharge'
            })
        }, {
            title: this.props.intl.formatMessage({
                id: 'withdrawals'
            })
        }, ];
        const locale = {
            prevText: this.props.intl.formatMessage({
                id: 'prev'
            }),
            nextText: this.props.intl.formatMessage({
                id: 'next'
            }),
        };
        return (
            <div className="wallet_detail">
           
                        <Head />
                         {
            currencies.length > 0 ?
            <div className="wallet_details">
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
                            <Tabs tabs={tabs} initialPage={0} animated={false} useOnPan={false} onChange={this.changeTab}>
                            <div>
                                {
                                    this.state.rechargeList.map((item,index)=>{
                                        return(
                                             <Link key={item.id} to={this.recordPath(currency,finance,item.id,this.state.current,direction)}>
                                            <div className="w_Info">
                                                <p> <FormattedMessage
                                                        id='recharge_addr'
                                                        defaultMessage="地址"
                                                    /><span>{item.to}</span></p>
                                                <p><span>{item.amount} {currency}</span><span>{this.showStatus(item.status, item.confirmations)}</span></p>
                                            </div>
                                            </Link>
                                            )
                                    })
                                }
                                <div  className="mytrade_footer">
                                    <Pagination total={this.state.total_page} current={this.state.current} locale={locale} onChange={this.handleTableChange} />
                                </div>
                            </div>
                            <div>
                                 {
                                    this.state.rechargeList.map((item,index)=>{
                                        return(
                                            <div key={item.id} className="w_Info">
                                                <p> <FormattedMessage
                                                        id='recharge_addr'
                                                        defaultMessage="地址"
                                                    /><span>{item.to}</span></p>
                                                <p><span>{item.amount} {currency}</span><span>{this.showStatus(item.status, item.confirmations)}</span></p>
                                            </div>
                                            )
                                    })
                                }
                                <div  className="mytrade_footer">
                                    <Pagination total={this.state.total_page} current={this.state.current} locale={locale} onChange={this.handleTableChange} />
                                </div>
                            </div>
                            </Tabs>
                                          
                        </div>   
                      
                        <section className="wallet_foot">
                        {
                            nowcurr.recharge?
                             <div id="disable"> 
                          <FormattedMessage
                                tagName="div"
                                id='recharge'
                                defaultMessage="充值"
                           />
                          </div>: <div> <Link to={this.rechargePath(currency)}>
                          <FormattedMessage
                                tagName="div"
                                id='recharge'
                                defaultMessage="充值"
                           />
                         </Link> </div>
                        }
                        {
                            nowcurr.withdraw?
                             <div  id="disable"> 
                              <FormattedMessage
                                tagName="div"
                                id='withdrawals'
                                defaultMessage="提币"
                           />
                         </div>:
                          <div> <Link to={this.withdrawPath(currency)}>
                           <FormattedMessage
                                tagName="div"
                                id='withdrawals'
                                defaultMessage="提币"
                           />
                         </Link></div>
                         }
                        </section>           
                    </div> :
              <ActivityIndicator
                toast
                text="Loading..."
                animating={this.state.animating}
              />
        }
        </div>)
    }
}

Wdetail.propTypes = {
    intl: intlShape.isRequired
}
export default injectIntl(Wdetail);