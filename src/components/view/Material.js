import React from 'react'
import Head from '../common/Head'
import '@/style/Material.css'
import axios from 'axios'
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
import {
  beforeUpload,
} from '../common/utils'
import {
  injectIntl,
  intlShape,
  FormattedMessage,
} from 'react-intl';
class MaterialForm extends React.Component {
  constructor() {
    super();
    this.state = {
      filesFront: [],
      filesBack: [],
      filesHold: [],
      filesBank: [],
      multiple: false,
      kyc: {}
    }
  }
  componentDidMount() {
    this.getKyc()
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
  changeBank = (files, type, index) => {
    if (files[0]) {
      if (beforeUpload(files[0].file) == true) {
        this.setState({
          filesBank: files,
        });
      }
    } else {
      this.setState({
        filesBank: files,
      });
    }
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const photo_id_front = this.state.filesFront[0];
    const photo_id_back = this.state.filesBack[0];
    const photo_id_hold = this.state.filesHold[0];
    const bank_account_photo = this.state.filesBank[0];

    if (photo_id_front == undefined) {
      Toast.fail(this.props.intl.formatMessage({
        id: 'idCardImg'
      }), 2);
    }
    if (photo_id_back == undefined) {
      Toast.fail(this.props.intl.formatMessage({
        id: 'idCardImg2'
      }), 2);
    }
    if (photo_id_hold == undefined) {
      Toast.fail(this.props.intl.formatMessage({
        id: 'idCardImg3'
      }), 2);
    }
    if (bank_account_photo == undefined) {
      Toast.fail(this.props.intl.formatMessage({
        id: 'idCardImg4'
      }), 2);
    }
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if (photo_id_front && photo_id_back && photo_id_hold && bank_account_photo) {
          var formData = new FormData();
          formData.append("name", values["name"]);
          formData.append("username", values["username"]);
          formData.append("email", values["email"]);
          formData.append("mobile", values["mobile"]);
          formData.append("birthday", values["birthday"]);
          formData.append("country", values["country"]);
          formData.append("province", values["province"]);
          formData.append("city", values["city"]);
          formData.append("street", values["street"]);
          formData.append("post_code", values["post_code"]);
          formData.append("identity_document", values["identity_document"]);
          formData.append("funds_source", values["funds_source"]);
          formData.append("photo_id_front", photo_id_front.file);
          formData.append("photo_id_back", photo_id_back.file);
          formData.append("photo_id_hold", photo_id_hold.file);
          formData.append("bank_account_photo", bank_account_photo.file);
          var authorization = sessionStorage.getItem("authorization")
          axios.post("/kc/self/kyc", formData, {
              headers: {
                "Content-Type": "application/json",
                "authorization": authorization
              }
            })
            .then(res => {
              if (res.data.code == '100103') {
                window.location.href = "/kuangfront/login";
              } else if (res.data.code == '100200') {
                window.location.reload();

              } else {
                Toast.fail(res.data.msg, 2);
              }
            })
            .catch(err => {
              console.log(err)
            })
            // console.log('Received values of form: ', values);
        }
      }
    });
  }
  getKyc = () => {
    axios.get('/kc/self/kyc', {
        headers: {
          "authorization": sessionStorage.getItem("authorization")
        }
      })
      .then((res) => {
        this.setState({
          kyc: res.data.data
        })
      })
      .catch(function(error) {
        console.log(error);
      });

  }
  render() {
    const {
      getFieldProps,
      getFieldError,
    } = this.props.form;
    const {
      filesFront,
      filesBack,
      filesHold,
      filesBank
    } = this.state;
    let content;
    if (this.state.kyc.kyc == 0 || this.state.kyc.kyc == 2) {
      content = (
        <div>
                <div className="tao_maTitle">
                     <FormattedMessage
                              tagName="p"
                              id='kycTit'
                          />
                </div>
                <List style={{ backgroundColor: 'white' }} className="picker-list">
                    
                    <InputItem
                          {...getFieldProps('name', {
                            rules: [
                              { required: true, message: '请填写你的姓名' },
                            ],
                          })}
                          clear
                          error={!!getFieldError('name')}
                          onErrorClick={() => {
                            Toast.fail(this.props.intl.formatMessage({
                              id: 'kycErr'
                            }), 2);
                          }}
                          placeholder={this.props.intl.formatMessage({
                              id: 'kycErr'
                            })}
                        > <FormattedMessage
                              id='payName'
                              defaultMessage = "姓名"
                          /></InputItem>
                       <InputItem
                          {...getFieldProps('username', {
                            rules: [
                              { required: true, message: '请填写用户名' },
                            ],
                          })}
                          clear
                          error={!!getFieldError('username')}
                          onErrorClick={() => {
                            Toast.fail(this.props.intl.formatMessage({
                              id: 'kycErr2'
                            }), 2);
                          }}
                          placeholder={this.props.intl.formatMessage({
                              id: 'kycErr2'
                            })}
                        > <FormattedMessage
                              id='username'
                              defaultMessage = "用户名"
                          /></InputItem>
                         <InputItem
                          {...getFieldProps('email', {
                            rules: [
                              { required: true, message: '请填写你的邮箱' },
                            ],
                          })}
                          clear
                          error={!!getFieldError('email')}
                          onErrorClick={() => {
                            Toast.fail(this.props.intl.formatMessage({
                              id: 'kycErr3'
                            }), 2);
                          }}
                          placeholder={this.props.intl.formatMessage({
                              id: 'kycErr3'
                            })}
                        > <FormattedMessage
                              id='emailReg'
                              defaultMessage = "邮箱"
                          /></InputItem>
                         <InputItem
                          {...getFieldProps('mobile', {
                            rules: [
                              { required: true, message: '请填写你的联系电话' },
                            ],
                          })}
                          clear
                          error={!!getFieldError('mobile')}
                          onErrorClick={() => {
                            Toast.fail(this.props.intl.formatMessage({
                              id: 'kycErr4'
                            }), 2);
                          }}
                          placeholder={this.props.intl.formatMessage({
                              id: 'kycErr4'
                            })}
                        > <FormattedMessage
                              id='tel'
                              defaultMessage = "联系电话"
                          /></InputItem>
                         <InputItem
                          {...getFieldProps('birthday', {
                            rules: [
                              { required: true, message: '请填写你的出生日期' },
                            ],
                          })}
                          clear
                          error={!!getFieldError('birthday')}
                          onErrorClick={() => {
                            Toast.fail(this.props.intl.formatMessage({
                              id: 'kycErr5'
                            }), 2);
                          }}
                          placeholder={this.props.intl.formatMessage({
                              id: 'kycErr5'
                            })}
                        > <FormattedMessage
                              id='birth'
                              defaultMessage = "出生日期"
                          /></InputItem>
                         <InputItem
                          {...getFieldProps('country', {
                            rules: [
                              { required: true, message: '请填写你所在的国家' },
                            ],
                          })}
                          clear
                          error={!!getFieldError('country')}
                          onErrorClick={() => {
                            Toast.fail(this.props.intl.formatMessage({
                              id: 'kycErr6'
                            }), 2);
                          }}
                          placeholder={this.props.intl.formatMessage({
                              id: 'kycErr6'
                            })}
                        > <FormattedMessage
                              id='country2'
                              defaultMessage = "国家"
                          /></InputItem>
                         <InputItem
                          {...getFieldProps('province', {
                            rules: [
                              { required: true, message: '请填写你所在的省份' },
                            ],
                          })}
                          clear
                          error={!!getFieldError('province')}
                          onErrorClick={() => {
                            Toast.fail(this.props.intl.formatMessage({
                              id: 'kycErr7'
                            }), 2);
                          }}
                          placeholder={this.props.intl.formatMessage({
                              id: 'kycErr7'
                            })}
                        > <FormattedMessage
                              id='province'
                              defaultMessage = "省份"
                          /></InputItem>
                         <InputItem
                          {...getFieldProps('city', {
                            rules: [
                              { required: true, message: '请填写你所在的城市' },
                            ],
                          })}
                          clear
                          error={!!getFieldError('city')}
                          onErrorClick={() => {
                            Toast.fail(this.props.intl.formatMessage({
                              id: 'kycErr8'
                            }), 2);
                          }}
                          placeholder={this.props.intl.formatMessage({
                              id: 'kycErr8'
                            })}
                        > <FormattedMessage
                              id='city'
                              defaultMessage = "城市"
                          /></InputItem>
                         <InputItem
                          {...getFieldProps('street', {
                            rules: [
                              { required: true, message: '请填写你的街道地址' },
                            ],
                          })}
                          clear
                          error={!!getFieldError('street')}
                          onErrorClick={() => {
                            Toast.fail(this.props.intl.formatMessage({
                              id: 'kycErr9'
                            }), 2);
                          }}
                          placeholder={this.props.intl.formatMessage({
                              id: 'kycErr9'
                            })}
                        > <FormattedMessage
                              id='street'
                              defaultMessage = "街道"
                          /></InputItem>
                         <InputItem
                          {...getFieldProps('post_code', {
                            rules: [
                              { required: true, message: '请填写你城市的邮编' },
                            ],
                          })}
                          clear
                          error={!!getFieldError('post_code')}
                          onErrorClick={() => {
                            Toast.fail(this.props.intl.formatMessage({
                              id: 'kycErr10'
                            }), 2);
                          }}
                          placeholder={this.props.intl.formatMessage({
                              id: 'kycErr10'
                            })}
                        > <FormattedMessage
                              id='post_code'
                              defaultMessage = "邮编"
                          /></InputItem>
                         <InputItem
                          {...getFieldProps('identity_document', {
                            rules: [
                              { required: true, message: '请填写你的职业' },
                            ],
                          })}
                          clear
                          error={!!getFieldError('identity_document')}
                          onErrorClick={() => {
                            Toast.fail(this.props.intl.formatMessage({
                              id: 'kycErr11'
                            }), 2);
                          }}
                          placeholder={this.props.intl.formatMessage({
                              id: 'kycErr11'
                            })}
                        > <FormattedMessage
                              id='identity_document'
                              defaultMessage = "身份类型"
                          /></InputItem>
                             <section>
                             <FormattedMessage
                              tagName="div"
                              id='idCardImg'
                              defaultMessage = "上传身份证件照片正面"
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
                              id='idCardImg2'
                              defaultMessage = "上传身份证件照片背面"
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
                              id='idCardImg3'
                              defaultMessage = "上传手持身份证件照片"
                          />
                              <ImagePicker
                                  files={filesHold}
                                  onChange={this.changeHold}
                                  onImageClick={(index, fs) => console.log(index, fs)}
                                  selectable={filesHold.length < 1}
                                  multiple={this.state.multiple}
                                />
                             </section>
                             <section>
                             <FormattedMessage
                              tagName="div"
                              id='idCardImg4'
                              defaultMessage = "上传银行卡账号照片"
                          />
                              <ImagePicker
                                  files={filesBank}
                                  onChange={this.changeBank}
                                  onImageClick={(index, fs) => console.log(index, fs)}
                                  selectable={filesBank.length < 1}
                                  multiple={this.state.multiple}
                                />
                             </section>
                  </List>
                    <div className="tao_maBtn">
                        <Button  type="primary" inline onClick={this.handleSubmit} > <FormattedMessage
                              id='submit'
                              defaultMessage = "提交审核"
                          /></Button>
                    </div>
                  </div>
      )
    } else if (this.state.kyc.kyc == 1) {
      content = (
        <div className="tao_materresult">
             <span className="wait_result"> <FormattedMessage
                              id='kycuploading'
                          /></span>
         </div>
      )
    } else if (this.state.kyc.kyc == 3) {
      content = (
        <div className="tao_materresult">
         <div><p><FormattedMessage
                              id='payName'
                              defaultMessage = "姓名"
                          />:</p><p>{this.state.kyc.name}</p></div>
         <div><p><FormattedMessage
                              id='emailReg'
                              defaultMessage = "邮箱"
                          />:</p><p>{this.state.kyc.email}</p></div>
         <div><p><FormattedMessage
                              id='tel'
                              defaultMessage = "联系电话"
                          />:</p><p>{this.state.kyc.mobile}</p></div>
         <div><p><FormattedMessage
                              id='birth'
                              defaultMessage = "出生日期"
                          />:</p><p>{this.state.kyc.birthday}}</p></div>
         <div><p><FormattedMessage
                              id='country2'
                              defaultMessage = "国家"
                          />:</p><p>{this.state.kyc.country}</p></div>
         <div><p> <FormattedMessage
                              id='province'
                              defaultMessage = "省份"
                          />:</p><p>{this.state.kyc.province}</p></div>
         <div><p><FormattedMessage
                              id='city'
                              defaultMessage = "城市"
                          />:</p><p>{this.state.kyc.city}</p></div>
         <div><p><FormattedMessage
                              id='street'
                              defaultMessage = "街道"
                          />:</p><p>{this.state.kyc.street}</p></div>
         <div><p><FormattedMessage
                              id='post_code'
                              defaultMessage = "邮编"
                          />:</p><p>{this.state.kyc.post_code}</p></div>
         <div><p><FormattedMessage
                    id='identity_document'
                    defaultMessage = "身份类型"
                />:</p><p>{this.state.kyc.identity_doc}</p></div>
        </div>
      )
    }
    return (
      <div className="tao_material">
                <Head />
                {content}
            </div>
    )
  }
}
const Material = createForm()(MaterialForm);
Material.propTypes = {
  intl: intlShape.isRequired
}
export default injectIntl(Material);