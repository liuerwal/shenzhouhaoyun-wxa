//index.js

var P = require('../../page')
var _ = P._

P.run({
    data: {
        region: ['广东省', '广州市', '海珠区'],

        oil_type: [],
        index: 0,
        allcash: '0.00',
        cost: '0',
        weight: 0,
        addrs: [],

        current_oil: {
            id: 0,
            name: '',
            price: 0,
        },
        current_addr: [],

        oil_block: false,
        addr_block: true,
        add_one :true,
        other_block: true,
    },
    customData: {
        tid: null,
    },
    component: [
        'comps/datetimePicker/index',
    ],
    onLoad: function(){

        this.loadInitData()

    },

    bindOilChange: function(e) {
        var oil = this.data.oil_type[e.detail.value]

        this.setCurrentOil(oil)

    },

    oilCost: function(e){
        var weight = e.detail.value;
        var index  = e.currentTarget.dataset.index
        var oil    = this.data.current_oil

        this.setWeights(index, weight)
        this.setCurrentOil(oil)

    },

    formSubmit:function  (e) {
        var that          = this
        var note          = e.detail.value.remarks
        var oil_id        = this.data.current_oil.id
        var weight        = _.array_column(this.data.current_addr, 'weight')
        var addrs         = _.array_column(this.data.current_addr, 'id')
        // var pay_cash      = e.detail.value['radio-group'];
        var expected_time = e.detail.value.time;

        if ( !oil_id ){
            _.alert("请选择购买的油料种类");
            return;
        }

        if ( ! addrs.length ){
            _.alert("请选择送货地址");
            return;
        }

        P.Api.order.confirm({
            // 'pay_cash'      : pay_cash,
            'addrs'         : addrs.join(','),
            "note"          : note,
            'oil_id'        : oil_id,
            'weight'        : weight.join(','),
            'expected_time' : expected_time,
        }, function(response){
            getApp().globalData('order', response)
            _.redirectTo('/pages/order/pay')
            _.toast('下单成功')
        })
    },

    //根据重量计算油费
    countMoney: function(){
        var that   = this
        var weight = this.getTotalWeight()
        var oil    = this.data.current_oil
        var addrs  = _.array_column(this.data.current_addr, 'id')

        if ( this.customData.tid ){
            clearTimeout(this.customData.tid)
        }

        wx.showLoading({
            title: '计算运费...',
            mask: true,
        })

        this.customData.tid = setTimeout(function(){
            P.Api.order.money(oil.id, weight, addrs.join(','), function(response){
                that.setData({
                    amount: response.amount,
                    freight: response.freight,
                    frozen: response.frozen,
                    cost: response.cost,
                })
                wx.hideLoading();
            }, function(){
                that.setData({
                    weight: '',
                    cost: 0
                })
            })
        }, 350)
    },

    loadInitData: function(){
        var that = this;
        
        // wx.showLoading({
        //     title: '加载数据...',
        //     mask: true,
        // })

        var oil = new Promise(function(resolve, reject){
            P.Api.oil.list(function(response){
                resolve(response)
            });
        })

        var addr = new Promise(function(resolve, reject){
            P.Api.address.list(1, function(response){
                resolve(response)
            });
        })

        var price = new Promise(function(resolve, reject){
            P.Api.oil.price(function(response){
                resolve(response)
            });
        })

        Promise.all([oil, addr, price]).then(function(result){

            that.customData.oil   = result[0]
            that.customData.addr  = result[1]
            that.customData.price = result[2]

            that.setData({
                oil_type: that.customData.oil,
                addrs: that.customData.addr,
            })

            that.setCurrentOil(that.customData.oil[0]);

            if ( that.customData.addr.length ){
                that.setCurrentAddrs(that.customData.addr[0]);
            }

            wx.hideLoading()

            getApp().trigger('reLaunch', that)
        })
    },

    showConfirmBlock: function(e){
        var addr = this.data.current_addr

        if ( !addr.length ){
            _.toast('至少设置一个地址')
            return false
        }

        for ( x in addr ){
            var w = addr[x].weight
            if ( isNaN(w) || w<=0 ){
                _.toast('未设置重量')
                return false
            }
        }

        this.countMoney()

        this.setData({
            oil_block: true,
            other_block: false
        })
    },

    newAddr: function(){
        var current_addr = this.data.current_addr
        var current_oil = this.data.current_oil

        getApp().on('reLaunch', function(){
            var first = this.customData.addr[0]
            current_addr.push(first)
            this.setData({
                current_addr: current_addr,
                current_oil: current_oil,
                oil_block: true,
                addr_block: false
            })
        })

        _.navigateTo('/pages/address/add?from=order')
    },

    selectAddr: function(e){
        var index = e.currentTarget.dataset.index
        var addr = this.customData.addr[index]

        this.setCurrentAddrs(addr)
    },

    removeAddr: function(e){
        var index = e.currentTarget.dataset.index
        var current_addr = this.data.current_addr

        current_addr.splice(index, 1)

        this.setData({
            current_addr: current_addr
        })
    },

    setCurrentOil: function(oil){

        this.setData({
            current_oil: {
                id: oil.id,
                name: oil.name,
                price: this.getOilPrice(oil)
            }
        })
    },

    getOilPrice: function(oil){
        var weight = this.getTotalWeight();
        var prices = this.customData.price[oil.id];

        if ( !weight ){
            return prices[0].price
        }

        for( var x in prices ){
            if ( prices[x].lower_limit<weight && prices[x].upper_limit>=weight ){
                return prices[x].price
            }
        }

        return 'NaN';
    },

    getTotalWeight: function(){
        var weights = _.array_column(this.data.current_addr, 'weight')
        return _.array_sum(weights)
    },

    setWeights: function(i, w){
        var addr = this.getCurrentAddrs(i)
        addr.weight = w
        this.setCurrentAddrs(addr, i)
    },

    setCurrentAddrs: function(addr, i){
        var addrs = this.data.current_addr

        for( var x in addrs ){
            if ( addr.id == addrs[x].id ){
                return true;
            }
        }

        if ( isNaN(i) ){
            if ( addrs.length >= 3 ){
                _.toast('最多指定3个地址')
                return false;
            }
            addrs.push(addr)
        }else{
            addrs[i] = addr
        }

        this.setData({
            current_addr: addrs
        })
    },

    getCurrentAddrs: function(i){
        return this.data.current_addr[i] || {}
    }

});

