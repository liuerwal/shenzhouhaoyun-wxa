
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
            P.Api.pay.unifiedorder(response, function(response){

                wx.requestPayment(_.extend(response.params, {
                    success: function(res){
                        _.toast('支付成功')
                        P.Api.user.myself(function(user){
                            _.cache('user', user)
                            wx.navigateBack()
                        });
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

