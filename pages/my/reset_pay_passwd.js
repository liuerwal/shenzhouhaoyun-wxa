var P = require('../../page')
var _ = P._

P.run({

    onLoad: function() {  
        var that = this;    
    },  
    formSubmit:function  (e) {
        var password = e.detail.value.password
        var pay_passwd = e.detail.value.pay_passwd

        if ( !password ){
            _.toast('请输入登录密码')
            return ;
        }

        if ( !pay_passwd || pay_passwd.length!=6 ){
            _.toast('支付密码必须为6位数字')
            return ;
        }

        P.Api.user.resetPayPasswd(password, pay_passwd, function(res){
            _.toast('修改成功')
            setTimeout(function(){
                wx.navigateBack()
            }, 3000)
        })
    },
});

