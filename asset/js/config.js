
var ROOT_URL = 'https://szhy.chuwo.com';


module.exports = {


    ROOT_URL : ROOT_URL,

    API: {

        WAYBILL_URL: ROOT_URL+'/api/waybill',
        UPLOADPIC_URL: ROOT_URL+'/api/uploadPic',
        ADDITEMS_URL: ROOT_URL+'/api/addItems',
        ITEMS_URL: ROOT_URL+'/api/items',
        DELMESSAGES_URL: ROOT_URL+'/api/messages/destroy',
        MESSAGES_URL: ROOT_URL+'/api/messages',
        PHONE_URL: ROOT_URL+'/api/phone',
        BILL_URL: ROOT_URL+'/api/mybill',
        RESET_URL: ROOT_URL+'/api/password/reset',
        ORDER_URL: ROOT_URL+'/api/order',
        ORDERS_URL: ROOT_URL+'/api/orders',
        LOGIN_URL: ROOT_URL+'/api/register',
        ADDADDRESS_URL: ROOT_URL+'/api/address/add',
        ADDRESS_URL: ROOT_URL+'/api/address',
        EDITADDRESS_URL: ROOT_URL+'/api/address/edit',
        DELADDRESS_URL: ROOT_URL+'/api/address/destroy',

        LOGIN_URL: ROOT_URL+'/api/login',                               //登录
        TOKEN_REFRESH: ROOT_URL+'/api/auth/refresh',                    //刷新token
    }

}