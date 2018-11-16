import React from 'react'
import ReactDOM from 'react-dom';

import '../style/Home.css'

import Header from './Header';
import Banner from './common/Banner'
import Notice from './common/Notice'
import axios from 'axios'
import {
    PullToRefresh,
    ListView,
    Button,
} from 'antd-mobile';
import {
    Link
} from 'react-router-dom'
import {
    showCountry
} from "./common/utils"
import {
    injectIntl,
    intlShape,
    FormattedMessage
} from 'react-intl';
const NUM_ROWS = 20;
let pageIndex = 0;


function showAvatar(avatar) {
    if (avatar) {
        return "/uphp/gcexserver/avatar/" + avatar
    }
    return require('../img/user.png')
}
let showRange = (min, max, unit) => {
    if (min == 0 && max == 0) {
        return <FormattedMessage
                            id='unlimited'
                        />
    } else if (min == 0 && max > 0) {
        return <FormattedMessage
                            id='min'
                            defaultMessage={`低于 {max} {unit}`}
                            values={{max:max,unit:unit}}
                        />
    } else if (min > 0 && max == 0) {
        return <FormattedMessage
                            id='max'
                            defaultMessage={`高于 {min} {unit}`}
                            values={{min:min,unit:unit}}
                        />
    } else {
        return "" + min + "~" + max + " " + unit
    }
}
class Home extends React.Component {


