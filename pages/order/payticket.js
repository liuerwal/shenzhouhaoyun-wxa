var P = require('../../page');
var _ = P._

P.run({

    onLoad: function(options){


        var order = getApp().globalData('ticket')
        var user = _.cache('user')

        order.use_fund = user.fund>order.amount

        this.setData({
            order: order,
        })

    },

    payDeposit: function(){
        var that = this
        var order = getApp().globalData('ticket')

        P.Api.pay(order.order_no, 'deposit', function(response){
            that.paySuccess()
        })
    },

    payOnline: function(){
        var that = this
        var order = getApp().globalData('ticket')

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

    paySuccess: function(){
        _.toast('支付成功')
        setTimeout(function(){
            _.switchTab('home')
        }, 1000)
    }
})