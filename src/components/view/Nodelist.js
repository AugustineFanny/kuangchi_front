import React from 'react'
import Head from '../common/Head'
import axios from 'axios'
import {
  Link,
  Redirect
} from 'react-router-dom'
import {
  limitAmount
} from '../common/utils'
import {
  Toast,
} from 'antd-mobile';
import {
  injectIntl,
  intlShape,
  FormattedMessage,
} from 'react-intl';
import '@/style/Nodelist.css'

class Nodelist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: []
    }
  }
  componentWillMount() {

  }
  componentDidMount() {
    this.getList()
  }
  getList = () => {
    axios.get("/kc/public/FET/nodes", {
        headers: {
          "authorization": sessionStorage.getItem("authorization")
        }
      })
      .then(res => {
        console.log(res)
        if (res.data.code == '100103') {
          window.location.href = "/kuangfront/login";
        } else if (res.data.code == '100200') {
          var res = res.data.data;
          var arr = [];
          for (var i in res) {
            arr[i] = res[i];
            arr[i].power = Math.round(arr[i].mining_amount)
          }
          this.setState({
            list: arr
          })
        } else {
          Toast.fail(res.data.msg, 1);
        }
      })
  }

  render() {
    var list = this.state.list;
    var content;

    return (

      <div className="nodelist">
                  <Head />
                  <div className="nodelist_info">
                    {/**<div className="nodeHead">
                      <p><span>名次</span><span>用户名</span><span>算力</span></p>
                    </div>**/}
                    {
                      this.state.list.map((item,index)=>{
                        switch(index){
                          case 0:
                           content=(
                            <span><i className="icon iconfont icon-jinpai" style={{color:"#ecb500"}}></i></span>
                            )
                           break;
                           case 1:
                            content=(
                            <span><i className="icon iconfont icon-yinpai" style={{color:"#b2aeaf"}}></i></span>
                            )
                           break;
                           case 2:
                            content=(
                            <span><i className="icon iconfont icon-tongpai" style={{color:"#ba6f43"}}></i></span>
                            )
                           break;
                           default:
                            content=(
                           <span><span className="ranking">{index+1}</span></span>
                            )
                           break;
                        }
                        return(
                            <div key={index+"n"} className="nodeBox">
                              <p>{content}<span>{item.username}</span><span>{item.power}</span></p>
                            </div>
                          )
                      })
                    }
                     
                  </div>
               </div>
    )
  }
}

Nodelist.propTypes = {
  intl: intlShape.isRequired
}
export default injectIntl(Nodelist);