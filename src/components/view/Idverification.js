import React from 'react'
import Head from '../common/Head'
import '@/style/Idverification.css'
import "@/iconfont/iconfont.css"
import {
  Picker,
  List,
  InputItem,
  DatePicker,
  ImagePicker,
  Button,
  Toast
} from 'antd-mobile';
import {
  createForm
} from 'rc-form';
import arrayTreeFilter from 'array-tree-filter';
import axios from 'axios'
import {
  showDate,
  beforeUpload,
} from '../common/utils'
import {
  injectIntl,
  intlShape,
  FormattedMessage,
} from 'react-intl';
var country = [{
  "value": "China",
  "label": "中国",

}, {
  "value": "English",
  "label": "English",
}]
var IDtype = [{
  "value": "IdCard",
  "label": "身份证",

}]

let minDate = new Date(1980, 0, 12);
let maxDate = new Date(2050, 11, 30);

function showCountry() {
  return "中国";
}

function showCredential() {
  return "身份证";
}
class IdverificationForm extends React.Component {
  constructor() {
    super();
    this.state = {
      filesFront: [],
      filesBack: [],
      filesHold: [],
      multiple: false,
      realName: {}
    }
  }
  componentDidMount() {
    this.getState()
  }

  changeFront = (files, type, index) => {
    if (files[0]) {
      if (beforeUpload(files[0].file) == true) {
        this.setState({
          filesFront: files,
        });
      }
    } else {
      this.setState({
        filesFront: files,
      });
    }
  }
  changeBack = (files, type, index) => {
    if (files[0]) {
      if (beforeUpload(files[0].file) == true) {
        this.setState({
          filesBack: files,
        });
      }
    } else {
      this.setState({
        filesBack: files,
      });
    }
  }
  changeHold = (files, type, index) => {
    if (files[0]) {
      if (beforeUpload(files[0].file) == true) {
        this.setState({
          filesHold: files,
        });
      }
    } else {
      this.setState({
        filesHold: files,
      });
    }

  }
  handleSubmit = () => {

      const cardFront = this.state.filesFront[0];
      const cardBack = this.state.filesBack[0];
      const cardHold = this.state.filesHold[0];
      if (cardFront == undefined) {
        Toast.fail(this.props.intl.formatMessage({
          id: 'ito_iput_id_face_picture'
        }), 2);
      }
      if (cardBack == undefined) {
        Toast.fail(this.props.intl.formatMessage({
          id: 'ito_iput_id_Back_picture'
        }), 2);
      }
      if (cardHold == undefined) {
        Toast.fail(this.props.intl.formatMessage({
          id: 'ito_iput_id_hold_picture'
        }), 2);
      }

      this.props.form.validateFields((err, values) => {
        if (values["start_date"] == undefined) {
          Toast.fail(this.props.intl.formatMessage({
            id: 'paperTime4'
          }), 2);
        }
        if (values["end_date"] == undefined) {
          Toast.fail(this.props.intl.formatMessage({
            id: 'paperTime5'
          }), 2);
        }
        if (!err) {
          if (cardFront && cardBack && cardHold && values["country"] && values["credential_type"]) {
            var formData = new FormData();
            formData.append("country", values["country"][0]);
            formData.append("credential_type", values["credential_type"][0]);
            formData.append("name", values["name"]);
            formData.append("card", values["card"]);
            formData.append("start_date", values["start_date"]);
            formData.append("end_date", values["end_date"]);
            formData.append("card_front", cardFront.file);
            formData.append("card_back", cardBack.file);
            formData.append("card_hold", cardHold.file);
            axios.post("/kc/self/name-auth", formData, {
                headers: {
                  "authorization": sessionStorage.getItem("authorization")
                }
              })
              .then(res => {
                if (res.data.code == '100103') {
                  window.location.href = "/kuangfront/login";
                } else if (res.data.code == '100200') {
                  // window.location.reload();
                  this.getState();
                } else {
                  Toast.fail(res.data.msg, 2);
                }
              })
              .catch(err => {
                console.log(err)
              })
          } else if (values["country"] == undefined) {
            Toast.fail(this.props.intl.formatMessage({
              id: 'countrys'
            }), 2);
          } else if (values["credential_type"] == undefined) {
            Toast.fail(this.props.intl.formatMessage({
              id: 'paperss'
            }), 2);
          }
        }

      });
    }
    //获取当前状态
  getState = () => {
    axios.get("/kc/self/name-auth", {
        headers: {
          "authorization": sessionStorage.getItem("authorization")
        }
      })
      .then(res => {
        if (res.data.code == '100103') {
          window.location.href = "/kuangfront/login";
        } else if (res.data.code == '100200') {
          this.setState({
            realName: res.data.data
          });
        } else {
          Toast.fail(res.data.msg, 2);
        }
      })
      .catch(err => {
        console.log(err)
      })
  }
  render() {
    const {
      getFieldProps,
      getFieldError,
    } = this.props.form;

    const {
      filesFront,
      filesBack,
      filesHold
    } = this.state;

    let content;
    if (this.state.realName.role == 0 || this.state.realName.role == 2) {
      content = (
        <div>
                  <List style={{ backgroundColor: 'white' }} className="picker-list">
                    <Picker data={country} extra={this.props.intl.formatMessage({
                              id: 'select'
                            })} cols={1}  {...getFieldProps('country')} className="forss"  onOk={v => console.log(v)} >
                      <List.Item arrow="horizontal"><FormattedMessage
                            id='country'
                             defaultMessage = "国籍"
                        /></List.Item>
                    </Picker>
                    <Picker data={IDtype} extra={this.props.intl.formatMessage({
                              id: 'select'
                            })} cols={1} {...getFieldProps('credential_type')} className="forss"  onOk={v => console.log(v)}>
                      <List.Item arrow="horizontal"><FormattedMessage
                            id='papers'
                             defaultMessage = "证件类型"
                        /></List.Item>
                    </Picker>
                    <InputItem
                          {...getFieldProps('name', {
                            // initialValue: 'little ant',
                            rules: [
                              { required: true, message: '请填写你的姓名' },
                            ],
                          })}
                          clear
                          error={!!getFieldError('name')}
                          onErrorClick={() => {
                            Toast.fail(this.props.intl.formatMessage({
                              id: 'paperName2'
                            }), 2);
                          }}
                          placeholder={this.props.intl.formatMessage({
                              id: 'paperName2'
                            })}
                        ><FormattedMessage
                            id='paperName'
                             defaultMessage = "证件姓名"
                        /></InputItem>
                       <InputItem
                          {...getFieldProps('card', {
                            // initialValue: 'little ant',
                            rules: [
                              { required: true, message: '请填写证件号码' },
                            ],
                          })}
                          clear
                          error={!!getFieldError('card')}
                          onErrorClick={() => {
                            Toast.fail(this.props.intl.formatMessage({
                              id: 'paperNum2'
                            }), 2);
                          }}
                          placeholder={this.props.intl.formatMessage({
                              id: 'paperNum2'
                            })}
                        ><FormattedMessage
                            id='paperNum'
                             defaultMessage = "证件号码"
                        /></InputItem>

                           <DatePicker
                              {...getFieldProps('start_date', {
                                rules: [
                                  { required: true, message: '请选择起始日期' },
                                ],
                              })}
                               mode="date"
                               minDate={minDate}
                               extra={this.props.intl.formatMessage({
                              id: 'select'
                            })}
                            >
                            <List.Item arrow="horizontal"><FormattedMessage
                            id='paperTime2'
                             defaultMessage = "起始日期"
                        /></List.Item>
                             </DatePicker>
                              <DatePicker
                              {...getFieldProps('end_date', {
                                rules: [
                                  { required: true, message: '请选择终止日期' },
                                ],
                              })}
                               mode="date"
                               maxDate={maxDate}
                               extra={this.props.intl.formatMessage({
                              id: 'select'
                            })}
                            >
                            <List.Item arrow="horizontal"><FormattedMessage
                            id='paperTime3'
                             defaultMessage = "终止日期"
                        /></List.Item>
                             </DatePicker>
                             <section>
                             <FormattedMessage
                             tagName="div"
                            id='paperImg'
                             defaultMessage = "证件正面照"
                        />
                             <ImagePicker
                                  files={filesFront}
                                  onChange={this.changeFront}
                                  onImageClick={(index, fs) => console.log(index, fs)}
                                  selectable={filesFront.length < 1}
                                  multiple={this.state.multiple}
                                />
                             </section>
                             <section>
                             <FormattedMessage
                             tagName="div"
                            id='paperImg2'
                             defaultMessage = "证件背面照"
                        />
                              <ImagePicker
                                  files={filesBack}
                                  onChange={this.changeBack}
                                  onImageClick={(index, fs) => console.log(index, fs)}
                                  selectable={filesBack.length < 1}
                                  multiple={this.state.multiple}
                                />
                             </section>
                             <section>
                             <FormattedMessage
                             tagName="div"
                            id='paperImg3'
                             defaultMessage = "手持证件照"
                        />
                              <ImagePicker
                                  files={filesHold}
                                  onChange={this.changeHold}
                                  onImageClick={(index, fs) => console.log(index, fs)}
                                  selectable={filesHold.length < 1}
                                  multiple={this.state.multiple}
                                />
                             </section>
                  </List>
                  <div className="tao_infoBtn">
                    <Button  type="primary" inline onClick={this.handleSubmit} > <FormattedMessage
                            id='Improve_validation'
                             defaultMessage = "提交验证"
                        /></Button>

                  </div>
                </div>
      )
    } else if (this.state.realName.role == 1) {
      content = (
        <div className="info_result">
               <span className="wait_result"><FormattedMessage
                            id='iduploading'
                            defaultMessage="您的身份验证提交成功，请您耐心等待审核结果。"
                        /></span>
            </div>
      )
    } else if (this.state.realName.role == 3) {
      content = (
        <div className="info_result">
                <div><FormattedMessage
                            tagName="p"
                            id='country'
                             defaultMessage = "国籍"
                        /><p><span>{ showCountry(this.state.realName.country) }</span></p></div>
                <div><FormattedMessage
                            tagName="p"
                            id='papers'
                             defaultMessage = "证件类型"
                        /><p>{ showCredential(this.state.realName.credential_type) }</p></div>
                <div><FormattedMessage
                            tagName="p"
                            id='paperName'
                             defaultMessage = "证件姓名"
                        /><p>{ this.state.realName.name }</p></div>
                <div><FormattedMessage
                            tagName="p"
                            id='paperNum'
                             defaultMessage = "证件号码"
                        /><p>{ this.state.realName.card }</p></div>
                <div><FormattedMessage
                            tagName="p"
                            id='paperTime'
                             defaultMessage = "有效期限"
                        /><p>
                <span>{ showDate(this.state.realName.start_date) }</span>---
                <span>{ showDate(this.state.realName.end_date) }</span></p></div>
            </div>
      )
    }
    return (
      <div className="tao_information">
            <Head />
                {content}
            </div>
    )
  }
}
const Idverification = createForm()(IdverificationForm);
Idverification.propTypes = {
  intl: intlShape.isRequired
}
export default injectIntl(Idverification);