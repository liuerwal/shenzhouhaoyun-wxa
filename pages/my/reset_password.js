
var P = require('../../page')
var _ = P._

P.run({
  data: {
     winHeight: 0,
    },
    onLoad: function() {  
        var that = this;  
        wx.getSystemInfo( {  

            success: function( res ) {  
                that.setData( {  
                    winHeight: res.windowHeight  
                });  
            }
        });  
    },  
    formSubmit:function  (e) {
        var that    = this;
        var oldpwd = e.detail.value.oldpwd
        var newpwd = e.detail.value.newpwd
        var repwd = e.detail.value.repwd

        if ( !oldpwd.length ){
            _.toast('原密码错误')
            return;
        }
        if ( newpwd.length < 6 ){
            _.toast('密码至少6位')
            return;
        }
        if ( newpwd != repwd ){
            _.toast('两次密码不一致')
            return;
        }

        P.Api.user.resetPwd(oldpwd, newpwd, function(res){
            _.toast('修改成功')
            setTimeout(function(){
                wx.navigateBack()
            }, 1500)
        })
    },
});

