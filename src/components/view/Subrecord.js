import React from 'react'
import Head from '../common/Head'
import axios from 'axios'
import {
    Toast,
    Pagination,
    Button,
    ActivityIndicator,
} from 'antd-mobile';
import '@/style/Subrecord.css'
import {
    showDatetime,
    showDate
} from '../common/utils';
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

class Subrecord extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataList: [],
            pagination: {},
            status: 0,
            redirect: false,
            id: "",
            animating: true

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
        axios.get("/kc/wallet/orders", {
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
                        dataList: res.data.data.list,
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
    toAttorn = (id, event) => {

        this.setState({
            id: id,
            redirect: true
        })
    }
    gotoSure = (order) => {
        return {
            pathname: "/kuangfront/subinfo",
            state: {
                order: order
            }
        }
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
    locale = {
        prevText: this.props.intl.formatMessage({
            id: 'prev'
        }),
        nextText: this.props.intl.formatMessage({
            id: 'next'
        }),
    }

    render() {

        if (this.state.redirect) {
            return <Redirect push to={"/kuangfront/attorn" + this.state.id} />;
        }
        return (
            <div className="sub" ref={node => this.node = node}>          
                 <Head />
                    {
                        this.state.animating?
                        <ActivityIndicator
                toast
                text="Loading..."
                animating={this.state.animating}
              />: <div className="sub_list">
                        {
                            this.state.dataList.length>0?
                            <div>
                                {
                                        this.state.dataList.map((item,index)=>{
                                            return(
                                                <div key={item.id} className="sub_info">
                                                    <Link to={this.gotoSure(item.order)}>
                                                     <div className="sub_title">
                                                        <span className="sub_logo">
                                                                    <FormattedMessage
                                                                        id='subscriptions'
                                                                        defaultMessage = "认购"
                                                                    /></span>
                                                        <span>{showDatetime(item.create_time)}</span>
                                                        <span>{this.statusfun(item.status)}</span>
                                                     </div>
                                                     <div className="subInfo">
                                                         <div className="sub_infos">
                                                            <section><p>{item.base}</p><p>-{item.base_amount}</p></section>
                                                            <section><p>{item.currency}</p><p>+{item.currency_amount}</p></section>
                                                            <section><FormattedMessage
                                                                        tagName="p"
                                                                        id='order'
                                                                        defaultMessage = "订单号"
                                                                    /><p></p><p>{item.order}</p></section>
                                                         </div>
                                                     </div>
                                                     </Link>
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
                    }
                      <div  className="sub_footer">
                            <Pagination total={this.state.pagination.total} current={this.state.pagination.current} locale={this.locale} onChange={this.handleTableChange} />
                        </div>
                  
                </div>
        )
    }
}
Subrecord.propTypes = {
    intl: intlShape.isRequired
}
export default injectIntl(Subrecord);