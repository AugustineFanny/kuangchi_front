import React from 'react'
import "@/iconfont/iconfont.css"
import '@/style/Setting.css'
import Head from '@/components/common/Head'
import {
    Link
} from 'react-router-dom'
import {
    showAvatar,
} from '@/components/common/utils'
import {
    Toast,
    List
} from 'antd-mobile';
import {
    injectIntl,
    intlShape,
    FormattedMessage,
} from 'react-intl';
import PubSub from 'pubsub-js';
const Item = List.Item;
class Lang extends React.Component {
    constructor() {
        super();
        var en;
        var zh;
        var val;
        if (sessionStorage.getItem("lang")) {
            val = sessionStorage.getItem("lang")
        } else {
            val = "zh-CN"
        }
        if (val == "zh-CN") {
            en = null;
            zh = <i className="icon iconfont icon-duihao"></i>;
        } else if (val == "en-US") {
            en = <i className="icon iconfont icon-duihao"></i>;
            zh = null;
        }
        this.state = {
            en: en,
            zh: zh
        }
    }
    componentDidMount() {

        this.getLang();

    }
    componentWillReceiveProps(nexrProps) {
        this.getLang();
    }
    getLang = () => {
        let val = sessionStorage.getItem("lang");
        console.log(val)

        switch (val) {
            case "zh-CN":
                this.setState({
                    en: null,
                    zh: <i className="icon iconfont icon-duihao"></i>
                })
                break;
            case "en-US":
                this.setState({
                    en: <i className="icon iconfont icon-duihao"></i>,
                    zh: null
                })
                break;
            case "ko":
                break;
            case "ja":
                break;
        }
    }
    onClick = (val) => {
        PubSub.publish('language', val);
        sessionStorage.setItem("lang", val);　
        switch (val) {
            case "zh-CN":
                sessionStorage.setItem("language", "CN");
                Toast.success("成功", 1.5);
                break;
            case "en-US":
                sessionStorage.setItem("language", "EN");
                Toast.success("successful", 1.5);
                break;
            case "ko":
                sessionStorage.setItem("language", "KO");
                break;
            case "ja":
                sessionStorage.setItem("language", "JA");
                break;
        }
    }
    render() {
        return (
            <div className="choselang">
               <Head />
                 <List  className="my-list">
                    <Item  extra={this.state.zh} onClick={this.onClick.bind(this,"zh-CN") }>简体中文</Item>
                    <Item  extra={this.state.en} onClick={this.onClick.bind(this,"en-US") }>English</Item>
                 </List> 
            </div>
        )
    }
}

Lang.propTypes = {
    intl: intlShape.isRequired
}
export default injectIntl(Lang);