var P   = require('../../page')
var api = P.Api
var _   = P._

P.run({
    customData: {
        login: false,
    },

    onLoad: function() {
        var that = this;  
        that.data.user = wx.getStorageSync('userinfo');
    },

    formSubmit:function(e){
        if(e.detail.value.phone.length==0 || e.detail.value.password.length==0 ){
            wx.showToast({
                title: "内容不能为空",
                icon: "false",
                duration: 2000
            });
        }else{
            var that    = this;
            var phone   = e.detail.value.phone;
            var password = e.detail.value.password;

            api.login(phone, password, function(){
                _.toast('登录成功')
                that.switchTab('home')
            });
        }
    },
});
