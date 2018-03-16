//my.js
var P = require('../../page');

P.run({
    data: {  
        user: {}
    },
    component: [
        'comps/tabBar/index',
    ],
    customData: {
        tabBar: 'mine',
    },
    onLoad: function() {  

          
    },

    onShow: function(){
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
    },

    showNotice: function(){
        P._.mytoast('开票系统正在完善当中，目前需开发票请联系人工客服')
    }
});