    constructor(props) {
        super(props);
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });

        this.state = {
            dataSource,
            refreshing: true,
            isLoading: true,
            height: document.documentElement.clientHeight,
            useBodyScroll: true,
            total_page: 0,
            direction: "sell",
            pageNum: 1,
            pageNums: 1
        };

    }
    componentDidUpdate() {
        if (this.state.useBodyScroll) {
            document.body.style.overflow = 'auto';
        } else {
            document.body.style.overflow = 'hidden';
        }
    }

    componentDidMount() {
        const hei = this.state.height - ReactDOM.findDOMNode(this.lv).offsetTop;

        setTimeout(() => {
            // console.log(this.genData())
            // this.rData = this.genData();
            this.genData();
            this.setState({
                // dataSource: this.state.dataSource.cloneWithRows(this.genData()),
                height: hei,
                refreshing: false,
                isLoading: false,

            });
        }, 1500);


    }
    onRefresh = () => {
        this.setState({
            refreshing: true,
            isLoading: true,
            pageNum: 1,
            pageNums: 1
        });
        // simulate initial Ajax
        setTimeout(() => {
            // this.rData = this.genData();
            this.genData()
            this.setState({
                // dataSource: this.state.dataSource.cloneWithRows(this.rData),
                refreshing: false,
                isLoading: false,
            });
        }, 600);
    };

    onEndReached = (event) => {

        // load new data
        // hasMore: from backend data, indicates whether it is the last page, here is false
        if (this.state.isLoading && !this.state.hasMore) {
            return;
        }
        console.log('reach end', event);
        this.setState({
            isLoading: true
        });

        setTimeout(() => {
            if (this.state.direction == "sell") {
                if (++this.state.pageNum <= this.state.total_page) {
                    this.getData(this.state.pageNum)
                }
            }
            if (this.state.direction == "buy") {
                if (++this.state.pageNums <= this.state.total_page) {
                    this.getData(this.state.pageNums)

                }
            }
            // this.rData = [...this.rData, ...this.state.dataSource._dataBlob.s1];
            // console.log(this.rData)
            this.setState({
                // dataSource: this.state.dataSource.cloneWithRows(this.rData),
                isLoading: false,
            });

        }, 1000);
    };

    genData = (page, direction) => {
        const dataArr = [];
        axios.get("/kc/public/ads", {
                params: {
                    direction: this.state.direction,
                    page: page,
                    currency: "BTC"
                }
            })
            .then((res) => {
                var res = res.data.data;
                for (let i = 0; i < res.list.length; i++) {
                    dataArr.push(res.list[i]);
                }
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(dataArr),
                    total_page: res.total_page
                });
                // console.log(this.state.dataSource._dataBlob.s1)
            })
            .catch(err => {
                console.log(err)
            })

    }
    getData = (page, direction) => {
        const dataArr = [];
        axios.get("/kc/public/ads", {
                params: {
                    direction: this.state.direction,
                    page: page,
                    currency: "BTC"
                }
            })
            .then((res) => {
                var res = res.data.data.list;
                var rData = {};
                rData = [...rData, ...this.state.dataSource._dataBlob.s1];
                for (var i in res) {
                    rData.push(res[i])
                }
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(rData),
                });

            })
            .catch(err => {
                console.log(err)
            })
    }

    changeDirection = () => {
        this.setState({
            direction: "buy",
            pageNum: 1,
            pageNums: 1
        }, () => {
            this.genData();
        })
    }
    changeDirections = () => {
        this.setState({
            direction: "sell",
            pageNum: 1,
            pageNums: 1
        }, () => {
            this.genData();
        })
    }
    showPaymentMethods = {
        "ALIPAY": <FormattedMessage
                            id='alipay'
                            defaultMessage="支付宝"
                        />,
        "NATIONAL_BANK": <FormattedMessage
                            id='bank'
                            defaultMessage="银行转账"
                        />,
        "WECHAT": <FormattedMessage
                            id='wechat'
                            defaultMessage="微信支付"
                        />,
    }

    render() {
        const separator = (sectionID, rowID) => ( < div key = {
                `${sectionID}-${rowID}`
            }
            style = {
                {
                    backgroundColor: '#F5F5F9',
                    height: 8,
                    borderTop: '1px solid #ECECED',
                    borderBottom: '1px solid #ECECED'
                }
            }
            />
        );
        const row = (rowData, sectionID, rowID) => {
            return (
                <Link to={"/kuangfront/detail/" + rowData.code} key={rowID} >
                <div className="tao_list" >
                    <div className="tao_userImg">
                        <span className="otc_userImg"><img  src={ showAvatar(rowData.avatar) } alt=""/></span>
                    </div>
                    <div className="tao_tradeInfo">
                        <h3>{rowData.username}</h3>
                        <p><FormattedMessage
                            id='tradeTimes'
                            defaultMessage={`{trade_times} 笔交易`}
                            values={{trade_times:rowData.trade_times}}
                        /><FormattedMessage
                            id='traderate'
                            defaultMessage="{rates}% 成交率"
                            values={{rates:rowData.rates}}
                        /></p>
                        <p className="tao_amount"><span>{parseFloat(rowData.amount)} {rowData.currency}</span>{this.showPaymentMethods[rowData.payment_methods]}</p>
                    </div>
                    <div className="tao_price">
                        <h2>{rowData.price} {rowData.unit}/{rowData.currency}</h2>
                        <p>{showRange(rowData.min_price, rowData.max_price, rowData.unit)}</p>
                        <Button className="tao_buyBtn" type="primary" size="small" inline>{this.state.direction == "sell"?<FormattedMessage
                            id='buy2'
                            defaultMessage="买入"
                        />:<FormattedMessage
                            id='sell3'
                            defaultMessage="出售"
                        />}</Button>
                    </div>
                </div>
                </Link>
            );
        };



        return (
            <div className="tao_home">
                <Header changeDirection={this.changeDirection} changeDirections={this.changeDirections}/>
                <Banner />
                <Notice />
                
                <ListView
                    key={this.state.useBodyScroll ? '0' : '1'}
                    ref={el => this.lv = el}
                    dataSource={this.state.dataSource}
                    renderFooter={() => (<div style={{ padding: 5, textAlign: 'center' }}>
                      {this.state.isLoading ? 'Loading...' : 'Loaded'}
                    </div>)
    }
    renderRow = {
        row
    }
    renderSeparator = {
        separator
    }
    useBodyScroll = {
        this.state.useBodyScroll
    }
    style = {
        this.state.useBodyScroll ? {} : {
            height: this.state.height,
            border: '1px solid #ddd',
            margin: '5px 0',
        }
    }
    pullToRefresh = {
        <PullToRefresh
                          refreshing={this.state.refreshing}
                          onRefresh={this.onRefresh}
                        />
    }
    onEndReached = {
        this.onEndReached
    }
    pageSize = {
        5
    }
    />  </div >
)
}
}

Home.propTypes = {
    intl: intlShape.isRequired
}
export default injectIntl(Home);