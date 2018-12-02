import './App.css';
import React, {
  Component
} from 'react';
// import { Drawer, List, NavBar, Icon } from 'antd-mobile';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom'
import {
  PrivateRoute
} from '@/components/common/common'
//引入组件
import Home from "./components/Home.js"
import Mywallet from "./components/Mywallet.js"
import Wdetail from "./components/view/wallet/Wdetail.js"
import My from "./components/My.js"
import Footer from "./components/Footer.js"
// import Register from "./components/Register.js"
import RegisterAfter from "./components/RegisterAfter.js"
// import PhoneRegister from "./components/PhoneRegister.js"
import EmailRegister from "./components/EmailRegister.js"
import Login from "./components/Login.js"
import Install from "./components/view/Install.js"
import Information from "./components/view/my/Information.js"
import Idverification from "./components/view/Idverification.js"
import Material from "./components/view/Material.js"
import Safely from "./components/view/my/Safely.js"
import Changepwd from "./components/view/my/Changepwd.js"
import Emailtest from "./components/view/my/Emailtest.js"
// import Phonetest from "./components/view/Phonetest.js"
import Fundpwd from "./components/view/my/Fundpwd.js"
import Forgetpwd from "./components/Forgetpwd.js"
import Recharge from "./components/view/wallet/Recharge.js"
import Withdrawals from "./components/view/wallet/Withdrawals.js"
import Record from "./components/view/wallet/Record.js"
// import Terms from "./components/Terms.js"
import Share from "./components/view/my/Share.js"
import Finance from "./components/Finance.js"
import Transfer from "./components/view/transfer/Transfer.js"
import Mineral from "./components/view/Mineral.js"
import Switchto from "./components/view/mineral/Switchto.js"
import Poolrecord from "./components/view/mineral/Poolrecord.js"
import Profit from "./components/view/mineral/Profit.js"
import TransferlnStation from "./components/view/transfer/TransferlnStation.js"
import Nodelist from "./components/view/Nodelist.js"
import Turnout from "./components/view/Turnout.js"
import Myextension from "./components/view/Myextension.js"
import Attorn from "./components/view/mineral/Attorn.js"
import Attrecord from "./components/view/mineral/Attrecord.js"
import Subscription from "./components/view/Subscription.js"
import Subrecord from "./components/view/Subrecord.js"
import Setting from "./components/view/my/Setting.js"
import Lang from "./components/view/my/Lang.js"
import Subinfo from "./components/view/Subinfo.js"


//配置路由
class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: true,
    };

  }
  
  onOpenChange = (...args) => {
    console.log(args);
    this.setState({ open: !this.state.open });
  }
  render() {

    // const sidebar = (<List>
    //   {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((i, index) => {
    //     if (index === 0) {
    //       return (<List.Item key={index}
    //         thumb="https://zos.alipayobjects.com/rmsportal/eOZidTabPoEbPeU.png"
    //         multipleLine
    //       >Category</List.Item>);
    //     }
    //     return (<List.Item key={index}
    //       thumb="https://zos.alipayobjects.com/rmsportal/eOZidTabPoEbPeU.png"
    //     >Category{index}</List.Item>);
    //   })}
    // </List>);
    
    return(
      <Router>
        <div className="tao_app">
        {/* {
          !this.state.open && <NavBar icon={<Icon type="ellipsis" />} onLeftClick={this.onOpenChange}>Basic</NavBar>
        } */}
          {/* <Drawer
            className="my-drawer"
            style={{ minHeight: document.documentElement.clientHeight }}
            enableDragHandle
            contentStyle={{ color: '#A6A6A6', textAlign: 'center' }}
            sidebar={sidebar}
            open={this.state.open}
            onOpenChange={this.onOpenChange}
          > */}
            <div className="tao_container">
              <Route exact path="/kuangfront" component={Login}/>
              {/**<PrivateRoute path="/kuangfront/mywallet" component={Mywallet}/>
              <PrivateRoute path="/kuangfront/wdetail" component={Wdetail}/>**/}
              <PrivateRoute path="/kuangfront/my" component={My}/>        
              {/**<Route path="/kuangfront/register" component={Register}/>**/}
              <Route path="/kuangfront/registerafter" component={RegisterAfter}/>
              {/**<Route path="/kuangfront/phoneregister" component={PhoneRegister}/>**/}   
              <Route path="/kuangfront/emailregister" component={EmailRegister}/>   
              <Route path="/kuangfront/login" component={Login}/>   
              <PrivateRoute path="/kuangfront/install" component={Install}/>   
              <PrivateRoute path="/kuangfront/information" component={Information}/>   
              <PrivateRoute path="/kuangfront/idverification" component={Idverification}/>   
              <PrivateRoute path="/kuangfront/material" component={Material}/>   
              <PrivateRoute path="/kuangfront/changepwd" component={Changepwd}/> 
              <PrivateRoute path="/kuangfront/safely" component={Safely}/> 
              {/** <Route path="/kuangfront/terms" component={Terms}/> **/}
              <PrivateRoute path="/kuangfront/emailtest" component={Emailtest}/> 
              {/**<PrivateRoute path="/kuangfront/phonetest" component={Phonetest}/> **/}
              <PrivateRoute path="/kuangfront/fundpwd" component={Fundpwd}/> 
              <Route path="/kuangfront/forgetpwd" component={Forgetpwd}/> 
              {/**<PrivateRoute path="/kuangfront/recharge" component={Recharge}/>
              <PrivateRoute path="/kuangfront/withdrawals" component={Withdrawals}/>
              <PrivateRoute path="/kuangfront/record" component={Record}/> **/}
              <PrivateRoute path="/kuangfront/share" component={Share}/> 
              <PrivateRoute path="/kuangfront/finance" component={Finance}/> 
              <PrivateRoute path="/kuangfront/transfer" component={Transfer}/> 
              <PrivateRoute path="/kuangfront/mineral" component={Mineral}/> 
              <PrivateRoute path="/kuangfront/switchto" component={Switchto}/> 
              <PrivateRoute path="/kuangfront/poolrecord" component={Poolrecord}/> 
              <PrivateRoute path="/kuangfront/profit" component={Profit}/> 
              <PrivateRoute path="/kuangfront/transferlnStation" component={TransferlnStation}/> 
              <PrivateRoute path="/kuangfront/nodelist" component={Nodelist}/> 
              <PrivateRoute path="/kuangfront/turnout" component={Turnout}/> 
              <PrivateRoute path="/kuangfront/myextension" component={Myextension}/> 
              <PrivateRoute path="/kuangfront/attorn" component={Attorn}/> 
              <PrivateRoute path="/kuangfront/attrecord" component={Attrecord}/> 
              <PrivateRoute path="/kuangfront/subscription" component={Subscription}/> 
              <PrivateRoute path="/kuangfront/subrecord" component={Subrecord}/> 
              <PrivateRoute path="/kuangfront/setting" component={Setting}/> 
              <PrivateRoute path="/kuangfront/lang" component={Lang}/> 
              <PrivateRoute path="/kuangfront/subinfo" component={Subinfo}/> 
          </div>
          {/* </Drawer> */}
          <Footer></Footer>
        </div>
      </Router>
    )
  }
  
}
export default App