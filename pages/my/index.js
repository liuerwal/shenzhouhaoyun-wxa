//my.js
var P = require('../../page');

P.run({
    data: {  
        winHeight: 0,
        user: {}
    },
    component: [
        'comps/tabBar/index',
    ],
    customData: {
        tabBar: 'mine'
    },
    onLoad: function() {  
        var that = this;

        P.Api.user.myself(function(data){
            that.setData({
                user: data,
            })
        });

        wx.getSystemInfo( {  

            success: function( res ) {  
                that.setData( {  
                    winHeight: res.windowHeight  
              });  
            }
        });  
    },  
});