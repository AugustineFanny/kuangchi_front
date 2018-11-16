import React from 'react'
import '../style/Header.css'
import "../iconfont/iconfont.css"

import {
    Popover,
    NavBar,
    Icon,
    WingBlank,
    Button
} from 'antd-mobile';
import {
    injectIntl,
    intlShape,
    FormattedMessage
} from 'react-intl';
import PubSub from 'pubsub-js';
const Item = Popover.Item;

class Header extends React.Component {
    constructor() {
        super();
        let country;
        if (sessionStorage.getItem("language")) {
            country = sessionStorage.getItem("language")
        } else {
            country = "EN"
        }
        this.state = {
            show: "index",
            visible: false,
            selected: '',
            country: country,
            buyBtn: true,
            sellBtn: false,
            buyStyle: {
                back: "#54d8a3",
                color: "#fff"
            },
            sellStyle: {
                back: "#fff",
                color: "#54d8a3"
            },
        };
    }
    componentDidMount() {
        var url = window.location.href;
        if (url.indexOf("trade") > 0) {
            this.refs.index.style.display = "none";
            this.refs.trade.style.display = "flex"
        }
    }
    onSelect = (opt) => {
        var val = opt.props.value;
        var newVal;
        PubSub.publish('language', val);
        sessionStorage.setItem("lang", val);　
        switch (val) {
            case "zh-CN":
                sessionStorage.setItem("language", "CN");
                newVal = "CN";
                break;
            case "en-US":
                sessionStorage.setItem("language", "EN");
                newVal = "EN";
                break;
            case "ko":
                sessionStorage.setItem("language", "KO");
                newVal = "KO";
                break;
            case "ja":
                sessionStorage.setItem("language", "JA");
                newVal = "JA";
                break;
        }
        this.setState({
            visible: false,
            selected: opt.props.value,
            country: newVal
        });
    };
    handleVisibleChange = (visible) => {
        this.setState({
            visible,
        });
    };
    goBack = () => {
        // window.location.href = "/";
        window.history.go(-1);
    }
    ownerCancelTrade = () => {
        this.props.ownerCancelTrade()
    }
    cancelTrade = () => {
        this.props.cancelTrade()
    }

    buyBtn = () => {
        this.props.changeDirections();
        this.node.scrollIntoView();
        this.setState({
            buyBtn: true,
            sellBtn: false,
            sellStyle: {
                back: "#fff",
                color: "#54d8a3"
            },
            buyStyle: {
                back: "#54d8a3",
                color: "#fff"
            }
        })
    }
    sellBtn = () => {
        this.props.changeDirection();
        this.node.scrollIntoView();
        this.setState({
            sellBtn: true,
            buyBtn: false,
            sellStyle: {
                back: "#54d8a3",
                color: "#fff"
            },
            buyStyle: {
                back: "#fff",
                color: "#54d8a3"
            }
        })
    }



    render() {
        const {
            intl
        } = this.props;
        const getMessage = intl.messages;
        var tradeCode = this.props.tradeCode;
        var tradeStatus = this.props.tradeStatus;
        var isAdvertiser = this.props.isAdvertiser;
        var isBuyer = this.props.isBuyer;
        var btn;
        var url = window.location.href;
        if (url.indexOf("/") > 0 || url.indexOf("advertise") > 0) {

        }
        if (tradeStatus == 0 && !isAdvertiser) {
            btn = (
                <span onClick={this.ownerCancelTrade}><FormattedMessage
                            id='cancel'
                            defaultMessage="取消交易"
                        /></span>
            )
        } else if ((tradeStatus == 1 && isBuyer) || (tradeStatus == 2 && isBuyer)) {
            btn = (
                <span onClick={this.cancelTrade}><FormattedMessage
                            id='cancel'
                            defaultMessage="取消交易"
                        /></span>
            )
        }
        return (
            <div  ref={node => this.node = node}>
            <div className="tao_header"  >

                    <div ref="index">
                          <NavBar
                            mode="light"
                            leftContent={
                              <Popover 
                                mask
                                placement ={'bottomLeft'}
                                overlayClassName="fortest"
                                overlayStyle={{ color: 'currentColor' }}
                                visible={this.state.visible}
                                overlay={[
                                  (<Item key="4" value="zh-CN" data-seed="logId">CN</Item>),
                                  (<Item key="5" value="en-US"  style={{ whiteSpace: 'nowrap' }}>EN</Item>),
                                ]}
                                align={{
                                  overflow: { adjustY: 0, adjustX: 0 },
                                  offset: [-10, 0],
                                }}
                                onVisibleChange={this.handleVisibleChange}
                                onSelect={this.onSelect}
                              >
                                <div style={{
                                  height: '100%',
                                  marginRight: '-15px',
                                  display: 'flex',
                                  alignItems: 'center',
                                }}
                                >
                                 <p>{this.state.country}<span className="pointDown"></span></p>
                                </div>
                              </Popover>
                            }
                          >
                             <WingBlank size="lg" className="sc-example">
                                
                             <div className="header_center" >
                                <span className="left"><Button onClick={this.buyBtn} disabled={this.state.buyBtn} type="primary" inline size="small" style={{background:this.state.buyStyle.back,color:this.state.buyStyle.color}}><FormattedMessage
                            id='buy'
                            defaultMessage="购买"
                        /></Button></span>
                                <span className="right"><Button onClick={this.sellBtn} disabled={this.state.sellBtn}  type="primary" inline size="small" style={{background:this.state.sellStyle.back,color:this.state.sellStyle.color}}><FormattedMessage
                            id='sell'
                            defaultMessage="出售"
                        /></Button></span>
                             </div>
                             </WingBlank>
                          </NavBar>
                      
                    </div> <div className = "trade_header"
            ref = "trade"
            style = {
                {
                    display: "none"
                }
            } >
            <div onClick={this.goBack}><i className="icon iconfont icon-iconfontjiantou1"></i><span>{this.state.left}</span></div> <div > <FormattedMessage
                                    id='orders'
                                     /> {
                tradeCode
            } </div> <div> {btn} </div> </div>

            < /div> </div >
        )
    }
}

Header.propTypes = {
    intl: intlShape.isRequired
}
export default injectIntl(Header);