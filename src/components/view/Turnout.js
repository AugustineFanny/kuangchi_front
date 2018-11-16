import React from 'react'
import Head from '../common/Head'
import "@/iconfont/iconfont.css"
import axios from 'axios'
import {
    Link
} from 'react-router-dom'
import '@/style/Turnout.css'
import {
    injectIntl,
    intlShape,
    FormattedMessage,
} from 'react-intl';
let authorization = sessionStorage.getItem("authorization");
class Safely extends React.Component {
    constructor() {
        super();
        this.state = {


        }
    }
    componentDidMount() {

    }
    render() {
        return (
            <div className="turnout">
                <Head />
                <div className="turnoutInfo">
                    <p><span>可转出</span> <span>0</span></p>
                </div>
                
            </div>
        )
    }
}

Safely.propTypes = {
    intl: intlShape.isRequired
}
export default injectIntl(Safely);