//index.js

var CONFIG = require('../../utils/config');

Page({
  data: {  
        winHeight: 0,   
        inform:[]
    },  
    onLoad: function(options) {  
        var that = this;  

        var id = options.id;
        wx.getSystemInfo( {  

            success: function( res) {  
                that.setData( {  
                    winHeight: res.windowHeight,
                    id :id
                });  
            }  
        });  
        that.addform();
    },  
    addform:function(){
        var that=this;

        wx.request({

            url:  CONFIG.API.MESSAGES_URL , 
            data: {
                // 'token': wx.getStorageSync('token')
            },
            method: 'GET', 
            header: {
                "Content-Type":"application/json",
                Authorization: "Bearer " + wx.getStorageSync('token')
            },
            success: function(res){
                console.log(res)
                if ( res.statusCode == 200 ){
                    var inform = res.data.data;
                    console.log(inform)
                    that.setData({
                        inform : inform
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
    },
    delinform:function(e){
        var that = this;
        var index = e.currentTarget.dataset.index;
        var inform = that.data.inform[index];
        console.log(index)
        console.log(that.data.inform)
        console.log(inform.id)

        wx.request({
            url: CONFIG.API.DELMESSAGES_URL +'/' +inform.id, 
            data: {
                id: inform.id,
            },
            method: 'GET',
            header: {
                'content-type': 'application/json',
                Authorization: "Bearer " + wx.getStorageSync('token')
            },
            success: function(res) {
                console.log(res)
                wx.showModal({
                    title: '温馨提示',
                    content: '确定要删除吗',
                    success: function(res) {
                        if (res.confirm) {
                            wx.showToast({
                                title: "移除成功",
                                icon: "false",
                                duration: 2000
                            });

                            that.data.inform.splice(index, 1);
                            that.setData({
                                inform: that.data.inform
                            });

                            console.log('用户点击确定')
                        }else if (res.cancel) {
                            console.log('用户点击取消')
                        }
                    }
                });               
            }
        })
    }
});

