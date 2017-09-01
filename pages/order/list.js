//Order.js

var CONFIG = require('../../asset/js/config');
var util = require('../../asset/js/util');

var P = require('../../page');

P.run( {  
    data: {  
 
        time: ['最近一周', '最近半月', '最近一月'],
        index: 0,
        order:[],
    },  
    component: [
        'comps/tabBar/index',
    ],
    customData: {
        page: 1,
    },
    onLoad: function() {  
        var that = this;  

        this.orders( this.timeRange(7) )

    },

    timeChange: function(e) {
        console.log(e)
        console.log('picker发送选择改变，携带值为', e.detail.value)
        var that = this;
        var index = e.detail.value;

        var range = 0;

        if (index == 0) {
            range = 7;

        } else if (index == 1) {
            range = 15;

        } else {
            range = 30;
        }

        this.setData({
            index: e.detail.value
        })

        that.orders( this.timeRange(range) );
    },

    orders: function(range){

        var that=this;

        P.Api.order.list(range.starttime, range.endtime, 1, function(response){

            that.setData({
                order : response
            })

        });
    },

    timeRange: function(range){
        start = P._.timestamp()
        end = range>0 ? P._.strtotime('-'+range+' day') : 0

        return {starttime: start, endtime: end};
    }
})