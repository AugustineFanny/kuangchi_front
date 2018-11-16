import React from 'react'
import Head from './common/Head'
import Account from './common/Account'
import axios from 'axios'
import '../style/Finance.css'
import {
  Link
} from 'react-router-dom'
import {
  limitAmount,
  codeTest
} from './common/utils'
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


class Finance extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addr: ""
    }
  }
  componentWillMount() {

  }

  componentDidMount() {}

  render() {

    return (

      <div className="finance">
                  <Head />
                   <Account />
                  <div className="finance_content">
                   <Link className="finBtn" to={"/kuangfront/mineral"}>
                         <div>
                            <i className="icon iconfont icon-yuncunchu"></i>
                            <FormattedMessage
                                tagName="p"
                                id='coinSet'
                                defaultMessage = "矿池管理"
                             />
                         </div>
                   </Link>
                    <Link  className="finBtn" to={"/kuangfront/transfer"}>
                         <div>
                            <i className="icon iconfont icon-zhuanhuan1"></i>
                             <FormattedMessage
                                tagName="p"
                                id='Crossrotation'
                                defaultMessage = "平台内互转"
                             />
                         </div>
                   </Link>
                       
                  </div>    
                  <ul className="select headul">
                       <li>
                      
                        </li>
                   </ul>  
                   <div className="select_content">
                   <Link className="finBtn" to={"/kuangfront/transferlnStation"}>
                         <div>
                            <i className="icon iconfont icon-zhuanhuan"></i>
                             <FormattedMessage
                                tagName="p"
                                id='rotaRecord'
                                defaultMessage = "内转记录"
                             />
                         </div>
                   </Link>
                    <Link  className="finBtn" to={"/kuangfront/share"}>
                         <div>
                            <i className="icon iconfont icon-QR"></i>
                             <FormattedMessage
                                tagName="p"
                                id='erQR2'
                                defaultMessage = "节点二维码"
                             />
                         </div>
                   </Link>
                     <Link className="finBtn" to={"/kuangfront/nodelist"}>

                         <div>
                            <i className="icon iconfont icon-liebiao"></i>
                             <FormattedMessage
                                tagName="p"
                                id='nodeList'
                                defaultMessage = "节点列表"
                             />
                         </div>
                   </Link>   
                  </div>       
                  <div className="select_content">
                   <Link className="finBtn" to={"/kuangfront/myextension"}>
                         <div>
                            <i className="icon iconfont icon-tongzhituiguang"></i>
                             <FormattedMessage
                                tagName="p"
                                id='myPublice'
                                defaultMessage = "我的推广"
                             />
                         </div>
                   </Link>
                     <Link className="finBtn" to={"/kuangfront/subscription"}>
                         <div>
                            <i className="icon iconfont icon-goumai"></i>
                             <FormattedMessage
                                tagName="p"
                                id='subscription'
                                defaultMessage = "认购"
                             />
                         </div>
                   </Link>
                   <Link className="finBtn" to={"/kuangfront/subrecord"}>
                         <div>
                            <i className="icon iconfont icon-jilu"></i>
                             <FormattedMessage
                                tagName="p"
                                id='subRecord'
                                defaultMessage = "认购记录"
                             />
                         </div>
                   </Link>

                  </div>                        
            </div>
    )
  }
}

Finance.propTypes = {
  intl: intlShape.isRequired
}
export default injectIntl(Finance);