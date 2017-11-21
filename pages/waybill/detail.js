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
        this.customData.id = options.id
        this.loadWaybill();
    },

    loadWaybill: function(){
        var that=this;
        var id = this.customData.id

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

    waybillLoading: function(e){
        var that = this
        var id = e.currentTarget.dataset.waybill

        wx.getLocation({
            type: 'gcj02',
            success: function(location){
                that.waybillStatusChange('loading', id, location)
            },
            fail: function(){
                _.toast('坐标获取失败')
                that.waybillStatusChange('loading', id)
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

        _.loading('提交中...')

        P.Api.waybill[status](id, _.extend(data, extra), function(response){
            that.loadWaybill();
            _.hideLoading()
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

    addrDeliver: function(e){
        var that = this
        var id = e.currentTarget.dataset.addr

        wx.getLocation({
            type: 'gcj02',
            success: function(location){
                that.addrStatusChange('deliver', id, location)
            },
            fail: function(){
                _.toast('坐标获取失败')
                that.addrStatusChange('deliver', id)
            }
        })
    },

    addrArrive: function(e){
        var that = this
        var id = e.currentTarget.dataset.addr

        wx.getLocation({
            type: 'gcj02',
            success: function(location){
                that.addrStatusChange('arrive', id, location)
            },
            fail: function(){
                _.toast('坐标获取失败')
                that.addrStatusChange('arrive', id)
            }
        })
    },

    addrDone: function(e){
        var that = this
        var id = e.currentTarget.dataset.addr

        wx.getLocation({
            type: 'gcj02',
            success: function(location){
                that.addrStatusChange('done', id, location)
            },
            fail: function(){
                _.toast('坐标获取失败')
                that.addrStatusChange('done', id)
            }
        })
    },

    addrStatusChange: function(status, id, location){
        var that = this
        var data = location ? {lat: location.latitude, lng: location.longitude} : {}

        _.loading('提交中...')

        P.Api.order.address[status](id, data, function(response){
            that.loadWaybill();
            _.hideLoading()
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

