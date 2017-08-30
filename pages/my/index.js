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
        tabBar: 'mine',
    },
    onLoad: function() {  
        var that = this;

        P.Api.user.myself(function(user){
            
            if ( user.checked==1 ){
                user.checked = '已审核'
            }else if ( user.checked==0 ){
                user.checked = '未审核'
            }else{
                user.checked = '未通过'
            }

            that.setData({
                user: user,
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