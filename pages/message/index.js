//index.js

var P = require('../../page')
var _ = P._
var Api = P.Api

P.run({
  data: {  
        winHeight: 0,   
        messages:[],
    },
    customData: {
        tabBar: 'message',
        hasMore: true,
        page: 1,
    },
    component: [
        'comps/tabBar/index',
    ],
    onLoad: function(options) {

        this.loadMessage();
    },  
    
    loadMessage: function(){
        var that=this;

        wx.showLoading({
            title: '加载数据...',
            mask: true,
        })

        Api.message.list(this.customData.page, function(response){

            wx.hideLoading()

            if ( !response.length ){
                that.customData.hasMore = false
                _.toast('已经拉到底了')
            }

            response = response.map(function(v){
                v.created_at = _.strtotime(v.created_at)
                v.created_at = _.date('m-d', v.created_at)
                return v
            })

            that.setData({
                messages : response.concat(that.data.messages)
            })

            that.customData.page += 1
        });
    },

    onReachBottom: function(){
        if ( this.customData.hasMore ){
            this.loadMessage()
        }else{
            // _.toast('已经拉到底了')
        }
    },

    // remove: function(e){
    //     var that = this;
    //     var index = e.currentTarget.dataset.index;
    //     var inform = that.data.inform[index];
    //     console.log(index)
    //     console.log(that.data.inform)
    //     console.log(inform.id)

    //     _.confirm('确定要删除吗', function(res) {
    //         Api.message.destory(inform.id, function(res) {
    //             _.toast('移除成功')

    //             that.data.inform.splice(index, 1);
    //             that.setData({
    //                 inform: that.data.inform
    //             });
    //         })
    //     })
    // }
});

