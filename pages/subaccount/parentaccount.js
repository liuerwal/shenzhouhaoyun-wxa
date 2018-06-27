

//index.js

var P = require('../../page')
var _ = P._
var Api = P.Api

P.run({
    data: {
        parent: null
    },
    customData: {
        parent: null,
        new_parent: null,
        model: 'none',
    },
    onLoad: function(options){

        if ( options.parent ){
            this.customData.parent = options.parent
        }

    },

    onShow: function(){

        var user = _.cache('user')

        if (this.customData.parent>0){
            if (user.parent_id>0){
                console.log('1')
                this.showChangeParent(user.parent_id, this.customData.parent)
            }else{
                console.log('2')
                this.showSetParent(this.customData.parent)
            }
        }else{
            if ( user.parent_id>0 ){
                console.log('3')
                this.showParent(user.parent_id)
            }else{
                console.log('4')
                this.showNoneParent()
            }
        }

    },

    showSetParent: function(parent_id){
        var that = this
        P.Api.user.show(parent_id, function(parent){
            that.setData({
                model: 'set',
                parent: parent,
            })
        })
    },

    showChangeParent: function(parent_id, new_parent_id){
        var that = this
        P.Api.user.show(parent_id, function(parent){
            P.Api.user.show(new_parent_id, function(new_parent){
                that.setData({
                    model: 'change',
                    parent: parent,
                    new_parent: new_parent
                })
            })
        })
    },

    showNoneParent: function(){
        this.setData({
            model: 'none',
            parent: {
                username: '暂无',
                avatar: '../../asset/img/avatar.png'
            }
        })
    },

    showParent: function(parent_id){
        var that = this
        P.Api.user.show(parent_id, function(response){
            that.setData({
                model: 'parent',
                parent: response
            })
        })
    },

    scanCode: function(){
        var that = this
        wx.scanCode({
            success: (res) => {
                var url = res.result
                var match = url.match(/(parent=(\d+))/)
                if ( match && match[2] ){
                    that.showSetParent(match[2])
                }
            }
        })

    },

    //解除关联
    removeParent: function(e){
        var user = _.cache('user')
        var that = this

        _.alert('取消关联后，您将不能再使用老板支付', function(){
            P.Api.user.removeSubaccount(user.id, function(response){
                _.toast('已取消关联')
                setTimeout(function(){
                    that.showNoneParent()
                }, 1000)
            })
        })
    },


    //确认关联
    changeParent: function(e){
        var parent_id = e.currentTarget.dataset.id
        var that = this

        P.Api.user.confirmSubaccount(parent_id, function(response){
            _.toast('已成功关联')
            setTimeout(function(){
                that.showParent(parent_id)
            }, 1000)
        })
    },

    back: function(){
        _.navigateTo('index')
    }

    
});

