//index.js

var P = require('../../page');

P.run({
    data: {
        informdetail:[],
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

        that.show();
    },

    show:function(e){
        var that=this;
        var id = that.data.id

        P.Api.message.show(id, function(response){
            that.setData({
                informdetail : response
            })
            console.log("成功")
        });

    }
});
