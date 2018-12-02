import React from 'react'
import Head from '@/components/common/Head'
import Lucre from './Lucre'
import axios from 'axios'
import {
    Tabs,
    Toast,
    Pagination,
    ActivityIndicator
} from 'antd-mobile';
import {
    Link
} from 'react-router-dom'
import {
    showDatetime,
} from '@/components/common/utils';
import '@/style/Profit.css'
import {
    injectIntl,
    intlShape,
    FormattedMessage,
} from 'react-intl';
const fail = (msg) => {
    Toast.fail(msg);
};



class Profit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            pagination: {},
            animating: true

        }
    }

    componentDidMount() {
        this.getTrades(1, 0);
        this.node.scrollIntoView();
    }
    getTrades = (page) => {
        axios.get("/kc/wallet/IUU/mining", {
                params: {
                    page: page,
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
                        data: res.data.data.list,
                        pagination: pagination
                    });
                } else {
                    Toast.fail(res.data.msg, 1);
                }
                if (res) {
                    this.setState({
                        animating: false
                    })
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
        this.getTrades(current);
        this.node.scrollIntoView();
    }
    changeStatus = (desc) => {
        if (desc == "mining") {
            return <FormattedMessage
                        id='Miningprofit'
                        defaultMessage = "挖矿收益"
                       />;
        } else if (desc == "share") {

            return <FormattedMessage
                        id='Personal'
                        defaultMessage = "个人推广算力"
                       />;
        } else {
            return <FormattedMessage
                        id='Promotion'
                        defaultMessage = "竞赛推广算力"
                       />;
        }
    }
    render() {

        return (
            <div className="profit" ref={node => this.node = node}>          
                 <Head />
                 <Lucre />
                    <div className="profit_list">
                    {
                        !this.state.animating?<div>
                      {
                        this.state.data.length>0?
                        <div>
                            {
                                    this.state.data.map((item,index)=>{
                                        return(
                                             <div  key={index+"1"} className="profit_info">
                                                 <div className="profit_tit"><span className="profit_cuur">IUU</span><span>{this.changeStatus(item.desc)}</span></div>
                                                <div className="profit_content">
                                                    <span>{item.amount}</span>
                                                    <span>{showDatetime(item.create_time)}</span>
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
                    </div>: <ActivityIndicator
                        toast
                        text="Loading..."
                        animating={this.state.animating}
                      />
                    }
               
      
                       
                     </div>
                </div>
        )
    }
}
Profit.propTypes = {
    intl: intlShape.isRequired
}
export default injectIntl(Profit);