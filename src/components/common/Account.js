import React from 'react'
import {
  Carousel,
} from 'antd-mobile';
import axios from 'axios'
import '../../style/style.css'
import {
  limitAmount
} from './utils'
import {
  injectIntl,
  intlShape,
  FormattedMessage
} from 'react-intl';

class Account extends React.Component {
  constructor() {
    super();
    this.state = {
      data: {}
    }
  }
  componentDidMount() {
    axios.get('/kc/wallet/finance', {
        params: {
          currency: "FET"
        },
        headers: {
          "Content-Type": "application/json",
          "authorization": sessionStorage.getItem("authorization")
        }
      })
      .then(res => {
        var res = res.data.data;
        res[0].current = limitAmount(res[0].amount - res[0].lock_amount);
        res[0].mining_amount = limitAmount(res[0].mining_amount);
        this.setState({
          data: res[0]
        })
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  render() {
    return (
      <div className="headdiv">
          <div>
              <div className="current_tit"> <FormattedMessage
                                id='Activeaccount'
                                defaultMessage = "活动账户"
                             /></div>
              <div className="current_amount">{this.state.data.current} FET</div>
          </div>      
          <div>
              <div className="current_tit"> <FormattedMessage
                                id='Numbercoins'
                                defaultMessage = "矿池币数"
                             /></div>
              <div className="current_amount">{this.state.data.mining_amount} FET</div>
          </div>      
      </div>
    )
  }
}
Account.propTypes = {
  intl: intlShape.isRequired
}
export default injectIntl(Account);