//index.js
var CONFIG = require('../../utils/config');

Page({
    data: {
        bill:[],
    },
    onLoad: function () {
        var that = this;
        that.bill();
    },
    bill:function(){
        var that=this;

        wx.request({

            url:  CONFIG.API.BILL_URL , 
            data: {
                
            },
            method: 'GET', 
            header: {
                "Content-Type":"application/json",
                Authorization: "Bearer " + wx.getStorageSync('token')
            },
            success: function(res){
                console.log(res)
                if ( res.statusCode == 200 ){
                    var bill = res.data.data;
                    console.log(bill)
                    that.setData({
                        bill : bill
                    })
                    console.log("成功")

                }else{
                    console.log("什么")
                }
            },
            fail:function(res){
                console.log("失败")
            },
            complete: function(){
                console.log("aa")
            }
        });
    }
});

