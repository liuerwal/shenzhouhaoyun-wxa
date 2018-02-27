
var P = require('../../page')
var _ = P._

P.run({
    data: {
        user: {}
    },

    onLoad: function(){
        var user = _.cache('user')

        this.setData({
            user: user,
        })
    },

    onShow: function(){
        var that = this
        P.Api.user.myself(function(user){
            _.cache('user', user)
            that.setData({
                user: user,
            })
        });
    }

});

