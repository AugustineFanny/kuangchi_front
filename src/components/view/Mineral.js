import React from 'react'
import {
  Carousel,
  Toast,
  Modal
} from 'antd-mobile';
import Head from '../common/Head'
import Account from '../common/Account'
import axios from 'axios'
import {
  Link
} from 'react-router-dom'
import '@/style/Mimeral.css'
import {
  limitAmount
} from '../common/utils'
import {
  injectIntl,
  intlShape,
  FormattedMessage
} from 'react-intl';
class Mineral extends React.Component {
  constructor() {
    super();
    this.state = {}
  }
  componentDidMount() {

  }

  render() {
    return (
      <div className="Mineral">
          <Head />
          <Account />
           <ul className="headul">
                  <li className="set">
                      <div><i className="icon iconfont icon-shezhi1"></i> <FormattedMessage
                                id='coinSet'
                                defaultMessage = "矿池管理"
                             /></div>
                      <div></div>
                  </li>
               <Link to={"/kuangfront/switchto"}>
              <li>
                  <div><i className="icon iconfont icon-jiahao"></i><FormattedMessage
                                id='turnin'
                                defaultMessage = "转入"
                             /></div>
                  <div><i className="icon iconfont icon-jiantou"></i></div>
              </li>
              </Link>
              <Link to={"/kuangfront/poolrecord"}>
              <li>
                  <div><i className="icon iconfont icon-jilu"></i><FormattedMessage
                                id='record'
                                defaultMessage = "记录"
                             /></div>
                  <div><i className="icon iconfont icon-jiantou"></i></div>
              </li>
              </Link>
               <Link to={"/kuangfront/attrecord"}>
              <li>
                  <div><i className="icon iconfont icon-jilu"></i><FormattedMessage
                                id='turnRecord'
                                defaultMessage = "转让记录"
                             /></div>
                  <div><i className="icon iconfont icon-jiantou"></i></div>
              </li>
              </Link>
              <Link to={"/kuangfront/profit"}>
              <li>
                  <div><i className="icon iconfont icon-chashouyi"></i><FormattedMessage
                                id='Profit'
                                defaultMessage = "收益"
                             /></div>
                  <div><i className="icon iconfont icon-jiantou"></i></div>
              </li>
              </Link>
             </ul>
      </div>

    )
  }
}
Mineral.propTypes = {
  intl: intlShape.isRequired
}
export default injectIntl(Mineral);