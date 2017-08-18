var CONFIG = require('config');
var _ = require('util');

module.exports = {
    login: function(phone, password, success){

        this.post(CONFIG.API.LOGIN_URL, {phone: phone, password: password }, function(response){
            if ( response.status == 1){
                wx.setStorageSync('token', response.data.token);
                wx.setStorageSync('ttl', response.data.ttl);
                wx.setStorageSync('refresh_ttl', response.data.refresh_ttl);
                success && success(response.data);
            }else{
                _.toast("登陆失败")
            }
        });
    },

    getUserInfo: function(){
        var userinfo = wx.getStorageSync('userinfo');
        if ( !userinfo ){
            wx.getUserInfo({
                success: function(res) {
                    var userinfo = res.userInfo
                    wx.setStorageSync('userinfo', userinfo);
                    console.log(userinfo);
                }
            });
        }
    },

    checkToken: function(){
        if ( this.isRefreshTokenExpired() ){
            throw new Error('token expired');
        }else{
            if ( this.isTokenExpired() ){
                this.freshToken()
            }
        }
    },

    freshToken: function(){
        this.get(CONFIG.API.TOKEN_REFRESH, {}, function(response){
            _.cache('token', response.data.token)
            _.cache('ttl', response.data.ttl)
        })
    },

    isTokenExpired: function(){
        return _.timestamp() > _.cache('ttl')
    },

    isRefreshTokenExpired: function(){
        return _.timestamp() > _.cache('refresh_ttl')
    },

    get: function(url, params, callback){
        this.request({
            method  : 'GET',
            url     : url,
            data    : params,
            success : callback
        })
    },

    post: function(url, params, callback){
        this.request({
            method  : 'POST',
            url     : url,
            data    : params,
            success : callback
        })
    },

    request: function(data){

        var success = data.success || function(){}

        data = _.extend({
            header: {
                "Content-Type" : "application/x-www-form-urlencoded",
                "Version"      : "v1",
                "Authorization": "Bearer "+ _.cache('token'),
            },
            dataType: 'json',
            fail: function(e){
                console.log(e.message)
                _.toast('请求失败，请稍后再试');
            }
        }, data, {
            success: function(response){
                success(response.data)
            }
        });

        wx.request(data);
    }
}



