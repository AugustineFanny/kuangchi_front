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
  ActivityIndicator,
} from 'antd-mobile';
import Tree, {
  TreeNode
} from 'rc-tree';
import cssAnimation from 'css-animation';
import 'rc-tree/assets/index.css';
import {
  injectIntl,
  intlShape,
  FormattedMessage,
} from 'react-intl';
import '@/style/Myextendsion.css'

function animate(node, show, done) {
  let height = node.offsetHeight;
  return cssAnimation(node, 'collapse', {
    start() {
      if (!show) {
        node.style.height = `${node.offsetHeight}px`;
      } else {
        height = node.offsetHeight;
        node.style.height = 0;
      }
    },
    active() {
      node.style.height = `${show ? height : 0}px`;
    },
    end() {
      node.style.height = '';
      done();
    },
  });
}

function generateTreeNodes(treeNode, children) {
  const arr = [];
  const key = treeNode.props.eventKey;
  for (let i = 0; i < children.length; i++) {
    arr.push({
      name: children[i].name,
      key: `${key}-${i}`,
      isLeaf: children[i].isLeaf
    })
  }
  return arr;
}

function getNewTreeData(treeData, curKey, child) {
  const loop = (data) => {
    data.forEach((item) => {
      if (curKey.indexOf(item.key) === 0) {
        if (item.children) {
          loop(item.children);
        } else {
          item.children = child;
        }
      }
    });
  };
  loop(treeData);
}

class Myextendsion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      animating: true,
      treeData: [],
    }
  }
  componentWillMount() {

  }
  componentDidMount() {
    this.getInfo();
    this.getList();
  }
  getList = () => {
    axios.get("/kc/self/invite-num", {
        headers: {
          "authorization": sessionStorage.getItem("authorization")
        }
      })
      .then(res => {
        if (res.data.code == '100103') {
          window.location.href = "/kuangfront/login";
        } else if (res.data.code == '100200') {
          var res = res.data.data;
          var list = [];
          for (var i in res) {
            list.push(res[i])
          }
          this.setState({
            list: list
          })
        } else {
          Toast.fail(res.data.msg, 1);
        }
        if (res) {
          this.setState({
            animating: false
          })
        }
      })
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
          treeData: [{
            name: data.username,
            key: '0-0'
          }],
        });

      })
      .catch(function(error) {
        console.log(error);
      });
  }

  onLoadData = (treeNode) => {
    return new Promise((resolve) => {
      axios.get("/kc/self/invites?username=" + treeNode.props.title, {
          headers: {
            "authorization": sessionStorage.getItem("authorization")
          }
        })
        .then(res => {
          if (res.data.code == '100103') {
            window.location.href = "/kuangfront/login";
          } else if (res.data.code == '100200') {
            const treeData = [...this.state.treeData];
            getNewTreeData(treeData, treeNode.props.eventKey, generateTreeNodes(treeNode, res.data.data));
            this.setState({
              treeData
            });
            resolve();
          } else {
            Toast.fail(res.data.msg, 1);
          }
          if (res) {
            this.setState({
              animating: false
            })
          }
        })
    });
  }

  render() {
    const animation = {
      enter(node, done) {
        return animate(node, true, done);
      },
      leave(node, done) {
        return animate(node, false, done);
      },
      appear(node, done) {
        return animate(node, true, done);
      },
    };
    const loop = (data) => {
      return data.map((item) => {
        if (item.children) {
          return <TreeNode title={item.name} key={item.key}>{loop(item.children)}</TreeNode>;
        }
        return (
          <TreeNode title={item.name} key={item.key} isLeaf={item.isLeaf}
          />
        );
      });
    };
    const treeNodes = loop(this.state.treeData);
    return (
      <div className="Myextend">
          <Head />
          { this.state.animating?
            <ActivityIndicator
                toast
                text="Loading..."
                animating={this.state.animating}
              />: 
                     <div>
                 {
                    this.state.list?
                    <div  className="extendsTable">
                    <div className="extendsTable_info">
                       {
                      this.state.list.map((item,index)=>{
                        return(
                              <div key={index+"q"} className="table_info">
                                    <section>
                                        <p className="table_tit">M{index + 1}</p>
                                        <p className="table_content">{item}</p>
                                    </section>
                                </div>
                           )
                      })
                    }
                    </div>
                    </div>:<div className="nodata">
                    <FormattedMessage
                          tagName="p"
                          id='nodata'
                          defaultMessage = "暂无"
                      />
                    </div>
                }
              </div>
            }
            <div className="tree_info">
            <Tree
              showIcon={false}
              onSelect={this.onSelect}
              loadData={this.onLoadData}
              showLine={true}
            >
              {treeNodes}
            </Tree>
            </div>
      </div>
    )
  }
}

Myextendsion.propTypes = {
  intl: intlShape.isRequired
}
export default injectIntl(Myextendsion);