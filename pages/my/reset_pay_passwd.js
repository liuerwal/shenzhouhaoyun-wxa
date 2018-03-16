var P = require('../../page')
var _ = P._

P.run({

    data: {
        is_set_pay_passwd: 0,
    },

    onLoad: function() {  
        var that = this;    
        var user = _.cache('user')

        this.setData({
            is_set_pay_passwd: user.is_set_pay_passwd
        })
    },  
    formSubmit:function  (e) {
        var user = _.cache('user')

        if ( user.is_set_pay_passwd ){
            this.resetPassword(e.detail.value)
        }else{
            this.setPassword(e.detail.value)
        }

        
    },

    setPassword: function(data){
        var oldpassword = ''
        var password    = data.password
        var repassword  = data.repassword

        if ( !password ){
            _.mytoast('请输入支付密码')
            return ;
        }

        if ( !password || password.length!=6 ){
            _.mytoast('支付密码必须为6位数字')
            return ;
        }

        if ( password != repassword ){
            _.mytoast('两次密码不一致')
            return ;
        }

        P.Api.user.resetPayPasswd(oldpassword, password, function(res){
            _.toast('修改成功')
            setTimeout(function(){
                wx.navigateBack()
            }, 3000)
        })
    },

    resetPassword: function(data){

        var oldpassword = data.oldpassword
        var password    = data.password
        var repassword  = data.repassword

        if ( !oldpassword ){
            _.mytoast('请输入原支付密码')
            return ;
        }

        if ( !password ){
            _.mytoast('请输入新支付密码')
            return ;
        }

        if ( !password || password.length!=6 ){
            _.mytoast('支付密码必须为6位数字')
            return ;
        }

        if ( password != repassword ){
            _.mytoast('两次密码不一致')
            return ;
        }

        P.Api.user.resetPayPasswd(oldpassword, password, function(res){
            _.toast('修改成功')
            setTimeout(function(){
                wx.navigateBack()
            }, 3000)
        })
    }
});

