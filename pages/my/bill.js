//index.js
var CONFIG = require('../../asset/js/config');

var P = require('../../page');

P.run({
    data: {
        bill:[],
    },
    onLoad: function () {
        
        this.bill()
    },
    
    bill:function(){
        var that=this;

        P.Api.user.bill(1, function(response){
            that.setData({
                bill : response
            })
        })
    }
});

