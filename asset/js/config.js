
var ROOT_URL = 'https://szhy.chuwo.com';
var API_URL = ROOT_URL + '/api';


module.exports = {

    DEBUG: true,

    ROOT_URL : ROOT_URL,

    API: {

        AUTH: {
            OPENID: API_URL+'/auth/openid'
        },

        QUALIFICATION: {
            LIST: API_URL+'/qualification',
            ADD: API_URL+'/qualification/add',
        },

        UPLOADPIC_URL: API_URL+'/upload',

        MESSAGE: {
            DESTROY: API_URL+'/messages/destroy/%d',
            LIST: API_URL+'/messages',
            SHOW: API_URL+'/message/%d',
        },

        ORDER: {
            LIST: API_URL+'/orders',
            MONEY: API_URL+'/order/money',
            CONFIRM: API_URL+'/order/confirm',
            SHOW: API_URL+'/order/%d',
            INPOUR: API_URL+'/order/inpour',
            CANCEL: API_URL+'/order/%d/cancel',
            ARRIVE: API_URL+'/order/%d/arrive',
            DONE: API_URL+'/order/%d/done',
        },

        WAYBILL: {
            LIST: API_URL+'/waybill',
            SHOW: API_URL+'/waybill/%d',
            PICKUP: API_URL+'/waybill/%d/pickup',
            DELIVER: API_URL+'/waybill/%d/deliver',
        },

        PAY: {
            UNIFIEDORDER: API_URL+'/pay/unifiedorder',
        },

        OIL: {
            LIST: API_URL + '/oil',
        },

        ADDRESS: {
            LIST: API_URL+'/address',
            SHOW: API_URL+'/address/%d',
            ADD: API_URL+'/address/add',
            EDIT: API_URL+'/address/%d/edit',
            DESTROY: API_URL+'/address/%d/destroy',
        },

        USER: {
            SHOW: API_URL+'/user',
            RESET_PASSWORD: API_URL+'/password/reset',
            BILLS: API_URL+'/mybill',
            RESET_PHONE: API_URL+'/phone',
        },

        LOGIN_URL: API_URL+'/register',

        LOGIN_URL: API_URL+'/auth/login',                               //登录
        TOKEN_REFRESH: API_URL+'/auth/refresh',                    //刷新token
    }

}