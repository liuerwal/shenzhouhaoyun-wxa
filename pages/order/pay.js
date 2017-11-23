var P = require('../../page');
var _ = P._

P.run({

    data: {
        boss_pay_btn: false,
        pay_choose_box: true,
    },
    customData: {
        payWith: null,
    },

    onLoad: function(options){


        var order = getApp().globalData('order')

        this.setData({
            order: order,
            haveBoss: _.cache('user').parent_id ? true : false,
            boss_pay_btn: order.boss_pay ? true : false,
        })

    },

    choose: function(e){
        this.customData.payWith = e.currentTarget.dataset.paywith
        this.setData({
            pay_choose_box: false,
        })
    },

    payDeposit: function(paypart){
        var that = this
        var order = getApp().globalData('order')

        P.Api.pay(order.order_no, 'deposit', paypart, function(response){
            that.paySuccess()
        })
    },

    payOnline: function(paypart){
        var that = this
        var order = getApp().globalData('order')

        if ( order && order.order_no ){

            wx.showLoading({
                title: '请求支付...',
                mask: true,
            })

            P.Api.pay(order.order_no, 'online', paypart, function(response){
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

    payBoss: function(paypart){
        var that = this
        var order = getApp().globalData('order')

        P.Api.pay(order.order_no, 'boss', paypart, function(response){
            that.paySuccess()
        })
    },

    pay: function(){
        this[this.customData.payWith]( this.customData.payPart )
    },

    payAll: function(){
        this.customData.payPart = 'all'
    },
    payFreight: function(){
        this.customData.payPart = 'freight'
    },

    paySuccess: function(){
        _.toast('支付成功')
        setTimeout(function(){
            _.redirectTo('/pages/order/list')
        }, 1000)
    },
})