
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
    }

});

