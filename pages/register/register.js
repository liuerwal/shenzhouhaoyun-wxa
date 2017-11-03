//index.js

var P   = require('../../page')
var api = P.Api
var _   = P._


P.run({

    customData: {
        login: false,
        parent: 0,
        phone: '',
    },

    data: {
        parent: 0,
        phone: '',
        disabled: 'false'
    },

    onLoad: function(options){

        if ( options.parent ){
            this.setData({
                parent: options.parent,
                phone: options.phone,
                disabled: options.parent ? 'true' : 'false',
            })
        }
    },

    formSubmit:function(e){
        var that     =this;
        var role     = e.detail.value['radio-group'];
        var phone    = e.detail.value.phone;
        var password = e.detail.value.password;
        var a_pass   = e.detail.value.a_pass;
        var parent   = this.data.parent
        var code     = e.detail.value.code
            
        if(phone == 0 || password == 0 || a_pass == 0 ){
             _.toast('内容不能为空')
            return;
        }

        if(password<6){
            _.toast('密码不能小于6位数')
            return;
        }

        if(password != a_pass ){
            _.toast('两次密码不一致')
            return;
        }


        api.register({
            phone: phone,
            password: password,
            role: role,
            parent: parent,
            code: code,
        }, function(){
            if(role == "driver"){
                _.toast('注册成功')
                that.switchTab('home')
            }else{
                wx.reLaunch({
                    url: '/pages/order/index'
                });  
            }
        }); 
    },

    phone: function(e){

        this.customData.phone = e.detail.value

        if ( this.customData.phone.length == 11 ){
            P.Api.auth.phone(this.customData.phone)
        }

    },
    
    getcode:function(){
        P.Api.verifyCode(this.customData.phone)
    },

});

