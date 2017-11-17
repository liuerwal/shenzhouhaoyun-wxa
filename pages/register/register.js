//index.js

var P   = require('../../page')
var api = P.Api
var _   = P._


P.run({

    customData: {
        login: false,
        parent: 0,
        phone: '',

        countdown: false,
    },

    data: {
        parent: 0,
        phone: '',
        disabled: false,

        VerifyCode:"发送验证码"
    },

    onLoad: function(options){
        console.log(111)
        console.log(options)


        if ( options.q ){
            // var url = decodeURI(options.q)
            var url = decodeURIComponent(options.q)
            var params = this.parseUrl(url)
            console.log(params)

            this.customData.phone = params.phone

            this.setData({
                parent: params.parent,
                phone: params.phone,
                disabled: params.parent ? true : false,
            })
        }
    },

    formSubmit:function(e){
        var that     = this;
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
        if( this.customData.phone.length != 11){
            return;
        }

        if ( this.customData.countdown === false ){
            console.log('count down')
            this.customData.countdown = true

            var total_micro_second = 60 * 1000;
            //验证码倒计时
            count_down(this, total_micro_second);

            P.Api.verifyCode(this.customData.phone)
        }
    },

    parseUrl: function(url){
        var url = url.split('?')
        var query = url[1].split('&')
        var params = []

        for( var x in query ){
            var t = query[x].split('=')
            params[t[0]] = t[1]
        }

        return params
    }

});


    //毫秒级倒计时 
    function count_down(that, total_micro_second) {
        if (total_micro_second <= 0) {
            that.setData({
                VerifyCode: "重新发送"
            });
            // timeout则跳出递归
            
            that.customData.countdown = true
            return;
        }

        // 渲染倒计时时钟
        that.setData({
            VerifyCode: date_format(total_micro_second) + " 秒"
        });

        setTimeout(function () {
            total_micro_second -= 10;
            count_down(that, total_micro_second);
        }, 10)
    }

    // 时间格式化输出，如03:25:19 86。每10ms都会调用一次
    function date_format(micro_second) {
        // 秒数
        var second = Math.floor(micro_second / 1000);
        // 小时位
        var hr = Math.floor(second / 3600);
        // 分钟位
        var min = fill_zero_prefix(Math.floor((second - hr * 3600) / 60));
        // 秒位
        var sec = fill_zero_prefix((second - hr * 3600 - min * 60));// equal to => var sec = second % 60;
        // 毫秒位，保留2位
        var micro_sec = fill_zero_prefix(Math.floor((micro_second % 1000) / 10));
        return sec;
    }
    
    // 位数不足补零
    function fill_zero_prefix(num) {
      return num < 10 ? "0" + num : num
    }
