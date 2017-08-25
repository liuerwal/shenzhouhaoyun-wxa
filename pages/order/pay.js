var P = require('../../page');
var _ = P._

P.run({

    xml: '<xml> \
           <appid>%s</appid> \
           <attach>%s</attach> \
           <body>%s</body> \
           <mch_id>%s</mch_id> \
           <detail><![CDATA[%s]]></detail> \
           <nonce_str>%s</nonce_str> \
           <notify_url>%s</notify_url> \
           <openid>%s</openid> \
           <out_trade_no>%s</out_trade_no> \
           <spbill_create_ip>%s</spbill_create_ip> \
           <total_fee>%s</total_fee> \
           <trade_type>JSAPI</trade_type> \
           <sign>%s</sign> \
        </xml>',

    onLoad: function(options){

        P._.debug(options)

        if ( options.order ){

            P.Api.pay.unifiedorder(options.order, function(response){
                wx.requestPayment(_.extend(response, {
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

    unifiedorder: function(){
        // return _.sprintf(this.xml, )
    }
})