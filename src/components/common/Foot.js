import React from 'react'
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
    injectIntl,
    intlShape,
    FormattedMessage
} from 'react-intl';
class Foot extends React.Component {



    render() {
        return (
            <div className="tao_footer" ref="tao_footer" id="otc_footer">
                    <div style={{display:"none"}}>{window.location.pathname == "/kuangfront/mywallet"?<Link className="selected" to="/kuangfront/mywallet"> <i className="icon iconfont icon-wodeqianbao1"></i><FormattedMessage
                            id='wallet'
                            defaultMessage="钱包"
                        /></Link>:<Link to="/kuangfront/mywallet"> <i className="icon iconfont icon-qianbao-hui"></i><FormattedMessage
                            id='wallet'
                            defaultMessage="钱包"
                        /></Link>}</div>
                             
                    <div className="tao_footer_news">
                        <List.Item>
                            {window.location.pathname == "/kuangfront/finance"?<Link className="selected" to="/kuangfront/finance"> <i className="icon iconfont icon-kuaijiecaidan"></i><FormattedMessage
                            id='Finance'
                            defaultMessage="财务"
                        /></Link>:<Link to="/kuangfront/finance"> <i className="icon iconfont icon-caidan"></i><FormattedMessage
                            id='Finance'
                            defaultMessage="财务"
                        /></Link>}
                        </List.Item>
                    </div>
                    <div>{window.location.pathname == "/kuangfront/my"?<Link className="selected" to="/kuangfront/my"> <i className="icon iconfont icon-wodemian2"></i><FormattedMessage
                            id='my'
                            defaultMessage="我的"
                        /></Link>:<Link to="/kuangfront/my"> <i className="icon iconfont icon-wode"></i><FormattedMessage
                            id='my'
                            defaultMessage="我的"
                        /></Link>}</div>
                </div>
        )
    }
}

Foot.propTypes = {
    intl: intlShape.isRequired
}
export default injectIntl(Foot);