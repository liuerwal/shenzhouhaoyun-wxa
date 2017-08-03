//index.js
//获取应用实例
var app = getApp()
Page({
    data: {

    },
    formSubmit: function(e) {
        var radio   = e.detail.value['radio-group'];
        if(radio = "car"){
            console.log(11)
            console.log('form发生了submit事件，携带数据为：', e.detail.value);
            wx.reLaunch({
                // url: '/pages/index/index'
            });
        }else{
            console.log(aa)
            wx.reLaunch({
                // url: '/pages/all-Order/all-Order'
            });
        }
    },
    
    //发送短信验证码  
    $(".getcode").click(function(){  
        var countdown = 60;  
        var _this = $(this);  
        _this.attr("disabled", "true");  
        _this.val(countdown + "秒");  
        var timer = setInterval(function(){  
            if (countdown == 0) {                  
                clearInterval(timer);
                _this.removeAttr("disabled"); 
                _this.val("重新发送");  
            }  
            else {  
                countdown--;  
                _this.val(countdown + "秒");  
            }  
        }, 1000);  
    }); 

});

