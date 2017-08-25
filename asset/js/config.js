
var ROOT_URL = 'https://szhy.chuwo.com';
var API_URL = ROOT_URL + '/api';


module.exports = {

    DEBUG: true,

    ROOT_URL : ROOT_URL,

    API: {

        AUTH: {
            OPENID: API_URL+'/auth/openid'
        },

        WAYBILL_URL: API_URL+'/waybill',
        UPLOADPIC_URL: API_URL+'/uploadPic',
        ADDITEMS_URL: API_URL+'/addItems',
        ITEMS_URL: API_URL+'/items',

        MESSAGE: {
            DESTROY: API_URL+'/messages/destroy/%d',
            LIST: API_URL+'/messages',
            SHOW: API_URL+'/message/%d',
        },

        ORDER: {
            LIST: API_URL+'/orders',
            MONEY: API_URL+'/order/money',
            CONFIRM: API_URL+'/order/confirm',
            ORDER_URL: API_URL+'/order',
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