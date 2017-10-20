var P = require('../../page')
var _ = P._

P.run({
    data: {
        order: null,
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

        that.order();
    },

    order:function(e){
        var that=this;

        var id = that.data.id

        P.Api.order.show(id, function(response){

            that.setData({
                order : response
            })

        });

    },

    orderCancel: function(e){
        var that=this;

        var id = that.data.id
        
        if ( this.data.order.order_oil.status > 0 ){
            var message = '订单已在受理中，取消订单将扣除一定的费用，您确定取消此订单吗？'
        }else{
            var message = '您确定要取消此订单吗？'
        }

        _.confirm(message, function(){
            P.Api.order.cancel(id, function(response){
                _.toast('订单已取消')
                setTimeout(function(){
                    wx.navigateBack()
                }, 1500)
            });
        })
    }
});

