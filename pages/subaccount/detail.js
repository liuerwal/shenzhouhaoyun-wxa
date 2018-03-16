//index.js

var P = require('../../page')
var _ = P._

P.run({

    data: {
        user: {
            phone: '',
            limit_fund: '0',
            used_fund: '0',
            remain_fund: '0',
        }
    },

    customData: {
        limit: 0,
    },

    onLoad: function(options){

        var user = getApp().globalData('subaccount_show')

        user.used_fund = _.Math.sub(user.limit_fund, user.remain_fund)
        
        this.setData({
            user: user,
        })
    },

    limit: function(e){
        this.customData.limit = e.detail.value
        console.log(this.customData.limit)
    },

    close: function(e){
        var that   = this
        var user   = this.data.user
        var limit  = this.customData.limit*1
        var myself = _.cache('user')
        var fund   = myself.fund*1

        if ( !limit ){
            wx.navigateBack()
            return
        }

        if ( limit > myself.fund ){
            _.toast('限额超过了您的余额')
            return
        }

        P.Api.user.resetLimitFund(user.id, limit, function(response){
            user.limit_fund  = limit
            user.remain_fund = limit
            user.used_fund   = 0

            that.setData({
                user: user,
            })

            _.toast('设置成功')

            // setTimeout(function(){
            //     wx.navigateBack()
            // }, 3000)
        })
    }

    
});

