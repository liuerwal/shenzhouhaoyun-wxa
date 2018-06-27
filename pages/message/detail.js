//index.js

var P = require('../../page');

P.run({
    data: {
        informdetail:[],
    },
    onLoad: function(options) {  
        var that = this;
        var id = options.id;

        that.show(id);
    },

    show:function(id){
        var that=this;

        P.Api.message.show(id, function(response){
            that.setData({
                informdetail : response
            })

            if ( !response.is_read ){
                P.Api.message.read(id)
            }
        });

    }
});
