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
        var tab = e.currentTarget.dataset.tab

        if ( tab === 'mine' ){
            _.redirectTo('/pages/mine/index')

        }else if ( tab === 'message' ){
            _.redirectTo('/pages/message/index')

        }else if ( tab === 'home' ){
            if ( user.role == 'buyer' ){
                _.redirectTo('/pages/order/index')

            }else if( user.role == 'driver'){
                _.redirectTo('/pages/order/list')
            }
        }
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