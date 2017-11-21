var P = require('../../page');
var _ = P._

P.run({

    data: {
        boss_pay_btn: false,
    },

    onLoad: function(options){


        var order = getApp().globalData('order')

        this.setData({
            order: order,
            haveBoss: _.cache('user').parent_id ? true : false,
            boss_pay_btn: order.boss_pay ? true : false,
        })

    },

    payDeposit: function(){
        var that = this
        var order = getApp().globalData('order')

        P.Api.pay(order.order_no, 'deposit', function(response){
            that.paySuccess()
        })
    },

    payOnline: function(){
        var that = this
        var order = getApp().globalData('order')

        if ( order && order.order_no ){

            wx.showLoading({
                title: '请求支付...',
                mask: true,
            })

            P.Api.pay(order.order_no, 'online', function(response){
                wx.hideLoading()

                wx.requestPayment(_.extend(response, {
                    success: function(res){
                        console.log(res);
                        that.paySuccess()
                    },
                    fail: function(res){
                        console.log(res);
                        if ( res.errMsg=='requestPayment:fail cancel' ){
                            _.toast('用户取消支付')
                            setTimeout(function(){
                                _.redirectTo('/pages/order/list')
                            }, 1000)
                        }else{
                            _.toast(res.errMsg)
                        }
                    }
                }))
            })
        }else{
            _.alert('订单错误')
        }
    },

    payCash: function(){
        _.toast('好的')
    },

    payBoss: function(){
        var that = this
        var order = getApp().globalData('order')

        P.Api.pay(order.order_no, 'boss', function(response){
            that.paySuccess()
        })
    },

    paySuccess: function(){
        _.toast('支付成功')
        setTimeout(function(){
            _.redirectTo('/pages/order/list')
        }, 1000)
    }
})