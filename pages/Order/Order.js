//index.js
var CONFIG = require('../../utils/config');

Page({
    data: {
        region: ['广东省', '广州市', '海珠区'],
        date: '2016-09-01',
        winHeight: 0,  

        oil_type: ['菜油', '中国', '巴西', '日本'],
        objectArray: [
        {
            id: 0,
            name: '美国'
        },
        {
            id: 1,
            name: '中国'
        },
        {
            id: 2,
            name: '巴西'
        },
        {
            id: 3,
            name: '日本'
        }
        ],
        index: 0,
        allcash: '0.00',

    },
    bindRegionChange:function(e){
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            region: e.detail.value
        })
    },
    bindDateChange: function(e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            date: e.detail.value
        })
    },
    Oiltype: function(e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            index: e.detail.value
        })
    },
    oilcash: function(e) {
        this.setData({
            allcash: e.detail.value
        })
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
    formSubmit:function  (e) {
        var that    = this;
        var phone   = e.detail.value.phone;
        var addr_id = e.detail.value.address;
        var note = e.detail.value.remarks;
        var money = e.detail.value.oilcash;
        var expected_time = e.detail.value.time;
        var oil_id = e.detail.value.oil_type;
        var pay_cash =  e.detail.value['radio-group'];

        console.log('form发生了submit事件，携带数据为：', e.detail.value);
        if(phone.length==0 || addr_id.length==0 || expected_time.length==0 ){
            wx.showToast({
                title: "内容不能为空",
                icon: "false",
                duration: 2000
            });
        }else{
            wx.request({
                url: CONFIG.API.ORDER_URL ,
                data: {
                    'phone': phone,
                    'pay_cash': pay_cash,
                    'expected_time':expected_time,
                    'addr_id':addr_id,
                    "note":note,
                    'oil_id':22,
                    'weight':222,
                    'money':money,

                },
                method: 'POST', 
                header: {
                    "Content-Type":"application/x-www-form-urlencoded",
                    Authorization: "Bearer" + wx.getStorageSync('token')
                },
                success:function(res){
                    console.log(res)
                    if ( res.statusCode == 200 ){
                        console.log("成功")

                    }else{
                        // wx.showModal({
                        //     title: '提示',
                        //     content: res.data.msg,
                        // });
                    }
                }
            })
        }
    },
});

