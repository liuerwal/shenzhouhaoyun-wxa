//index.js

var CONFIG = require('../../asset/js/config')
var P = require('../../page')
var _ = P._

P.run({

    data: {
        qrcode: ''
    },
    customData: {
        phone: '',
    },
    onLoad: function(){

    },

    phoneChange: function(e){
        this.customData.phone = e.detail.value
    },

    createQrcode: function(){
        var that  = this
        var phone = this.customData.phone

        if ( ! /1[0-9]{10}/.test(phone) ){
            _.toast('请填写有效的手机号码')
            return false
        }

        var user = _.cache('user')
        var query = _.sprintf('?parent=%d&phone=%d', user.id, phone)

        P.Api.auth.phone(phone, function(){
            that.setData({
                qrcode: CONFIG.API.WEIXIN.WXAQRCODE + query,
            })
        })

        
    },

    imageError: function(e){
        console.log(e)
    }
    
});

