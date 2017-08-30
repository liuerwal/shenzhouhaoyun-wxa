var _ = require('../../asset/js/util');

module.exports = {
    data: {
        
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

        console.log('tab bar');

        this.setTabBar();

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
    }
}