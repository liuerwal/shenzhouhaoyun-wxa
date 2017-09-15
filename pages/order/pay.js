var P = require('../../page');
var _ = P._

P.run({

    onLoad: function(options){

        P._.debug(options)

        var that = this;

        if ( options.order ){

            P.Api.pay.unifiedorder(options.order, function(response){
                that.customData.params = response.params;

                that.setData({
                    paylog: response.paylog
                })
            })
        }else{
            _.alert('订单错误')
        }


        // wx.request({
        //     url
        // });

        // wx.request({
        //     url: 'https://api.mch.weixin.qq.com/pay/unifiedorder',
        //     data: this.unifiedorder(),
        //     method: "POST",
        //     header: {
        //         "Content-Type": "application/xml",
        //     },
        //     dataType: "xml",
        //     success: function(response){
        //         response
        //     }
        // })

    },

    Onlinepay: function(){
        wx.requestPayment(_.extend(this.customData.params, {
            success: function(res){
                console.log(res);
                _.toast('支付成功')
                setTimeout(function(){
                    _.redirectTo('/pages/order/list')
                }, 1000)
            },
            fail: function(res){
                console.log(res);
                if ( res.errMsg=='requestPayment:fail cancel' ){
                    _.toast('用户取消支付')
                    _.redirectTo('/pages/order/list')
                }else{
                    _.toast(res.errMsg)
                }
            }
        }))
    },

    Linepay: function(){
        _.toast('好的')
    }
})