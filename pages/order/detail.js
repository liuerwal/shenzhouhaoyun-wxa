var P = require('../../page')
var _ = P._

P.run({
    data: {
        order: null,
        pay_choose_box: true,
        id: null,
    },
    onLoad: function(options) {  
        var that = this;

        that.loadOrder(options.id);
    },

    loadOrder:function(id){
        var that=this;

        P.Api.order.show(id, function(response){
            response.pay_status_text = that.payStatusText(response)
            that.setData({
                order : response
            })

        });

    },

    orderCancel: function(e){
        var id = this.data.order.id
        
        if ( this.data.order.order_oil.status > 0 ){
            var message = '订单已在受理中，取消订单将扣除一定的费用，您确定取消此订单吗？'
        }else{
            var message = '您确定要取消此订单吗？'
        }

        _.confirm(message, function(){
            P.Api.order.cancel(id, function(response){
                _.toast('订单已取消')
                setTimeout(function(){
                    wx.navigateBack()
                }, 1500)
            });
        })
    },

    payOil: function(){
        this.setData({
            pay_choose_box: false,
        })
    },

    choose: function(e){
        this.customData.payWith = e.currentTarget.dataset.paywith
    },

    pay: function(){
        this[this.customData.payWith]()
    },

    payDeposit: function(){
        var that = this
        var order = this.data.order

        _.loading('请求支付...')

        P.Api.pay(order.order_no, 'deposit', 'oil', function(response){
            that.paySuccess()
            _.hideLoading()
        })
    },

    payOnline: function(){
        var that = this
        var order = this.data.order

        if ( order && order.order_no ){

            _.loading('请求支付...')

            P.Api.pay(order.order_no, 'online', 'oil', function(response){
                _.hideLoading()

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

    payBoss: function(){
        var that = this
        var order = this.data.order

        _.loading('请求支付...')
        P.Api.pay(order.order_no, 'boss', 'oil', function(response){
            that.paySuccess()
            _.hideLoading()
        })
    },

    paySuccess: function(){
        var order = this.data.order
        order.pay_status = 1
        order.order_oil.oil_pay_status = 1
        order.pay_status_text = this.payStatusText(order)

        this.setData({
            order: order,
            pay_choose_box: true,
        })
    },

    payStatusText: function(order){
        if ( order.pay_status ){
            return '已支付'
        }
        if ( order.order_oil.freight_pay_status ){
            return '仅支付运费'
        }
        return '未支付'
    }
});

