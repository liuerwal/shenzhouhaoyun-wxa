var _      = require('util')

module.exports = {
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
                console.log(response)
                success(response.data)
            }
        });

        wx.request(data);
    }
}