//Order details.js

var CONFIG = require('../../asset/js/config');

var P = require('../../page');

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

    }
});

