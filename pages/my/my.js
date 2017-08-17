//my.js

var app = getApp()
var P = require('../../page');

P.run({
    data: {  
        winHeight: 0,   
    },  
    onLoad: function() {  
        var that = this;  
        wx.getSystemInfo( {  

          success: function( res ) {  
            that.setData( {  
                winHeight: res.windowHeight  
          });  
        }
    });  
    },  
});

