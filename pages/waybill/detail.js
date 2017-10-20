//Order details.js

var CONFIG = require('../../asset/js/config');

var P = require('../../page');
var _ = P._

P.run({
    data: {
        waybill: null,
        mask: true,
    },
    customData: {
        status: {
            arrive: 3,
            done: 4
        }
    },
    onLoad: function(options) {  
        var that = this;
        var id = options.id;

        wx.getSystemInfo( {  

            success: function( res ) {  
                that.setData( { 
                    id:id, 
                });  
            }
        });   

        that.waybill();
    },

    waybill: function(e){
        var that=this;

        var id = that.data.id

        P.Api.waybill.show(id, function(response){

            that.setData({
                waybill : response
            })

        });

    },

    showLocatioin: function(e){
        var lat = e.currentTarget.dataset.lat*1
        var lng = e.currentTarget.dataset.lng*1

        wx.openLocation({
            latitude: lat,
            longitude: lng,
            scale: 28
        })
    },

    waybillPickup: function(e){
        var that = this
        var id = e.currentTarget.dataset.waybill

        wx.getLocation({
            type: 'gcj02',
            success: function(location){
                that.waybillStatusChange('pickup', id, location)
            },
            fail: function(){
                _.toast('坐标获取失败')
                that.waybillStatusChange('pickup', id)
            }
        })
    },

    waybillDeliver: function(e){
        var that = this
        var id = e.currentTarget.dataset.waybill

        wx.getLocation({
            type: 'gcj02',
            success: function(location){
                that.waybillStatusChange('deliver', id, location)
            },
            fail: function(){
                _.toast('坐标获取失败')
                that.waybillStatusChange('deliver', id)
            }
        })
    },

    waybillStatusChange: function(status, id, location, extra){
        var that = this
        var data = location ? {lat: location.latitude, lng: location.longitude} : {}

        P.Api.waybill[status](id, _.extend(data, extra), function(response){
            
            that.waybill();
        })
    },

    waybillCancel: function(e){
        var that = this
        var radio = e.detail.value.reason_radio
        var text = e.detail.value.reason_text
        var id = this.data.waybill.id

        if ( !radio && !text ){
            return;
        }

        that.closeCancelBox()

        var reason = text ? text : radio

        wx.getLocation({
            type: 'gcj02',
            success: function(location){
                that.waybillStatusChange('cancel', id, location, {remark: reason})
            },
            fail: function(){
                _.toast('坐标获取失败')
                that.waybillStatusChange('cancel', id, null, {remark: reason})
            }
        })
    },

    orderArrive: function(e){
        var that = this
        var id = e.currentTarget.dataset.order

        wx.getLocation({
            type: 'gcj02',
            success: function(location){
                that.orderStatusChange('arrive', id, location)
            },
            fail: function(){
                _.toast('坐标获取失败')
                that.orderStatusChange('arrive', id)
            }
        })
    },

    orderDone: function(e){
        var that = this
        var id = e.currentTarget.dataset.order

        wx.getLocation({
            type: 'gcj02',
            success: function(location){
                that.orderStatusChange('done', id, location)
            },
            fail: function(){
                _.toast('坐标获取失败')
                that.orderStatusChange('done', id)
            }
        })
    },

    orderStatusChange: function(status, id, location){
        var that = this
        var data = location ? {lat: location.latitude, lng: location.longitude} : {}

        P.Api.order[status](id, data, function(response){
            that.waybill();
        })
    },

    showCancelBox: function(){
        this.setData({
            mask: false,
        })
    },
    closeCancelBox: function(){
        this.setData({
            mask: true,
        })
    }
});

