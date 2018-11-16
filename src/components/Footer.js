import React from 'react';
import '../style/Footer.css'
import "../iconfont/iconfont.css"
import axios from 'axios'
import {
    List,
    Badge
} from 'antd-mobile';
import {
    BrowserRouter as Router,
    Route,
    Link,
} from 'react-router-dom'
import PubSub from 'pubsub-js';
import {
    injectIntl,
    intlShape,
    FormattedMessage
} from 'react-intl';
import Foot from '@/components/common/Foot'
class Footer extends React.Component {
    constructor() {
        super();
        this.state = {
            code: 1,
            msgNum: 0,
            ws: null,
            sendToken: "", //chat相关token
            timer: null,
        }
    }
    componentWillUnmount() {
        if (this.state.sendToken !== "")
            PubSub.unsubscribe(this.state.sendToken);
        if (this.state.ws) {
            this.state.ws.close();
        }
        if (this.state.timer) {
            clearInterval(this.state.timer);
        }
    }

    componentWillUpdate() {

    }
    componentDidMount() {
        this.getMsgNum();
        var msgToken = PubSub.subscribe("MSG", (msg, data) => {
            this.getMsgNum();
        })
    }
    createWs = () => {
        let value = sessionStorage.getItem("authorization");
        if (value) {
            this.initWebSocket(value);
        }
    }
    initWebSocket = (value) => {
        let socket = new WebSocket("wss://www.taocoins.com/gc-ex/ws?t=" + value);
        socket.onmessage = (e) => {
            let data = JSON.parse(e.data);
            switch (data[0]) {
                case "TRADE":
                    //发布交易更新消息，以交易code为key
                    PubSub.publish(data[1], "");
                    break;
                case "CHAT":
                    PubSub.publish(data[1], data[2]);
                    break;
                case "NEWMESSAGE":
                    PubSub.publish("MSG", "");
                    break;
            }
        }
        var sendToken = PubSub.subscribe("SEND", (msg, data) => {
            if (this.state.ws && this.state.ws.readyState == 1)
                this.state.ws.send(["CHAT", data]);
        });

        this.setState({
            ws: socket,
            sendToken: sendToken
        });
    }
    heartbeat = () => {
        var timer = setInterval(() => {
            if (this.state.ws)
                this.state.ws.send("ping");
            else
                this.createWs();
        }, 30000);
        this.setState({
            timer: timer
        })
    }
    getUrl = () => {
        var url = window.location.href;
        if (url.indexOf("advertise") > 0) {
            this.setState({
                code: 2
            })
        }
    }
    getMsgNum = () => {
        axios.get("/kc/self/msg-num", {
                headers: {
                    "authorization": sessionStorage.getItem("authorization")
                }
            })
            .then(res => {
                this.setState({
                    msgNum: res.data.data
                });
            })
    }
    render() {
        let url = window.location.href;
        let content;
        if (url.indexOf("login") > 0 || url.indexOf("register") > 0 || url.indexOf("terms") > 0 || url.indexOf("forgetpwd") > 0 || url.indexOf("subinfo") > 0 || url.indexOf("revise") > 0 || url.indexOf("chat") > 0 || url.indexOf("trade") > 0 || url.indexOf("evaluate") > 0 || url.indexOf("wdetail") > 0 || url.indexOf("deposit") > 0) {
            content = null
        } else {
            content = (
                <Foot />
            )
        }
        return (
            <div className="tao_footers">
                {content}
            </div>
        )
    }
}

Footer.propTypes = {
    intl: intlShape.isRequired
}
export default injectIntl(Footer);