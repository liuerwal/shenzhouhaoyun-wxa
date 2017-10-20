//index.js
//获取应用实例
var app = getApp()
var P = require('../../page');

P.run({
    data: {
        articles: [],
        hidden: []
    },

    onLoad: function () {

        var that = this
        
        wx.showLoading({
            title: '加载数据...',
            mask: true,
        })

        P.Api.article.list(function(response){
            wx.hideLoading();

            that.setData({
                articles: response
            })
        });
    },

    showContent: function(e){
        var index    = e.currentTarget.dataset.index
        var articles = this.data.articles
        var hidden   = this.data.hidden

        if ( hidden[index] === 1 ){
            hidden[index] = 0
        }else{
            hidden = []
            hidden[index] = 1
        }

        this.setData({
            hidden: hidden
        })
    }
});

