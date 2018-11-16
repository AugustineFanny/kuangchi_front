import React from 'react'
import {
    NoticeBar,
    Icon
} from 'antd-mobile';
import {
    injectIntl,
    intlShape,
    FormattedMessage,
} from 'react-intl';
class Notice extends React.Component {

    render() {
        return (
            <div className="tao_notice">
                 <NoticeBar mode="closable" >
                   <FormattedMessage
                            id='totalTil'
                        />
                </NoticeBar>
                  </div>
        )
    }
}

Notice.propTypes = {
    intl: intlShape.isRequired
}
export default injectIntl(Notice);