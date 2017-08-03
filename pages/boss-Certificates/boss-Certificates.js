//index.js
//获取应用实例
var app = getApp()
Page({
    data: {
        region: ['广东省', '广州市', '海珠区'],
    },
    bindRegionChange:function(e){
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            region: e.detail.value
        })
    },
});

