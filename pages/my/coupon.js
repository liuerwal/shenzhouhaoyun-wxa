var P = require('../../page')
var _ = P._

P.run({
    data: {  
        coupons: []
    },
    customData: {
        page: 1,
        hasMore: true,
    },
    onLoad: function () {
            
        this.loadCoupon()
    },
    
    loadCoupon:function(){
        var that = this

        wx.showLoading({
            title: '加载数据...',
            mask: true,
        })

        P.Api.user.coupon(this.customData.page, function(response){

            wx.hideLoading()

            if ( !response.length ){
                that.customData.hasMore = false
                _.toast('已经拉到底了')
            }

            response = response.map(function(v){
                v.limit = that.endtimeHandler(v.endtime)
                return v
            })

            that.setData({
                coupons : that.data.coupons.concat(response)
            })

            that.customData.page += 1
        });
    },

    onReachBottom: function(){
        if ( this.customData.hasMore ){
            this.loadCoupon()
        }else{
            // _.toast('已经拉到底了')
        }
    },

    endtimeHandler: function(endtime){
        var time = _.strtotime(endtime)
        var now = _.strtotime('now')
        var dt = time-now
        if ( dt > 0 ){
            if ( dt/86400 > 1 ){
                return '还有'+ Math.floor(dt/86400) +'天过期'
            }
            if ( dt/86400 > 0 ){
                return '明天即将过期'
            }
            return '今天'+ _.date('H:i', time) +'过期';
        }else{
            return '已过期'
        }
    }
});