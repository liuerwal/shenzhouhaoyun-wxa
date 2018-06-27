var _ = require('../../asset/js/util');
var Api = require('../../asset/js/api');

module.exports = {
    data: {
        unread: 0,
        tabIcon: []
    },
    customData: {
        tabBar: 'home',
        tabName: [
            'home',
            'message',
            'mine',
        ],
    },
    onLoad: function(){
        this.setTabBar();

        if ( this.customData.tabBar!=='message' ){
            this.newMessage()
        }
    },

    switchTo: function(e){
        var user = _.cache('user')
        var tab = _.isString(e) ? e : e.currentTarget.dataset.tab

        this.switchTab(tab)
    },

    setTabBar: function(){
        var icon = [] , _this = this;


        this.customData.tabName.forEach(function(name){
            icon.push('../../asset/img/'+name+(_this.customData.tabBar==name ? '-a' : '')+'.png');
        });

        this.setData({
            tabIcon: icon
        });
    },

    newMessage: function(){
        var _this = this
        Api.message.unread(function(response){
            _this.setData({
                unread: response
            })
        })
    }
}