import React from 'react'
import '../../style/Head.css'
import "../../iconfont/iconfont.css"
import {
    injectIntl,
    intlShape,
    FormattedMessage,
    defineMessages

} from 'react-intl';
class Head extends React.Component {
    constructor() {
        super();
        this.state = {
            left: "",
            center: ""
        }
    }

    componentDidMount() {
        let messages = defineMessages({
            center: {
                id: 'chating',
                defaultMessage: '与 {target } 对话中...',
                values: {
                    target: this.props.target
                }
            },
        });
        let evaluate = defineMessages({
            center: {
                id: 'evaluating',
                defaultMessage: ' 对用户{target}的评价',
                values: {
                    target: this.props.target
                }
            },
        });
        var url = window.location.href;
        if (url.indexOf("install") > 0) {
            this.setState({
                left: this.props.intl.formatMessage({
                    id: 'my'
                }),
                center: this.props.intl.formatMessage({
                    id: 'set'
                })
            })
        }
        if (url.indexOf("information") > 0) {
            this.setState({
                left: "",
                center: this.props.intl.formatMessage({
                    id: 'information'
                })
            })
        }
        if (url.indexOf("idverification") > 0) {
            this.setState({
                left: this.props.intl.formatMessage({
                    id: 'set'
                }),
                center: this.props.intl.formatMessage({
                    id: 'id'
                })
            })
        }
        if (url.indexOf("material") > 0) {
            this.setState({
                left: this.props.intl.formatMessage({
                    id: 'set'
                }),
                center: this.props.intl.formatMessage({
                    id: 'kyc'
                })
            })
        }


        if (url.indexOf("safely") > 0) {
            this.setState({
                left: "",
                center: this.props.intl.formatMessage({
                    id: 'safe'
                }),
            })
        }

        if (url.indexOf("changepwd") > 0) {
            this.setState({
                left: "",
                center: this.props.intl.formatMessage({
                    id: 'changelogin'
                }),
            })
        }


        if (url.indexOf("emailtest") > 0) {
            this.setState({
                left: "",
                center: this.props.intl.formatMessage({
                    id: 'emailtest'
                }),
            })
        }
        if (url.indexOf("phonetest") > 0) {
            this.setState({
                left: "",
                center: this.props.intl.formatMessage({
                    id: 'phonetest'
                }),
            })
        }
        if (url.indexOf("fundpwd") > 0) {
            this.setState({
                left: "",
                center: this.props.intl.formatMessage({
                    id: 'fundPwd'
                }),
            })
        }

        if (url.indexOf("recharge") > 0) {
            this.setState({
                left: "",
                center: this.props.intl.formatMessage({
                    id: 'recharge'
                }),

            })
        }
        if (url.indexOf("withdrawals") > 0) {
            this.setState({
                left: "",
                center: this.props.intl.formatMessage({
                    id: 'withdrawals'
                }),

            })
        }

        if (url.indexOf("terms") > 0) {
            this.setState({
                left: "",
                center: this.props.intl.formatMessage({
                    id: 'terms'
                }),
            })
        }

        if (url.indexOf("record") > 0 || url.indexOf("detail") > 0) {
            this.setState({
                left: "",
                center: this.props.intl.formatMessage({
                    id: 'details'
                }),
            })
        }
        if (url.indexOf("poolrecord") > 0) {
            this.setState({
                left: "",
                center: this.props.intl.formatMessage({
                    id: 'poorlrecord'
                }),
            })
        }
        if (url.indexOf("mywallet") > 0 || url.indexOf("wdetail") > 0) {
            this.setState({
                left: "",
                center: this.props.intl.formatMessage({
                    id: 'wallet'
                }),
            })
        }
        if (url.indexOf("share") > 0) {
            this.setState({
                left: "",
                center: this.props.intl.formatMessage({
                    id: 'share'
                }),
            })
        }
        if (url.indexOf("finance") > 0) {
            this.setState({
                left: "",
                center: this.props.intl.formatMessage({
                    id: 'Finance'
                }),
            })
        }
        if (url.indexOf("transfer") > 0) {
            this.setState({
                left: "",
                center: this.props.intl.formatMessage({
                    id: 'rotation'
                }),
            })
        }
        if (url.indexOf("profit") > 0) {
            this.setState({
                left: "",
                center: this.props.intl.formatMessage({
                    id: 'Profit'
                }),
            })
        }
        if (url.indexOf("switchto") > 0) {
            this.setState({
                left: "",
                center: this.props.intl.formatMessage({
                    id: 'turnin'
                }),
            })
        }
        if (url.indexOf("nodelist") > 0) {
            this.setState({
                left: "",
                center: this.props.intl.formatMessage({
                    id: 'nodelists'
                }),
            })
        }
        if (url.indexOf("transferlnStation") > 0) {
            this.setState({
                left: "",
                center: this.props.intl.formatMessage({
                    id: 'rotaRecord'
                }),
            })
        }
        if (url.indexOf("mineral") > 0) {
            this.setState({
                left: "",
                center: this.props.intl.formatMessage({
                    id: 'coinSet'
                }),
            })
        }
        if (url.indexOf("turnout") > 0) {
            this.setState({
                left: "",
                center: this.props.intl.formatMessage({
                    id: 'turnout'
                }),
            })
        }
        if (url.indexOf("myextension") > 0) {
            this.setState({
                left: "",
                center: this.props.intl.formatMessage({
                    id: 'myPublice'
                }),
            })
        }
        if (url.indexOf("attorn") > 0) {
            this.setState({
                left: "",
                center: this.props.intl.formatMessage({
                    id: 'turnother'
                }),
            })
        }
        if (url.indexOf("attrecord") > 0) {
            this.setState({
                left: "",
                center: this.props.intl.formatMessage({
                    id: 'turnRecord'
                }),
            })
        }
        if (url.indexOf("subscription") > 0) {
            this.setState({
                left: "",
                center: this.props.intl.formatMessage({
                    id: 'subscription'
                }),
            })
        }
        if (url.indexOf("lang") > 0) {
            this.setState({
                left: "",
                center: this.props.intl.formatMessage({
                    id: 'lang'
                }),
            })
        }
        if (url.indexOf("setting") > 0) {
            this.setState({
                left: "",
                center: this.props.intl.formatMessage({
                    id: 'setup'
                }),
            })
        }
        if (url.indexOf("subrecord") > 0) {
            this.setState({
                left: "",
                center: this.props.intl.formatMessage({
                    id: 'subRecord'
                }),
            })
        }
        if (url.indexOf("subinfo") > 0) {
            this.setState({
                left: "",
                center: this.props.intl.formatMessage({
                    id: 'orderinfo'
                }),
            })
        }
    }
    goBack = () => {
        window.history.go(-1);
    }
    render() {
        return (
            <div className="tao_head">
                <div onClick={this.goBack}><i className="icon iconfont icon-iconfontjiantou1"></i><span>{this.state.left}</span></div>
                <div className="head_tit">{this.state.center}</div>
                <div></div>
            </div>
        )
    }
}

Head.propTypes = {
    intl: intlShape.isRequired
}
export default injectIntl(Head);