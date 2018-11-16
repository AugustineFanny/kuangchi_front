import React from 'react'
import Head from '../common/Head'
import '@/style/Install.css'
import {
  Link
} from 'react-router-dom'
import {
  injectIntl,
  intlShape,
  FormattedMessage,
} from 'react-intl';
class Install extends React.Component {

  render() {
    return (
      <div className="tao_install">
            <Head />
                 <ul>
                         <Link to={"/kuangfront/information"}>
                        <li>
                            <FormattedMessage
                            tagName="div"
                            id='information'
                             defaultMessage = "基本信息"
                        />
                            <div><i className="icon iconfont icon-jiantou"></i></div>
                        </li>
                         </Link>  
                         <Link to={"/kuangfront/idverification"}>
                        <li>    
                        <FormattedMessage
                            tagName="div"
                            id='id'
                             defaultMessage = "身份验证"
                        />
                            <div><i className="icon iconfont icon-jiantou"></i></div>
                        </li>
                        </Link>  
                         <Link to={"/kuangfront/material"}>
                        <li>
                        <FormattedMessage
                            tagName="div"
                            id='kyc'
                             defaultMessage = "KYC材料"
                        />
                            <div><i className="icon iconfont icon-jiantou"></i></div>
                        </li>
                          </Link>  
                        
                    </ul>
                  </div>
    )
  }
}

Install.propTypes = {
  intl: intlShape.isRequired
}
export default injectIntl(Install);