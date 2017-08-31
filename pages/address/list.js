//index.js

var CONFIG = require('../../asset/js/config');

var P = require('../../page');
var _ = P._

P.run({
    data: {  
        address:[]
    },  
    onLoad: function(options) {  
        var that = this;  

        var id = options.id;
        wx.getSystemInfo( {  

            success: function( res) {  
                that.setData( {  
                    id :id
                });  
            }  
        });  
        that.addresslist();
    },  

    addresslist:function(){
        var that=this;

        P.Api.address.list(1, function(response){
            that.setData({
                address : response
            })
        });
    },

    deladdress:function(e){
        var that    = this
        var id      = e.currentTarget.dataset.id
        var index   = e.currentTarget.dataset.index
        var address = that.data.address[index]

        wx.showModal({
            title: '温馨提示',
            content: '确定要删除吗',
            success: function(res) {
                if (res.confirm) {
                    P.Api.address.destory(id, function(res) {
                        _.toast('删除成功')

                        that.data.address.splice(index, 1);
                        that.setData({
                            address: that.data.address
                        })
                    })
                }
            }
        });
    }
});

