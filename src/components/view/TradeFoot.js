import React from 'react';
import axios from 'axios'
import {
    List,
    Badge
} from 'antd-mobile';
import {
    BrowserRouter as Router,
    Route,
    Link,
} from 'react-router-dom'
import {
    connect
} from 'react-redux'
import {
    injectIntl,
    intlShape,
    FormattedMessage,
} from 'react-intl';
class TradeFootrInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            code: this.props.code,
            target: this.props.target,
            userAvatar: this.props.userAvatar,
            targetAvatar: this.props.targetAvatar
        }
    }
    componentDidMount() {}

    //评价传参
    giveCode = () => {
        var obj = {
            ifgiveCode: true,
        }
        this.props.giveCode(obj);
    }


    release = () => {
        this.props.release();
    }
    paymentCompleted = () => {
        this.props.paymentCompleted();
    }
    restart = () => {
        this.props.restart()
    }
    render() {
        let content;
        var tradefoot = this.props.tradefoot;
        var code = this.state.code;
        var target = this.props.target;
        var userAvatar = this.props.userAvatar;
        var targetAvatar = this.props.targetAvatar;
        switch (tradefoot.status) {
            case 0:
                content = (
                    <div>
                             <section>
                                <Link to={{pathname:"/kuangfront/chat",state:{code:code,userAvatar:userAvatar,targetAvatar:targetAvatar,target:target}}}><span className="footBtn"><i className="icon iconfont icon-xiaoxi"></i> <FormattedMessage
                                    id='ContactHim'
                                     /></span></Link>
                            </section>
                        </div>)
                break;
            case 1: //已注资，待付款
                if (tradefoot.isBuyer) { //买家
                    content = (
                        <div>
                             <section>
                                <Link to={{pathname:"/kuangfront/chat",state:{code:code,userAvatar:userAvatar,targetAvatar:targetAvatar,target:target}}}><span className="footBtn"><i className="icon iconfont icon-xiaoxi"></i><FormattedMessage
                                    id='ContactHim'
                                     /></span></Link>
                            </section>
                            <section>
                                <span className="footBtn" onClick={this.paymentCompleted}><i className="icon iconfont icon-meiyuanqianbao"></i><FormattedMessage
                                    id='finishpay'
                                     /></span>
                            </section>
                        </div>
                    )
                } else if (tradefoot.seller == sessionStorage.getItem("username")) {
                    content = (
                        <div>
                             <section>
                                <Link to={{pathname:"/kuangfront/chat",state:{code:code,userAvatar:userAvatar,targetAvatar:targetAvatar,target:target}}}><span className="footBtn"><i className="icon iconfont icon-xiaoxi"></i><FormattedMessage
                                    id='ContactHim'
                                     /></span></Link>
                            </section>
                            <section>
                                <span className="footBtn" onClick={this.release}><i className="icon iconfont icon-meiyuanqianbao"></i><FormattedMessage
                                    id='buyok'
                                     /></span>
                            </section>
                        </div>
                    )
                }
                break;
            case 2:
                if (tradefoot.isBuyer) { //买家
                    content = (
                        <div>
                             <section>
                                <Link to={{pathname:"/kuangfront/chat",state:{code:code,userAvatar:userAvatar,targetAvatar:targetAvatar,target:target}}}><span className="footBtn"><i className="icon iconfont icon-xiaoxi"></i><FormattedMessage
                                    id='ContactHim'
                                     /></span></Link>
                            </section>
                        </div>
                    )
                } else if (tradefoot.seller == sessionStorage.getItem("username")) {
                    content = (
                        <div>
                             <section>
                                <Link to={{pathname:"/kuangfront/chat",state:{code:code,userAvatar:userAvatar,targetAvatar:targetAvatar,target:target}}}><span className="footBtn"><i className="icon iconfont icon-xiaoxi"></i><FormattedMessage
                                    id='ContactHim'
                                     /></span></Link>
                            </section>
                            <section>
                                <span className="footBtn" onClick={this.release}><i className="icon iconfont icon-meiyuanqianbao"></i><FormattedMessage
                                    id='buyok'
                                     /></span>
                            </section>
                        </div>
                    )
                }
                break;
            case 3:
                if (!tradefoot.commented) { //未完成
                    content = (
                        <div>
                             <section>
                                <Link to={{pathname:"/kuangfront/chat",state:{code:code,userAvatar:userAvatar,targetAvatar:targetAvatar,target:target}}}><span className="footBtn"><i className="icon iconfont icon-xiaoxi"></i><FormattedMessage
                                    id='ContactHim'
                                     /></span></Link>
                            </section>
                            <section>
                                <Link to={"/kuangfront/evaluate"}><span className="footBtn" onClick={this.giveCode}><i className="icon iconfont icon-meiyuanqianbao"></i><FormattedMessage
                                    id='assessbtn'
                                     /></span></Link>
                            </section>
                        </div>)
                } else {
                    content = (
                        <div>
                             <section>
                                <Link to={{pathname:"/kuangfront/chat",state:{code:code,userAvatar:userAvatar,targetAvatar:targetAvatar,target:target}}}><span className="footBtn"><i className="icon iconfont icon-xiaoxi"></i><FormattedMessage
                                    id='ContactHim'
                                     /></span></Link>
                            </section>
                        </div>)
                }
                break;
            case 4: //取消
                content = (
                    <div>
                             <section>
                                <Link to={{pathname:"/kuangfront/chat",state:{code:code,userAvatar:userAvatar,targetAvatar:targetAvatar,target:target}}}><span className="footBtn"><i className="icon iconfont icon-xiaoxi"></i><FormattedMessage
                                    id='ContactHim'
                                     /></span></Link>
                            </section>
                        </div>
                )
                break;
            case 5: //自动取消
                if (tradefoot.isBuyer) {
                    content = (
                        <div>
                             <section>
                                <Link to={{pathname:"/kuangfront/chat",state:{code:code,userAvatar:userAvatar,targetAvatar:targetAvatar,target:target}}}><span className="footBtn"><i className="icon iconfont icon-xiaoxi"></i><FormattedMessage
                                    id='ContactHim'
                                     /></span></Link>
                            </section>
                        </div>)
                } else if (tradefoot.seller == sessionStorage.getItem("username")) {
                    content = (
                        <div>
                             <section>
                                <Link to={{pathname:"/kuangfront/chat",state:{code:code,userAvatar:userAvatar,targetAvatar:targetAvatar,target:target}}}><span className="footBtn"><i className="icon iconfont icon-xiaoxi"></i><FormattedMessage
                                    id='ContactHim'
                                     /></span></Link>
                            </section>
                            <section>
                                <span className="footBtn" onClick={this.restart}><i className="icon iconfont icon-meiyuanqianbao"></i>重新开启托管</span>
                            </section>
                        </div>
                    )
                }
                break;
            case 7:
                content = (
                    <div>
                             <section>
                                <Link to={{pathname:"/kuangfront/chat",state:{code:code,userAvatar:userAvatar,targetAvatar:targetAvatar,target:target}}}><span className="footBtn"><i className="icon iconfont icon-xiaoxi"></i><FormattedMessage
                                    id='ContactHim'
                                     /></span></Link>
                            </section>
                        </div>)
                break;
            case 6:
                content = (
                    <div>
                             <section>
                                <Link to={{pathname:"/kuangfront/chat",state:{code:code,userAvatar:userAvatar,targetAvatar:targetAvatar,target:target}}}><span className="footBtn"><i className="icon iconfont icon-xiaoxi"></i><FormattedMessage
                                    id='ContactHim'
                                     /></span></Link>
                            </section>
                        </div>)
                break;

        }


        return (
            <div className="trade_footer">
                {content}
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        tradefoot: state.trade.tradefoot,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        openModal: (obj) => {
            return dispatch({
                type: "OPENMODAL",
                payload: obj
            })
        },
        giveCode: (obj) => {
            return dispatch({
                type: "GIVECODE",
                payload: obj
            })
        },
        ifPayment: (obj) => {
            return dispatch({
                type: "PAYMENT",
                payload: obj
            })
        },
        Reopen: (obj) => {
            return dispatch({
                type: "REOPEN",
                payload: obj
            })
        }
    }
}
const TradeFoot = connect(mapStateToProps, mapDispatchToProps)(TradeFootrInfo);
TradeFoot.propTypes = {
    intl: intlShape.isRequired
}
export default injectIntl(TradeFoot);