var P = require('../../page')
var _ = P._

P.run({
    data: {
        bill:[],
    },
    customData: {
        hasMore: true,
        page: 1,
    },
    onLoad: function () {
        
        this.loadBill()
    },

    loadBill: function(){
        var that=this;

        wx.showLoading({
            title: '加载数据...',
            mask: true,
        })

        P.Api.user.bill(this.customData.page, function(response){

            wx.hideLoading()

            if ( !response.length ){
                that.customData.hasMore = false
                _.toast('已经拉到底了')
            }

            // response = response.map(function(v){
            //     v.created_at = _.strtotime(v.created_at)
            //     v.created_at = _.date('m-d', v.created_at)
            //     return v
            // })

            that.setData({
                bill : response.concat(that.data.bill)
            })

            that.customData.page += 1
        });
    },

    onReachBottom: function(){
        if ( this.customData.hasMore ){
            this.loadBill()
        }else{
            // _.toast('已经拉到底了')
        }
    },

    show: function(e){
        var index = e.currentTarget.dataset.index
        var bill = this.data.bill[index]

        getApp().globalData('bill', bill)
        _.navigateTo('/pages/my/bill_detail')
    }
});

