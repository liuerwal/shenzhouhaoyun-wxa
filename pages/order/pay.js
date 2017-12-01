var P = require('../../page');
var _ = P._

P.run({

    data: {
        boss_pay_btn: false,
        pay_choose_box: true,
        pay_title: '支付',
        pay_amount: 0,
        payWithDefault: 'online'
    },
    customData: {
        payWith: 'online',
        payPart: null,
    },

    onLoad: function(options){

        this.loadOrder(options.order)

    },

    loadOrder:function(id){
        var that=this;

        P.Api.order.show(id, function(response){
            that.setData({
                order : response
            })
        });
    },

    payDeposit: function(paypart){
        var that = this
        var order = this.data.order
        var password = this.customData.password

        P.Api.pay(order.order_no, 'deposit', paypart, password, function(response){
            that.paySuccess()
        })
    },

    payOnline: function(paypart){
        var that = this
        var order = this.data.order
        var password = this.customData.password

        if ( order && order.order_no ){

            wx.showLoading({
                title: '请求支付...',
                mask: true,
            })

            P.Api.pay(order.order_no, 'online', paypart, password, function(response){
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
        var order = this.data.order
        var password = this.customData.password

        P.Api.pay(order.order_no, 'boss', paypart, password, function(response){
            that.paySuccess()
        })
    },

    pay: function(e){
        this.customData.password = e.detail.password
        var method = 'pay'+ _.ucfirst(this.customData.payWith)
        this[method]( this.customData.payPart )
    },
    payPart: function(e){
        this.customData.payPart = e.currentTarget.dataset.paypart
        if ( this.customData.payWith != 'online' ){
            this.showPasswodBox()
        }else{
            var method = 'pay'+ _.ucfirst(this.customData.payWith)
            this[method]( this.customData.payPart )
        }
    },
    payWith: function(e){
        this.customData.payWith = e.detail.paywith
    },

    paySuccess: function(){
        _.toast('支付成功')
        setTimeout(function(){
            _.redirectTo('/pages/order/list')
        }, 1000)
    },


    showPasswodBox: function(){
        var order = this.data.order
        var orderOil = this.data.order.order_oil
        
        this.setData({
            pay_choose_box: false,
            pay_title: this.customData.payWith=='deposit' ? '余额支付' : '老板支付',
            pay_amount: this.customData.payPart=='all' ? order.amount : _.Math.sub(order.amount, orderOil.amount) ,
        })
    },
})