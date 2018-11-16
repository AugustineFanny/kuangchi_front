import {
    Toast
} from 'antd-mobile';
import {
    injectIntl,
    intlShape,
    FormattedMessage
} from 'react-intl';
export let showRange = (min, max, unit) => {
    if (min == 0 && max == 0) {
        return "不限"
    } else if (min == 0 && max > 0) {
        return "低于" + max + " " + unit
    } else if (min > 0 && max == 0) {
        return "高于" + min + " " + unit
    } else {
        return "" + min + "~" + max + " " + unit
    }
}

export let showDate = (str) => {
    return str.split("T")[0]
}

export let showDatetime = (str) => {
    if (str.startsWith("0001")) {
        return "-"
    }
    return str.replace("T", " ").substring(0, 19)
}

export let showAvatar = (avatar) => {
    if (avatar) {
        return "/uphp/gcexserver/avatar/" + avatar
    }
    return require('../../img/user.png')
}

export let limitPrice = (price) => {
    return Math.floor(price * 100) / 100
}
export let beforeUpload = (file) => {
    if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
        Toast.fail('请上传jpg或png格式图片', 2);
        return false;
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        Toast.fail('图片必须小于2MB', 2);

        return false;
    }
    return true;
}
export let limitAmount = (amount) => {
    return Math.floor(amount * 1000000) / 1000000
}


export let showTradeStatus = (status, appeal) => {
    switch (appeal) {
        case 1:
        case "1":
            return "买家申诉中";
        case 2:
        case "2":
            return "卖家申诉中";
    }
    switch (status) {
        case 0:
        case "0":
            return "待接受";
        case 1:
        case "1":
            return "已注资，待付款";
        case 2:
        case "2":
            return "已付款，待放行";
        case 3:
        case "3":
            return "完成";
        case 4:
        case "4":
            return "取消";
        case 5:
        case "5":
        case 7:
        case "7":
            return "自动取消";
        case 6:
        case "6":
            return "拒绝";
    }
}

export let showPaymentMethods = {
    "ALIPAY": "支付宝",
    "NATIONAL_BANK": "银行转账",
    "WECHAT": "微信支付",
}

