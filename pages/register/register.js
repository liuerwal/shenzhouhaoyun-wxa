//index.js

var P   = require('../../page')
var api = P.Api
var _   = P._


P.run({

    formSubmit:function(e){
        var that =this;
        var role   = e.detail.value['radio-group'];
        var phone   = e.detail.value.phone;
        var password = e.detail.value.password;
        var a_pass = e.detail.value.a_pass;
            
        if(phone == 0 || password == 0 || a_pass == 0 ){
             _.toast('内容不能为空')
            return;
        }

        if(password<6){
            _.toast('密码不能小于6位数')
            return;
        }

        if(password != a_pass ){
            _.toast('请密码保持一致')
            return;
        }


        api.register(phone, password, role, function(){
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

