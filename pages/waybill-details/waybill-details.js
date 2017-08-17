//Order details.js

var CONFIG = require('../../utils/config');

Page({
    data: {
        orderdetail:[],
    },
    onLoad: function(options) {  
        var that = this;
        var id = options.id;

        wx.getSystemInfo( {  

            success: function( res ) {  
                that.setData( { 
                    id:id, 
                });  
            }
        });   

        that.orderdetail();
    },  
    orderdetail:function(e){
        var that=this;

        var id = that.data.id

        wx.request({

            url:  CONFIG.API.WAYBILL_URL +'/' + that.data.id, 
            data: {
            },
            method: 'GET', 
            header: {
                "Content-Type":"application/json",
                Authorization: "Bearer" + wx.getStorageSync('token')
            },
            success: function(res){
                console.log(res)
                if ( res.statusCode == 200 ){
                    var orderdetail = res.data.data.waybill;

                    that.setData({
                        orderdetail : orderdetail
                    })
                    console.log("成功")

                }else{
                    wx.showToast(res.msg)
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

