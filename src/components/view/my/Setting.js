import React from 'react'
import "@/iconfont/iconfont.css"
import '@/style/Setting.css'
import {
    Link
} from 'react-router-dom'
import Head from '@/components/common/Head'
import {
    Toast
} from 'antd-mobile';
import {
    injectIntl,
    intlShape,
    FormattedMessage,
} from 'react-intl';
class My extends React.Component {
    constructor() {
        super();
        this.state = {}
    }

    componentDidMount() {

    }

    render() {
        return (
            <div className="tao_my setting">
                <Head />
                  <div className="tao_myBody">
                    <ul>
                         <Link to={"/kuangfront/lang"}>
                        <li>
                            <div><i className="icon iconfont icon-duoyuyan"></i><span><FormattedMessage
                            id='choseLang'
                             defaultMessage = "选择语言"
                        /></span></div>
                            <div><i className="icon iconfont icon-jiantou"></i></div>
                        </li>
                         </Link>  
                       
                    </ul>
                  </div>  

            </div>
        )
    }
}

My.propTypes = {
    intl: intlShape.isRequired
}
export default injectIntl(My);