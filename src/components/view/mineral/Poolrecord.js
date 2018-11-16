import React from 'react'
import Head from '@/components/common/Head'
import axios from 'axios'
import {
    Tabs,
    Toast,
    Pagination,
    Button
} from 'antd-mobile';
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
import {
    Link,
    Redirect
} from 'react-router-dom'
const fail = (msg) => {
    Toast.fail(msg);
};

function showPoolStatus(status) {

    switch (status) {
        case 0:
        case "0":
            return <FormattedMessage
                        id='turnPoorl'
                        defaultMessage = "转入矿池"
                       />
        case 1:
        case "1":
            return <FormattedMessage
                        id='turnSuc'
                        defaultMessage = "已转出"
                       />
        case 2:
        case "2":
            return <FormattedMessage
                        id='outSuc'
                        defaultMessage = "已转让"
                       />
    }
    return status;

}
class Poolrecord extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataList: [],
            pagination: {},
            status: 0,
            redirect: false,
            id: "",
            amount: null
        }
    }
    changeStatus = (tab, index) => {
        this.setState({
                status: index,
                dataList: []
            })
            // this.getTrades(1, index)
    }
    componentDidMount() {
        this.getTrades(1, 0);
        this.node.scrollIntoView();
    }
    getTrades = (page, status) => {
        axios.get("/kc/wallet/FET/locked", {
                headers: {
                    "authorization": sessionStorage.getItem("authorization")
                }
            })
            .then(res => {
                if (res.data.code == '100103') {
                    window.location.href = "/kuangfront/login";
                } else if (res.data.code == '100200') {
                    this.setState({
                        dataList: res.data.data,
                    });
                } else {
                    Toast.fail(res.data.msg, 1);
                }
            })
    }
    toAttorn = (id, amount, event) => {
        this.setState({
            id: id,
            amount: amount,
            redirect: true
        })
    }
    ifOnclick = (status) => {
        switch (status) {
            case 0:
            case "0":
                return false;
            case 1:
            case "1":
                return true;
            case 2:
            case "2":
                return true;
        }
        return true;
    }
    handleTableChange = (current) => {
        // this.getTrades(current, this.state.status);
        this.node.scrollIntoView();
    }
    renderContent = tab =>
        (<div className="pool_list">
        {/**
            this.state.dataList?
            <div>
                {
                        this.state.dataList.map((item,index)=>{
                            return(
                                <div key={item.code} className="pool_info">
                                </div>
                                )
                        })
                     }
            </div>:<div className="noData"><FormattedMessage
                                id='nodata'
                                defaultMessage = "暂无"
                            /></div>
        **/}
                     </div>);
    render() {
        const tabs = [{
            title: "全部"
        }, {
            title: "转入"
        }, {
            title: "转出"
        }];
        if (this.state.redirect) {
            return <Redirect push to = {
                {
                    pathname: "/kuangfront/attorn",
                    state: {
                        id: this.state.id,
                        amount: this.state.amount
                    }
                }
            }
            />;
        }
        return (
            <div className="pool" ref={node => this.node = node}>          
                 <Head />
                    {/**<div>
                        <Tabs tabs={tabs} onChange={this.changeStatus}  renderTabBar={props => <Tabs.DefaultTabBar {...props} page={3} />}>
                          {this.renderContent}
                        </Tabs>
                    </div>**/}
                    <div className="pool_list">
                        {
                            this.state.dataList.length>0?
                            <div>
                                {
                                        this.state.dataList.map((item,index)=>{
                                            return(
                                                <div key={index+"s"} className="pool_info">
                                                    <div><span>{showDatetime(item.create_time)}</span></div>
                                                    <div><p><FormattedMessage
                                                            id='sellAmount'
                                                            defaultMessage = "数量"
                                                         /><span>{item.amount} / {item.total_amount}</span></p>
                                                          {
                                                            item.status == "2"?<p><FormattedMessage
                                                                id='Notes'
                                                                defaultMessage = "注释"
                                                               /><FormattedMessage
                                                                id='outSuc'
                                                                defaultMessage = "已转让"
                                                               /></p>:
                                                              <p><FormattedMessage
                                                                id='Unlocked'
                                                                defaultMessage = "已解锁"
                                                             /><span>{item.unlock_num} / 10</span></p>
                                                         }
                                                         <p><FormattedMessage
                                                            id='ice_out'
                                                            defaultMessage = "解冻时间"
                                                         /><span>{showDate(item.expire_date)}</span></p>
                                                    
                                                    <section><div></div><div><Button style={{display:"none"}} type="ghost" inline size="small" disabled><FormattedMessage
                                                            id='turnout'
                                                            defaultMessage = "转出"
                                                         /></Button>
                                                        {
                                                            item.status == "2"?null:
                                                            <Button type="ghost" inline size="small" disabled={this.ifOnclick(item.status)}  onClick={this.toAttorn.bind(this,item.id,item.amount)}><FormattedMessage
                                                                id='turnother'
                                                                defaultMessage = "转让"
                                                            /></Button>
                                                        }
                                                    </div></section>
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
                      
                     </div>
                </div>
        )
    }
}
Poolrecord.propTypes = {
    intl: intlShape.isRequired
}
export default injectIntl(Poolrecord);