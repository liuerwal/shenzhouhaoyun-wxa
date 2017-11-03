//index.js
var CONFIG = require('../../asset/js/config');

var P = require('../../page');

P.run({
    data: {
        bill:[],
    },
    onLoad: function() {
        var bill = getApp().globalData('bill')

        this.setData({
            bill: bill
        })
    },
    
   
});

