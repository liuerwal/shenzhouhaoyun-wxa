//index.js

var P   = require('../../page')
var api = P.Api
var _   = P._


P.run({

    data: {
        parent: null,
    },

    onLoad: function(options){
        options.parent = 1;
        options.phone = 18692258343;
        this.customData.parent = options.parent
        this.customData.phone = options.phone

        if ( this.customData.parent ){
            this.setData({
                parent: this.customData.parent,
                phone: this.customData.phone,
                disabled: this.customData.parent ? 'true' : 'false',
            })
        }
    },

    formSubmit:function(e){
        var that     =this;
        var role     = e.detail.value['radio-group'];
        var phone    = e.detail.value.phone;
        var password = e.detail.value.password;
        var a_pass   = e.detail.value.a_pass;
        var parent   = this.customData.parent
            
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
    
    getcode:function(){

    },

    
    

});

