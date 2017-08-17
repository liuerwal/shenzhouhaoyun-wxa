//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    userInfo: {},
    items: [
        {name: 'USA', value: '美国', checked: 'true'},
        {name: 'CHN', value: '中国'},
        {name: 'BRA', value: '巴西'},
        ]
    },
    onLoad: function () {
        console.log('onLoad')
        var that = this
        //调用应用实例的方法获取全局数据
        app.getUserInfo(function(userInfo){
            //更新数据
            that.setData({
                userInfo:userInfo
            })
        })
    },
});

