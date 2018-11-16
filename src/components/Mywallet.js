import React from 'react'
import '../style/Mywallet.css'
import Head from './common/Head'
import axios from 'axios'
import {
    Link
} from 'react-router-dom'
import {
    limitAmount
} from './common/utils'
import {
    Toast
} from 'antd-mobile';
import {
    injectIntl,
    intlShape,
    FormattedMessage,
    defineMessages
} from 'react-intl';

function loadingToast() {
    Toast.loading('Loading...', 1, () => {
        console.log('Load complete !!!');
    });
}
class Wallet extends React.Component {

    constructor() {
        super();
        this.state = {
            total_count: 0,
            currencies: [],
            finance: {},
            data: null
        }
    }
    componentWillMount() {

    }
    componentDidMount() {
        this.getCurrenciesDetail();
    }
    getCurrenciesDetail() {
            axios.get('/kc/public/currencies/detail?flag=all')
                .then(res => {
                    var currencies = res.data.data;
                    var finance = {};
                    for (var index in currencies) {
                        var raw = currencies[index];
                        finance[[raw.currency]] = {
                            "amount": 0,
                            "lockAmount": 0,
                            "usableAmount": 0
                        };
                    }
                    this.setState({
                        currencies: currencies,
                        finance: finance
                    }, () => {
                        this.getTotalassets();
                    });
                })
        }
        //总资产
    getTotalassets() {
        axios.get('/kc/wallet/finance', {
                headers: {
                    "Content-Type": "application/json",
                    "authorization": sessionStorage.getItem("authorization")
                }
            })
            .then((res) => {
                if (res.data.data) {
                    this.setState({
                        data: res.data.data
                    })
                }
                var oldFinance = {...this.state.finance
                };
                var finance = res.data.data;
                for (var index in finance) {
                    var raw = finance[index];
                    if (raw.currency in oldFinance) {
                        oldFinance[raw.currency].amount = raw.amount;
                        oldFinance[raw.currency].lockAmount = raw.lock_amount;
                        oldFinance[raw.currency].usableAmount = limitAmount(raw.amount - raw.lock_amount);
                    }
                }
                this.setState({
                    finance: oldFinance
                });
            })
            .catch(function(error) {
                console.log(error);
            });
    }


    wdetailPath(currency, finance) {
        return {
            pathname: '/kuangfront/wdetail',
            state: {
                currency: currency,
                finance: finance
            }
        }
    }

    render() {
        return (
            <div className="mywallet">
                        <Head />
                        <div className="mywallet_Info">
                            <ul className="wallet_ul">
                             {
                                this.state.currencies.map((item, index) => {
                                    return (
                                          <li key={index}>
                                            <Link to={this.wdetailPath(item.currency,this.state.finance)}>
                                                    <div className="cuur"><img src={require(`../img/${item.currency?item.currency:`noImg`}.png`)} alt=""/></div>
                                                    <div className="wallet_amount"><p>{item.currency}</p><span className="wallet_amountInfo">{this.state.finance[item.currency].amount}</span></div>
                                            </Link>
                                          </li>
                                    )
                                })
                             }   
                             </ul>                               
                        </div>              
                    </div>
        )
    }
}

Wallet.propTypes = {
    intl: intlShape.isRequired
}
export default injectIntl(Wallet);