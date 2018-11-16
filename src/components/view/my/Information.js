import React from 'react'
import Head from '@/components/common/Head'
import '@/style/Information.css'
import "@/iconfont/iconfont.css"

import axios from 'axios'
import {
    showDatetime,
    showAvatar,
    beforeUpload
} from '@/components/common/utils'
import {
    injectIntl,
    intlShape,
    FormattedMessage,
} from 'react-intl';

function ifExist(obj) {
    if (obj) {
        return obj;
    } else {
        return "-";
    }
}

function showNum(obj) {
    if (obj) {
        return obj;
    } else {
        return 0;
    }
}

function ifAdopt(obj) {
    if (obj) {
        return obj;
    } else {
        return <span><FormattedMessage
                            id='unverified'
                             defaultMessage = "未验证"
                        /><i className="icon iconfont icon-jiantou"></i></span>;
    }
}
class Information extends React.Component {
    constructor() {
        super();
        this.state = {
            relInfo: {}
        }
    }
    componentDidMount() {
        this.getInfo()
    }
    getInfo = () => {

        axios.get('/kc/self/info', {
                headers: {
                    "Content-Type": "application/json",
                    "authorization": sessionStorage.getItem("authorization")
                }
            })
            .then((res) => {
                var data = res.data.data;
                this.setState({
                    relInfo: data
                })
            })
            .catch(function(error) {
                console.log(error);
            });
    }

    render() {
        return (
            <div className="tao_information">
            <Head />
                 <ul>
                        <li>
                             <FormattedMessage
                            tagName="div"
                            id='registertime'
                             defaultMessage = "注册时间"
                        />
                            <div>{showDatetime(ifExist(this.state.relInfo.create_time))}</div>
                        </li>
                         <li>
                           <FormattedMessage
                            tagName="div"
                            id='email'
                             defaultMessage = "电子邮件"
                        />
                            <div>{ifAdopt(this.state.relInfo.email)}</div>
                        </li>
                        
                        
                    </ul>
                  </div>
        )
    }
}

Information.propTypes = {
    intl: intlShape.isRequired
}
export default injectIntl(Information);