import React from 'react'
import '@/style/Subform.css'
import axios from 'axios'
import {
    List,
    InputItem,
    Button,
    Toast,
    ImagePicker
} from 'antd-mobile';
import {
    createForm
} from 'rc-form';
import {
    beforeUpload,
    codeTest
} from '../common/utils'
import {
    injectIntl,
    intlShape,
    FormattedMessage,
} from 'react-intl';
class SubformForm extends React.Component {
    constructor() {
        super();
        this.state = {
            multiple: false,
            addrImg: [],
        }
    }
    changeImg = (files, type, index) => {
        if (files[0]) {
            if (beforeUpload(files[0].file) == true) {
                this.setState({
                    addrImg: files,
                });
            }
        } else {
            this.setState({
                addrImg: files,
            });
        }
    }
    close = () => {
        this.props.closemask()
    }
    handleSubmit = (e) => {
        e.preventDefault();
        let screenshot = this.state.addrImg[0];
        if (screenshot == undefined) {
            Toast.fail(this.props.intl.formatMessage({
                id: 'sunform_tit'
            }), 2);
        } else if (screenshot.file) {
            screenshot = screenshot.file;
        }

        this.props.form.validateFields((err, values) => {
            if (!err && screenshot) {
                var formData = new FormData();
                formData.append("hash", values["hash"]);
                formData.append("screenshot", screenshot);
                axios.post("/kc/wallet/order/" + this.props.order, formData, {
                        headers: {
                            "Content-Type": "application/json",
                            "authorization": sessionStorage.getItem("authorization")
                        }
                    })
                    .then(res => {
                        if (res.data.code == "100200") {
                            Toast.success(this.props.intl.formatMessage({
                                id: 'success2'
                            }), 1.5);
                            setTimeout(() => {
                                this.props.getOrder();
                                this.props.closemask();
                            }, 1500)
                        } else if (res.data.code == "100102") {
                            Toast.fail(res.data.msg, 1.5);
                        } else {
                            codeTest(this.props, res.data.code)
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }
        });
    }
    render() {
        const {
            getFieldProps,
            getFieldError,
        } = this.props.form;
        const {
            addrImg
        } = this.state;
        return (
            <div className="subform">
                <div className="subform_head">
                     <i onClick={this.close} className="icon iconfont icon-guanbi"></i>
                </div>
                <div className="subform_content">
                      <InputItem
                          {...getFieldProps('hash', {
                            // initialValue: 'little ant',
                            rules: [
                              { required: true, message: this.props.intl.formatMessage({
                                                id: 'subform_tit'
                                            }) },
                            ]
                          })}
                          clear
                          error={!!getFieldError('hash')}
                          onErrorClick={() => {
                            Toast.fail(this.props.intl.formatMessage({
                                                id: 'subform_tit'
                                            }), 2);
                          }}
                          placeholder={this.props.intl.formatMessage({
                                                id: 'subform_tit'
                                            })}
                        >Txid</InputItem>
                   <section>
                   <FormattedMessage
                        tagName="div"
                        id='cuurImg'
                        defaultMessage = "打币截图"
                    />
                      <ImagePicker
                          files={addrImg}
                          onChange={this.changeImg}
                          onImageClick={(index, fs) => console.log(index, fs)}
                          selectable={addrImg.length < 1}
                          multiple={this.state.multiple}
                        />
                     </section> 
                </div>
                <div className="subBtn">
                      <Button inline onClick={this.handleSubmit} > <FormattedMessage
                        id='submit'
                        defaultMessage = "提交"
                    /></Button>
                </div>    
            </div>
        )
    }
}
const Subform = createForm()(SubformForm);
Subform.propTypes = {
    intl: intlShape.isRequired
}
export default injectIntl(Subform);