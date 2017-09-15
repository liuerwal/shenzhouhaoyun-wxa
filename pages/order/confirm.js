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

        current_oil: 0,
        current_addr: 0,

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
        var that = this;

        var that = this;  

        console.log('page load');

        this.loadInitData();

    },

    bindOilChange: function(e) {
        var oil_id = this.data.oil_type[e.detail.value].id;
        var weight = this.customData.weight;

        this.customData.oil_id = oil_id;

        this.setData({
            current_oil: e.detail.value
        })

        if ( weight>0 && oil_id>0 ){
            this.countMoney(this.customData.weight, oil_id)
        }
    },
    bindAddressChange: function(e) {
        var address = this.data.addrs[e.detail.value];
        this.customData.addr_id = address.id;
        
        this.setData({
            current_addr: e.detail.value
        })
    },

    //输入金额时计算重量
    oilCost: function(e){
        var that = this;
        var weight = e.detail.value;
        var oil_id = this.customData.oil_id;

        this.customData.weight = weight;

        if ( weight>0 && oil_id>0 ){
            this.countMoney(weight, oil_id)
        }

    },

    formSubmit:function  (e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        var that          = this;
        var note          = e.detail.value.remarks;
        var phone         = e.detail.value.phone;
        var weight        = this.customData.weight;
        var oil_id        = this.customData.oil_id;
        var addr_id       = this.customData.addr_id;
        // var pay_cash      = e.detail.value['radio-group'];
        var expected_time = e.detail.value.time;
        var money         = this.data.cost;

        if ( money<=0 || weight<=0 ){
            _.alert("请填写购买的重量");
            return;
        }

        if ( !oil_id ){
            _.alert("请选择购买的油料种类");
            return;
        }

        if ( ! /[1][0-9]{10}/.test(phone) ){
            _.alert("请填写现场人员电话");
            return;
        }

        if ( ! addr_id ){
            _.alert("请选择送货地址");
            return;
        }

        P.Api.order.confirm({
            'phone'         : phone,
            // 'pay_cash'      : pay_cash,
            'addr_id'       : addr_id,
            "note"          : note,
            'oil_id'        : oil_id,
            'weight'        : weight,
            'expected_time' : expected_time,
            'money'         : money,
        }, function(response){
            _.redirectTo('/pages/order/pay?order='+response)
            _.toast('下单成功')
        })
    },

    //根据重量计算油费
    countMoney: function(weight, oil_id){
        var that = this;

        if ( this.customData.tid ){
            clearTimeout(this.customData.tid)
        }

        this.customData.tid = setTimeout(function(){
            P.Api.order.money(oil_id, weight, function(response){
                that.setData({
                    cost: response
                })
            }, function(){
                that.setData({
                    weight: '',
                    cost: 0
                })
            })
        }, 150)
    },

    loadInitData: function(){
        var that = this;
        
        wx.showLoading({
            title: '加载数据...',
            mask: true,
        })

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

        Promise.all([oil, addr]).then(function(result){

            var oil = result[0], 
            addr = result[1];
            addr.reverse();

            that.setData({
                oil_type: oil,
                addrs: addr,
            })

            if ( oil.length ){
                that.customData.oil_id = oil[0].id;
            }

            if ( addr.length ){
                that.customData.addr_id = addr[0].id;
            }

            wx.hideLoading()
        })
    },

    oiltype: function(){
        var that = this;
        that.setData({
            oil_block: true,
            addr_block: false
        })
    },
    addr: function(){
        var that = this;
        that.setData({
            addr_block: true,
            other_block: false
        })
    },
    add: function(){
        var that = this;
        that.setData({
            add_one: false,
        })
    }

});

