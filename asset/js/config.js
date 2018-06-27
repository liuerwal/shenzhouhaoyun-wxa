
var ROOT_URL = 'https://szhy.chuwo.com';
var API_URL = ROOT_URL + '/api';


module.exports = {

    DEBUG: true,

    ROOT_URL : ROOT_URL,

    API: {

        AUTH: {
            WEIXIN: API_URL+'/auth/weixin',
            OPENID: API_URL+'/auth/openid',
            PHONE: API_URL+'/auth/check/phone',
        },

        VERIFYCODE: API_URL+'/sms/verify-code',

        QUALIFICATION: {
            LIST: API_URL+'/qualification',
            ADD: API_URL+'/qualification/add',
        },

        UPLOADPIC_URL: API_URL+'/upload',

        MESSAGE: {
            DESTROY: API_URL+'/messages/destroy/%d',
            LIST: API_URL+'/messages',
            UNREAD: API_URL+'/messages/unread',
            SHOW: API_URL+'/message/%d',
            READ: API_URL+'/message/read/%d',
        },

        ORDER: {
            LIST: API_URL+'/orders',
            MONEY: API_URL+'/order/money',
            FREIGHT: API_URL+'/order/freight',
            CONFIRM: API_URL+'/order/confirm',
            SHOW: API_URL+'/order/%d',
            INPOUR: API_URL+'/order/inpour',
            CANCEL: API_URL+'/order/%d/cancel',
            DELETE: API_URL+'/order/%d/delete',
            ADDRESS:{
                DELIVER: API_URL+'/order/address/%d/deliver',
                ARRIVE: API_URL+'/order/address/%d/arrive',
                DONE: API_URL+'/order/address/%d/done',
            },
            TICKET: API_URL+'/order/ticket',
            TIME: API_URL+'/order/setting'
        },

        WAYBILL: {
            LIST: API_URL+'/waybill',
            SHOW: API_URL+'/waybill/%d',
            PICKUP: API_URL+'/waybill/%d/pickup',
            LOADING: API_URL+'/waybill/%d/loading',
            DELIVER: API_URL+'/waybill/%d/deliver',
            CANCEL: API_URL+'/waybill/%d/cancel',
        },

        PAY: API_URL+'/pay',

        OIL: {
            LIST: API_URL + '/oil',
            PRICE: API_URL + '/oil/price',
        },

        ADDRESS: {
            LIST: API_URL+'/address',
            SHOW: API_URL+'/address/%d',
            ADD: API_URL+'/address/add',
            EDIT: API_URL+'/address/%d/edit',
            DESTROY: API_URL+'/address/%d/destroy',
        },

        USER: {
            SELF: API_URL+'/user',
            SHOW: API_URL+'/user/%d',
            RESET_PASSWORD: API_URL+'/password/reset',
            BILLS: API_URL+'/mybill',
            COUPONS: API_URL+'/mycoupon',
            RESET_PHONE: API_URL+'/phone',
            RESET_PAY_PASSWD: API_URL+'/pay_passwd/reset',
            SUBACCOUNT: API_URL+'/subaccount',
            SUBACCOUNT_REMOVE: API_URL+'/subaccount/remove',
            SUBACCOUNT_CONFIRM: API_URL+'/subaccount/change',
            RESET_LIMIT_FUND: API_URL+'/subaccount/limit',
        },

        REGISTER_URL: API_URL+'/register',

        LOGIN_URL: API_URL+'/auth/login',                               //登录
        TOKEN_REFRESH: API_URL+'/auth/refresh',                    //刷新token

        WEIXIN: {
            WXAQRCODE: API_URL+'/weixin/wxa/qrcode',
        },

        ARTICLE: {
            LIST: API_URL+'/articles',
        }
    }

}