import React from 'react'
import {
  Toast,
} from 'antd-mobile';
import axios from 'axios'
import {
  Link
} from 'react-router-dom'
import '@/style/lucre.css'
import {
  limitAmount
} from '@/components/common/utils'
import {
  injectIntl,
  intlShape,
  FormattedMessage,
} from 'react-intl';
class lucre extends React.Component {
  constructor() {
    super();
    this.state = {
      data: {}
    }
  }
  componentDidMount() {
    axios.get("/kc/wallet/IUU/mining-stat", {
        headers: {
          "authorization": sessionStorage.getItem("authorization")
        }
      })
      .then(res => {
        if (res.data.code == '100103') {
          window.location.href = "/kuangfront/login";
        } else if (res.data.code == '100200') {

          this.setState({
            data: res.data.data
          })

        } else {
          Toast.fail(res.data.msg, 1);
        }
      })
  }
  showAmount = (amount) => {
    if (amount == null) {
      return 0;
    } else {
      return limitAmount(parseFloat(amount));
    }
  }
  render() {
    var data = this.state.data;
    return (
      <div className="lucre">
              <div className="lucre_info">    
                    <div className="lucre_tit"><i className="icon iconfont icon-leijishouyi"></i> <FormattedMessage
                        id='earnings'
                        defaultMessage = "昨日收益"
                       /></div>
                    <div >{this.showAmount(data.yesterday)} IUU</div>
                </div>
                <div className="lucre_info">
                  <div className="lucre_tit"> <i className="icon iconfont icon-leijishouyi"></i> <FormattedMessage
                        id='monthearnings'
                        defaultMessage = "本月收益"
                       /></div>
                    <div >{this.showAmount(data.month)} IUU</div>
              </div>
      </div>

    )
  }
}
lucre.propTypes = {
  intl: intlShape.isRequired
}
export default injectIntl(lucre);