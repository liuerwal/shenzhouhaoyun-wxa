var P    = require('../../page')
var Auth = require('../../asset/js/login')
var _    = P._

P.run({
    customData: {
        login: false,
    },

    onLoad: function(options) {
        var that = this

        Auth.login(function(response){
            if ( response ){
                that.switchTab('home')
            }else{
                _.redirectTo('/pages/register/register')
            }
        })

        getApp().globalData('referer', options.referer || 0);
    }
});
