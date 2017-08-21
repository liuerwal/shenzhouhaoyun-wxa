//index.js

var P = require('../../page')
var _ = P._
var Api = P.Api

P.run({
  data: {  
        winHeight: 0,   
        inform:[]
    },
    customData: {
        tabBar: 'message',
    },
    component: [
        'comps/tabBar/index',
    ],
    onLoad: function(options) {  
        var that = this;  

        var id = options.id;
        wx.getSystemInfo( {  

            success: function( res) {  
                that.setData( {  
                    winHeight: res.windowHeight,
                    id :id
                });  
            }  
        });  
        that.addform();
    },  
    addform:function(){
        var that=this;

        Api.message.list(1, function(response){
            console.log(response)
            that.setData({
                inform : response
            })
        });
    },
    remove: function(e){
        var that = this;
        var index = e.currentTarget.dataset.index;
        var inform = that.data.inform[index];
        console.log(index)
        console.log(that.data.inform)
        console.log(inform.id)

        wx.showModal({
            title: '温馨提示',
            content: '确定要删除吗',
            success: function(res) {
                if (res.confirm) {
                    Api.message.destory(inform.id, function(res) {
                        _.toast('移除成功')

                        that.data.inform.splice(index, 1);
                        that.setData({
                            inform: that.data.inform
                        });

                        console.log('用户点击确定')
                    })
                }else if (res.cancel) {
                    console.log('用户点击取消')
                }
            }
        })
    }
});

