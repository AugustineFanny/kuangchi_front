import React from 'react'
import {
  Link
} from 'react-router-dom'
import '../style/Register.css'
import {
  injectIntl,
  intlShape,
  FormattedMessage,
} from 'react-intl';
class Register extends React.Component {
  componentDidMount() {
    //获取邀请码
    var qs = (function(a) {
      if (a == "") return {};
      var b = {};
      for (var i = 0; i < a.length; ++i) {
        var p = a[i].split('=');
        if (p.length != 2) continue;
        b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
      }
      return b;
    })(window.location.search.substr(1).split('&'));

    if (qs["i"]) {
      sessionStorage.setItem("inviteCode", qs["i"])
    }
  }
  render() {
    return (
      <div className="register">
	            <section><p><Link to="/kuangfront/login"><FormattedMessage
                            id='login'
                             defaultMessage = "登录"
                        /></Link></p></section>
	            <section><div style={{width:"212px",height:"74px"}}></div></section>
	            <div className="linkBtn">
				<Link to="/kuangfront/phoneregister"><div className="phoneBtn">
                	<i className="icon iconfont icon-shouji"></i>
                    <FormattedMessage
                            id='phonereg'
                             defaultMessage = "使用手机注册"
                        />
    			</div></Link>
				<Link to="/kuangfront/emailregister"><div className="emailBtn"> 
         			<i className="icon iconfont icon-youxiang"></i>
                    <FormattedMessage
                            id='emailreg'
                             defaultMessage = "使用邮箱注册"
                        />
         		</div></Link>
         		</div>
            </div>
    )
  }
}
Register.propTypes = {
  intl: intlShape.isRequired
}
export default injectIntl(Register);