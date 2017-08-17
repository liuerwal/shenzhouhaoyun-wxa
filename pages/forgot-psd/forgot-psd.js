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
        if(e.detail.value.oldpass.length==0 || e.detail.value.newpass.length==0 || e.detail.value.apass.length==0 ){
            wx.showToast({
                title: "内容不能为空",
                icon: "false",
                duration: 2000
            });
        }else{
            var that    = this;
            var oldpass   = e.detail.value.oldpass;
            var newpass = e.detail.value.newpass;
            var apass = e.detail.value.apass;

            wx.request({
                url: CONFIG.API.RESET_URL ,
                data: {
                    'old_password': oldpass,
                    'new_password': newpass,
                },
                method: 'POST', 
                header: {
                    "Content-Type":"application/x-www-form-urlencoded",
                    Authorization: "Bearer" + wx.getStorageSync('token')
                },
                success:function(res){
                    console.log(res)
                    if ( res.statusCode == 200 ){
                        console.log("成功")

                    }else{
                        console.log("失败")
                        wx.showModal({
                            title: '提示',
                            content: res.data.msg,
                        });
                    }
                }
            })
        }
    },
});

