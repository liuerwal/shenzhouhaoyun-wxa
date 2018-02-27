var _ = require('util')
var Api = require('api')

module.exports = {
    login: function(success){
        wx.showLoading({title: '登录中...'})

        wx.login({
            success: function(res){
                wx.hideLoading()
                if (res.code) {
                    Api.saveOpenId(res.code, function(response){
                        if ( response.user ){
                            _.cache('token', response.token)
                            _.cache('ttl', response.ttl)
                            _.cache('refresh_ttl', response.refresh_ttl)
                            _.cache('user', response.user)
                        }
                        _.cache('openid', response.openid)

                        success && success(response.user)
                    })
                } else {
                    _.alert('登录失败')
                }
            }
        })
    }
}