
var P = require('../../page')
var _ = P._

P.run({
    data: {
        user: {}
    },

    onLoad: function(){
        var user = _.cache('user') 
    },

    formSubmit: function(e){
        var amount = e.detail.value.amount

        P.Api.order.inpour(amount, function(response){
            P.Api.pay(response.order_no, 'online', 'all', '', function(response){
                wx.requestPayment(_.extend(response, {
                    success: function(res){
                        _.toast('充值成功')
                        wx.navigateBack()
                    },
                    fail: function(res){
                        console.log(res);
                        if ( res.errMsg=='requestPayment:fail cancel' ){
                            _.toast('用户取消支付')
                            // wx.navigateBack()
                        }else{
                            _.toast(res.errMsg)
                        }
                    }
                }))

            })
        })
    }
});

