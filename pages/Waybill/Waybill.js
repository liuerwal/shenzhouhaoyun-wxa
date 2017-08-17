//Order.js

var CONFIG = require('../../utils/config');
var util = require('../../utils/util');

Page( {  
    data: {  
        winHeight: 0,   
        time: ['最近一周', '最近半个月', '最近一个月'],
        index: 0,
        order:[],
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
    cycle: function(e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        var that = this;
        var time = e.detail.value;

        var starttime = 0;

        if (time == 0)
        {
            starttime = 7;
        }
        else if (time == 1)
        {
            starttime = 15;
        }
        else
        {
            starttime = 30;
        }

        console.log(starttime)

        this.setData({
            index: e.detail.value
        })

        that.loadlist(starttime);
    },  

    loadlist:function(starttime){

        var that=this;

        wx.request({

            url:  CONFIG.API.WAYBILL_URL , 
            data: {
                'starttime': starttime ,
            },
            method: 'POST', 
            header: {
                "Content-Type":"application/json",
                Authorization: "Bearer " + wx.getStorageSync('token')
            },
            success: function(res){
                console.log(res)
                if ( res.statusCode == 200 ){
                    var order = res.data.data;
                    console.log(order)
                    that.setData({
                        order : order
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
})