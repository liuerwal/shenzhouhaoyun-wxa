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
        weight: '',
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
        other_block: true
    },
    customData: {
        oil_id: 0,
        weight: 0,
        tid: null,
        addr_id: 0,
    },
    component: [
        'comps/datetimePicker/index',
    ],
    onLoad: function(){

        this.loadInitData()

    },

    bindOilChange: function(e) {
        var oil = this.data.oil_type[e.detail.value]
        var weight = this.customData.weight

        this.customData.oil_id = oil.id

        this.setSelectedOil(oil, weight)
    },

    //输入金额时计算重量
    oilCost: function(e){
        var that = this;
        var weight = e.detail.value;
        var oil = this.data.current_oil;

        this.customData.weight = weight;


        this.setSelectedOil(oil, weight)

    },

    formSubmit:function  (e) {
        var that          = this;
        var note          = e.detail.value.remarks;
        var weight        = this.customData.weight;
        var oil_id        = this.data.current_oil.id;
        var addrs         = _.array_column(this.data.current_addr, 'id');
        // var pay_cash      = e.detail.value['radio-group'];
        var expected_time = e.detail.value.time;

        if ( weight<=0 ){
            _.alert("请填写购买的重量");
            return;
        }

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
            'addrs[]'       : addrs,
            "note"          : note,
            'oil_id'        : oil_id,
            'weight'        : weight,
            'expected_time' : expected_time,
        }, function(response){
            getApp().globalData('order', response)
            _.redirectTo('/pages/order/pay')
            _.toast('下单成功')
        })
    },

    //根据重量计算油费
    countMoney: function(weight, oil){
        var that = this
        var weight = this.customData.weight
        var oil = this.data.current_oil
        var addrs = _.array_column(this.data.current_addr, 'id')

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

            that.setSelectedOil(that.customData.oil[0]);

            if ( that.customData.addr.length ){
                that.setSelectedAddr(that.customData.addr[0]);
            }

            if ( oil.length ){
                that.customData.oil_id = oil[0].id
            }

            if ( addr.length ){
                that.customData.addr_id = addr[0].id
            }

            wx.hideLoading()

            getApp().trigger('reLaunch', that)
        })
    },

    showAddrBlock: function(){
        var weight = this.customData.weight;

        if(weight == 0){
            _.toast('请填写重量')
            return false;
        }

        this.setData({
            oil_block: true,
            addr_block: false
        })
    },

    showConfirmBlock: function(e){
        var addr = this.data.current_addr
        var weight = this.customData.weight

        if ( !addr.length ){
            _.toast('至少设置一个地址')
            return false;
        }

        this.countMoney()

        this.setData({
            addr_block: true,
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

        this.setSelectedAddr(addr)
    },

    removeAddr: function(e){
        var index = e.currentTarget.dataset.index
        var current_addr = this.data.current_addr

        current_addr.splice(index, 1)

        this.setData({
            current_addr: current_addr
        })
    },

    setSelectedAddr: function(addr){
        var current_addr = this.data.current_addr;

        if ( current_addr.length >= 3 ){
            _.toast('最多指定3个地址')
            return false;
        }

        for( x in current_addr ){
            if ( addr.id == current_addr[x].id ){
                return true;
            }
        }

        current_addr.push(addr)

        this.setData({
            current_addr: current_addr,
        })

    },

    setSelectedOil: function(oil, weight){

        this.setData({
            current_oil: {
                id: oil.id,
                name: oil.name,
                price: this.getOilPrice(oil, weight)
            }
        })
    },

    getOilPrice: function(oil, weight){
        var weight = weight || 0;
        var prices = this.customData.price[oil.id];

        if ( !weight ){
            console.log(prices[0])
            return prices[0].price
        }

        for( x in prices ){
            if ( prices[x].lower_limit<weight && prices[x].upper_limit>=weight ){
                return prices[x].price
            }
        }

        return 'NaN';
    }

});

