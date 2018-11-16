import React from 'react'
import Head from '@/components/common/Head'
import '@/style/Share.css'
import axios from 'axios'
import QRCode from '@/components/common/QRCode'

import {
    Link
} from 'react-router-dom'
import {
    limitAmount
} from '@/components/common/utils'
import {
    Toast,
    Tabs,
    Pagination
} from 'antd-mobile';
import {
    injectIntl,
    intlShape,
    FormattedMessage
} from 'react-intl';

function getSize(size) {
    const clienWidth = document.documentElement.clientWidth / 40
    return Math.floor(size * clienWidth)
}
class Share extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            addr: ""
        }
    }
    componentWillMount() {

    }
    getAddr = (currency) => {
        axios.get("/kc/self/invitelink", {
                headers: {
                    "authorization": sessionStorage.getItem("authorization")
                }
            })
            .then(res => {
                var res = res.data.data;
                this.setState({
                    addr: res.url,
                })
            })
            .catch(err => {
                console.log(err)
            })
    }
    componentDidMount() {
        this.getAddr()
    }

    render() {

        return (

            <div className="share">
                  <Head />
                  <div className="share_content">
                        <ul>
                           <li>
                              <div> <i className="icon iconfont icon-jiahao"></i><FormattedMessage
                            id='erQR'
                             defaultMessage = "节点二维码"
                        /></div>
                                <div><i className="icon iconfont icon-jiantou"></i></div>
                            </li>
                        </ul>
                        <div className="share_er">
                            <FormattedMessage
                            tagName="p"
                            id='erQRkonw'
                             defaultMessage = "扫描识别二维码注册FET挖矿节点"
                        />
                            <div className="share_img">
                                     {this.state.addr ?
                                        <QRCode value={this.state.addr} size={getSize(20)} /> :
                                        null
                                     }
                                </div>
                        </div>
                  </div>               
            </div>
        )
    }
}

Share.propTypes = {
    intl: intlShape.isRequired
}
export default injectIntl(Share);