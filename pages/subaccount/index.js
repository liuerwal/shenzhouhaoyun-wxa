

//index.js

var P = require('../../page')
var _ = P._
var Api = P.Api

P.run({
    data: {
        user: null
    },
    onLoad: function(options){

    },

    onShow: function(){
        var user = _.cache('user')

        this.setData({
            user: user
        })
    },

    redirectToSub: function(){

        if ( this.data.user.parent_id > 0 ){
            _.mytoast('您已关联老板账号，不能添加子账号')
            return;
        }

        _.navigateTo('subaccount')

    },

    redirectToParent: function(){

        if ( this.data.user.subaccount_count > 0 ){
            _.mytoast('您已关联多个子账号，不能添加老板账号')
        }

        _.navigateTo('parentaccount')
    },

    
});

