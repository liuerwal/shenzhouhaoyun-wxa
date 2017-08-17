//index.js
var CONFIG = require('../../utils/config');

Page({
    data: {
        informdetail:[],
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

        that.informdetail();
    },  
    informdetail:function(e){
        var that=this;

        var id = that.data.id

        wx.request({

            url:  CONFIG.API.MESSAGES_URL +'/' + that.data.id, 
            data: {
            },
            method: 'GET', 
            header: {
                "Content-Type":"application/json",
                Authorization: "Bearer" + wx.getStorageSync('token')
            },
            success: function(res){
                console.log(res.data.data)
                if ( res.statusCode == 200 ){
                    var informdetail = res.data.data;

                    that.setData({
                        informdetail : informdetail
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
