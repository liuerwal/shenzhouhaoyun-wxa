//index.js
//获取应用实例
var app = getApp()
var P = require('../../page');

P.run({

    component: [
        'comps/tabBar/index',
    ],
    data: {
        user: {},
        items: [
            {name: 'USA', value: '美国', checked: 'true'},
            {name: 'CHN', value: '中国'},
            {name: 'BRA', value: '巴西'},
        ]
    },
    onLoad: function () {
        console.log('onLoad')
        var that = this

        var user = P._.cache('user')

        that.setData({
            user: user
        })
    },
});

