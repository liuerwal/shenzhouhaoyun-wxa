//index.js
var CONFIG = require('../../asset/js/config');

var P = require('../../page');

P.run({
    data: {
        winHeight: 0,  
    },
    formSubmit: function(e) {
        var that =this;
        console.log('form发生了submit事件，携带数据为：', e.detail.value.cai);
        var radio   = e.detail.value['radio-group'];
        if(radio = "cai"){
            console.log(radio)
            
            that.switchTab('home')
        }else{
            console.log(aa)
            wx.reLaunch({
                url: '/pages/all-Order/all-Order'
            });
        }
    
    },
    
    // formSubmit:function  (e) {
    //     console.log('form发生了submit事件，携带数据为：', e.detail.value);
    //     if(e.detail.value.phone.length==0 || e.detail.value.password.length==0 || e.detail.value.a_pass.length==0 || e.detail.value.code.length==0 ){
    //         wx.showToast({
    //             title: "内容不能为空",
    //             icon: "false",
    //             duration: 2000
    //         });
    //     }else{
    //         var that    = this;
    //         var phone   = e.detail.value.phone;
    //         var password = e.detail.value.password;
    //         var code = e.detail.value.code;
    //         var role =  e.detail.value['radio-group'];

    //         wx.request({
    //             url: CONFIG.API.LOGIN_URL ,
    //             data: {
    //                 'phone': phone,
    //                 'password': password,
    //                 'code': code,
    //                 'role': role,
    //             },
    //             method: 'POST', 
    //             header: {
    //                 "Content-Type":"application/x-www-form-urlencoded",
    //                 Authorization: "Bearer" + wx.getStorageSync('token')
    //             },
    //             success:function(res){
    //                 console.log(res)
    //                 if ( res.statusCode == 200 ){
    //                     console.log("成功")
    //                     wx.setStorageSync('phone' , phone);

    //                 }else{
    //                     wx.showModal({
    //                         title: '提示',
    //                         content: res.data.msg,
    //                     });
    //                 }
    //             }
    //         })
    //     }
    // },
    getcode:function(){

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
    
    

});

