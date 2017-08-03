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
    


});