export let showCountry = {
    "CN": "中国",
    "HK": "香港",
    "JN": "印度",
    "JP": "日本",
    "US": "美国",
    "AU": "澳大利亚",
}
export const fakeAuth = {
    isAuthenticated: false,
    authenticate(cb) {
        this.isAuthenticated = true;
        setTimeout(cb, 100); // fake async
    },
    signout(cb) {
        this.isAuthenticated = false;
        setTimeout(cb, 100);
    }
};
export let codeTest = (props, code) => {
    switch (code) {
        case 100200:
            Toast.success(props.intl.formatMessage({
                id: "100200"
            }))
            break;
        case 100100:
            Toast.fail(props.intl.formatMessage({
                id: "100100"
            }))
            break;
        case 100101:
            Toast.fail(props.intl.formatMessage({
                id: "100101"
            }))
            break;
        case 100102:
            Toast.fail(props.intl.formatMessage({
                id: "100102"
            }))
            break;
        case 100103:
            Toast.fail(props.intl.formatMessage({
                id: "100103"
            }))
            break;
        case 100104:
            Toast.fail(props.intl.formatMessage({
                id: "100104"
            }))
            break;
        case 100105:
            Toast.fail(props.intl.formatMessage({
                id: "100105"
            }))
            break;
        case 100106:
            Toast.fail(props.intl.formatMessage({
                id: "100106"
            }))
            break;
        case 100107:
            Toast.fail(props.intl.formatMessage({
                id: "100107"
            }))
            break;
        case 100108:
            Toast.fail(props.intl.formatMessage({
                id: "100108"
            }))
            break;
        case 100109:
            Toast.fail(props.intl.formatMessage({
                id: "100109"
            }))
            break;
        case 100110:
            Toast.fail(props.intl.formatMessage({
                id: "100110"
            }))
            break;
        case 100111:
            Toast.fail(props.intl.formatMessage({
                id: "100111"
            }))
            break;
        case 100112:
            Toast.fail(props.intl.formatMessage({
                id: "100112"
            }))
            break;
        case 100113:
            Toast.fail(props.intl.formatMessage({
                id: "100113"
            }))
            break;
        case 100301:
            Toast.fail(props.intl.formatMessage({
                id: "100301"
            }))
            break;
        case 100302:
            Toast.fail(props.intl.formatMessage({
                id: "100302"
            }))
            break;
        case 100303:
            Toast.fail(props.intl.formatMessage({
                id: "100303"
            }))
            break;
        case 100304:
            Toast.fail(props.intl.formatMessage({
                id: "100304"
            }))
            break;
        case 100305:
            Toast.fail(props.intl.formatMessage({
                id: "100305"
            }))
            break;
        case 100306:
            Toast.fail(props.intl.formatMessage({
                id: "100306"
            }))
            break;
        case 100307:
            Toast.fail(props.intl.formatMessage({
                id: "100307"
            }))
            break;
        case 100308:
            Toast.fail(props.intl.formatMessage({
                id: "100308"
            }))
            break;
        case 100309:
            Toast.fail(props.intl.formatMessage({
                id: "100309"
            }))
            break;
        case 100310:
            Toast.fail(props.intl.formatMessage({
                id: "100310"
            }))
            break;
        case 100311:
            Toast.fail(props.intl.formatMessage({
                id: "100311"
            }))
            break;
        case 100312:
            Toast.fail(props.intl.formatMessage({
                id: "100312"
            }))
            break;
        case 100313:
            Toast.fail(props.intl.formatMessage({
                id: "100313"
            }))
            break;
        case 100314:
            Toast.fail(props.intl.formatMessage({
                id: "100314"
            }))
            break;
        case 100315:
            Toast.fail(props.intl.formatMessage({
                id: "100315"
            }))
            break;
        case 100316:
            Toast.fail(props.intl.formatMessage({
                id: "100316"
            }))
            break;
        case 100317:
            Toast.fail(props.intl.formatMessage({
                id: "100317"
            }))
            break;
        case 100318:
            Toast.fail(props.intl.formatMessage({
                id: "100318"
            }))
            break;
        case 100319:
            Toast.fail(props.intl.formatMessage({
                id: "100319"
            }))
            break;
        case 100320:
            Toast.fail(props.intl.formatMessage({
                id: "100320"
            }))
            break;
        case 100321:
            Toast.fail(props.intl.formatMessage({
                id: "100321"
            }))
            break;
        case 100401:
            Toast.fail(props.intl.formatMessage({
                id: "100401"
            }))
            break;
        case 100402:
            Toast.fail(props.intl.formatMessage({
                id: "100402"
            }))
            break;
        case 100403:
            Toast.fail(props.intl.formatMessage({
                id: "100403"
            }))
            break;
        case 100404:
            Toast.fail(props.intl.formatMessage({
                id: "100404"
            }))
            break;
        case 100405:
            Toast.fail(props.intl.formatMessage({
                id: "100405"
            }))
            break;
        case 100406:
            Toast.fail(props.intl.formatMessage({
                id: "100406"
            }))
            break;
        case 100407:
            Toast.fail(props.intl.formatMessage({
                id: "100407"
            }))
            break;
        case 100408:
            Toast.fail(props.intl.formatMessage({
                id: "100408"
            }))
            break;
        case 100409:
            Toast.fail(props.intl.formatMessage({
                id: "100409"
            }))
            break;
        case 100410:
            Toast.fail(props.intl.formatMessage({
                id: "100410"
            }))
            break;
        case 100411:
            Toast.fail(props.intl.formatMessage({
                id: "100411"
            }))
            break;
        case 900001:
            Toast.fail(props.intl.formatMessage({
                id: "900001"
            }))
            break;
        case 999999:
            Toast.fail(props.intl.formatMessage({
                id: "999999"
            }))
            break;
    }
}