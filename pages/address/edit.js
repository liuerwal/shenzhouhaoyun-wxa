//index.js

var CONFIG = require('../../asset/js/config');

var P = require('../../page');

P.run({
    data: {
        winHeight: 0,  
    },
    customData: {
        addr_id : 0,
    }
    onLoad: function(options) {  
        var that = this;

        that.customData.addr_id = options.id;

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
                alias: res.alias,
            }
        })
        }
    })
    },
    formSubmit:function(e){
        var that    =this;
        var lng     = e.detail.value.lng;
        var lat     = e.detail.value.lat;
        var address = e.detail.value.address;
        var alias   = e.detail.value.alias;
        var phone   = e.detail.value.phone;
        var id      = that.customData.addr_id;

        if ( !alias.length ){
            _.toast('请设置地址别名')
            return;
        }
        if ( !address.length ){
            _.toast('请设置详细地址')
            return;
        }
        if ( !lng || !lat ){
            _.toast('请设置地址坐标')
            return;
        }
        if ( !/1[0-9]{10}/.test(phone) ){
            _.toast('请设置收货人员手机')
            return;
        }

        P.Api.address.edit(id, {lng: lng, lat: lat, address: address, alias: alias, phone: phone }, function(res){
            _.toast('修改成功');
            setTimeout(function(){
                _.redirectTo('list')
            }, 1000)
        });
    },
    
});

