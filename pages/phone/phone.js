//Forgot-password.js

var CONFIG = require('../../utils/config');

Page({
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

            wx.request({
                url: CONFIG.API.PHONE_URL ,
                data: {
                    'phone': phone,
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

