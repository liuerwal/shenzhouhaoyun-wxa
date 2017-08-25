//Forgot-password.js

var CONFIG = require('../../asset/js/config');

var P = require('../../page');

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
        console.log('form发生了submit事件，携带数据为：', e.detail.value);
        if(e.detail.value.phone.length==0 || e.detail.value.code.length==0 ){
            wx.showToast({
                title: "内容不能为空",
                icon: "false",
                duration: 2000
            });
        }else{
            var that    = this;
            var phone   = e.detail.value.phone;

            P.Api.resetPhone(phone, function(res){
                _.toast('修改成功')
                setTimeout(function(){
                    wx.navigateBack()
                }, 1500)
            })
        }
    },
});

