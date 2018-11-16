import React from 'react'
import Head from '@/components/common/Head'
import axios from 'axios'
import {
    Tabs,
    Toast,
    Pagination
} from 'antd-mobile';
import {
    Link
} from 'react-router-dom'
import '@/style/Pool.css'
import {
    showDatetime,
    showDate
} from '@/components/common/utils';
import {
    injectIntl,
    intlShape,
    FormattedMessage,
} from 'react-intl';
const fail = (msg) => {
    Toast.fail(msg);
};


class Attornrecord extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataList: [],
            pagination: {},
            status: 0
        }
    }

    componentDidMount() {
        this.getTrades(1, "FET", 0);
        this.node.scrollIntoView();
    }
    changeStatus = (tab, index) => {
        this.setState({
            status: index,
        })
        this.getTrades(1, "FET", index)
    }
    getTrades = (page, currency, direction) => {
        axios.get("/kc/wallet/inlocked", {
                params: {
                    direction: direction,
                    page: page,
                    currency: currency
                },
                headers: {
                    "authorization": sessionStorage.getItem("authorization")
                }
            })
            .then(res => {
                if (res.data.code == '100103') {
                    window.location.href = "/kuangfront/login";
                } else if (res.data.code == '100200') {
                    const pagination = {...this.state.pagination
                    };
                    pagination.total = res.data.data.total_page;
                    pagination.current = res.data.data.page_no;
                    this.setState({
                        dataList: res.data.data.list,
                        pagination: pagination
                    });
                } else {
                    Toast.fail(res.data.msg, 1);
                }
            })
    }

    locale = {
        prevText: this.props.intl.formatMessage({
            id: 'prev'
        }),
        nextText: this.props.intl.formatMessage({
            id: 'next'
        }),
    }
    handleTableChange = (current) => {
        this.getTrades(current, "FET", this.state.status);
        this.node.scrollIntoView();
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
    transfersource = (status) => {
        if (status == 0) {
            return <FormattedMessage
                                id='turnothers'
                                defaultMessage = "转账给他人"
                             />;
        } else {
            return <FormattedMessage
                                id='otherturn'
                                defaultMessage = "他人转入"
                             />;
        }
    }
    renderContent = tab =>

        (<div className="pool_list">
                    
                        {
                            this.state.dataList.length>0?
                            <div>
                                {
                                        this.state.dataList.map((item,index)=>{
                                            return(
                                                <div key={index+"s"} className="pool_info">
                                                    <div><span>{showDatetime(item.create_time)}</span></div>
                                                    <div>
                                                    <p><span>{this.transfersource(this.state.status)}</span><span>{this.state.status == 0?item.to:item.from}</span></p>
                                                    <p><FormattedMessage
                                id='sellAmount'
                                defaultMessage = "数量"
                             /><span>{item.amount}</span></p>
                                                    <p><FormattedMessage
                                id='recharge_state'
                                defaultMessage = "状态"
                             /><span>{this.showStatus(item.status, item.confirmations)}</span></p>
                                                    </div>
                                                </div>
                                                )
                                        })
                                     }
                            </div>:<div className="noData"><FormattedMessage
                                                id='nodata'
                                                defaultMessage = "暂无"
                                            /></div>
                       }
                      <div  className="profit_footer">
                            <Pagination total={this.state.pagination.total} current={this.state.pagination.current} locale={this.locale} onChange={this.handleTableChange} />
                        </div>
                     </div>);
    render() {
        const tabs = [{
            title: this.props.intl.formatMessage({
                id: 'turnout'
            })
        }, {
            title: this.props.intl.formatMessage({
                id: 'turnin'
            })
        }];
        return (
            <div className="pool" ref={node => this.node = node}>          
                 <Head />
                  <Tabs tabs={tabs} onChange={this.changeStatus}  renderTabBar={props => <Tabs.DefaultTabBar {...props} page={2} />}>
                          {this.renderContent}
                        </Tabs>
                   
                </div>
        )
    }
}
Attornrecord.propTypes = {
    intl: intlShape.isRequired
}
export default injectIntl(Attornrecord);