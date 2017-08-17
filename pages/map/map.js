//index.js
//获取应用实例
var app = getApp()
Page( {

    data: {
//默认未获取地址
hasLocation: false
},
onload:function(e){
var that= this;
that.getLocation();
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
                    name: res.name,
                }
            })
        }
    })
},
aa:function(e){
    var that=this;
    type: 'wgs84',
    wx.getLocation({
        success:function(res){
            console.log(res);
            that.setData( {
                location: {
                    longitude: res.longitude,
                    latitude: res.latitude,
                    address: res.address,
                    name: res.name,
                }
            })
        }
    })
},
})
