//index.js

var CONFIG = require('../../utils/config');

Page({
    data: {
        winHeight: 0,  
    },
    onLoad: function(options) {  
        var that = this;

        wx.getSystemInfo( {  

            success: function( res ) {  
                that.setData( { 
                    winHeight: res.windowHeight  
                });  
            }
        });  
    },  
    chooseLocation:function(e){
        var that=this;
        wx.chooseLocation({
          success:function(res){
            console.log(res);
            that.setData( {
              location: {
                longitude: res.longitude,
                latitude: res.latitude,
                address: res.address,
                name: res.name,
            }
        })
        }
    })
    },
    formSubmit:function(e){
        var that=this;
        var lng = e.detail.value.lng;
        var lat = e.detail.value.lat;
        var address = e.detail.value.address;
        var alias = e.detail.value.alias;
        if(alias.length == 0){
            wx.showToast({
                title: "内容不能为空",
                icon: "false",
                duration: 2000
            });
        }else{
            wx.request({

            url:  CONFIG.API.ADDADDRESS_URL, 
            data: {
                'lng': lng ,
                'lat': lat ,
                'address': address ,
                'alias': alias ,
            },
            method: 'POST', 
            header: {
                "Content-Type":"application/json",
                Authorization: "Bearer" + wx.getStorageSync('token')
            },
            success: function(res){
                console.log(res)
                if ( res.statusCode == 200 ){
                    wx.redirectTo({
                        url: '/pages/Management-address/Management-address'
                    });
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

        
    },
    
});

