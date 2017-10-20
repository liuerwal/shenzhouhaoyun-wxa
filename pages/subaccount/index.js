//index.js

var P = require('../../page')
var _ = P._
var Api = P.Api

P.run({
    data: {
        users: []
    },
    customData: {
        page: 1,
        hasMore: true,
    },
    onLoad: function(){

        this.loadSubAccount()
    },

    loadSubAccount: function(){
        var that=this;

        wx.showLoading({
            title: '加载数据...',
            mask: true,
        })

        Api.user.subaccount(this.customData.page, function(response){

            wx.hideLoading()

            if ( !response.length ){
                that.customData.hasMore = false
                _.toast('已经拉到底了')
            }

            that.setData({
                users : response.concat(that.data.users)
            })

            that.customData.page += 1
        });
    },

    onReachBottom: function(){
        if ( this.customData.hasMore ){
            this.loadSubAccount()
        }else{
            _.toast('已经拉到底了')
        }
    },
    
    
});

