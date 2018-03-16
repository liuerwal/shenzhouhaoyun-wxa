//index.js

var P = require('../../page')
var _ = P._

P.run({
    data: {
        region: ['广东省', '广州市', '海珠区'],

        oil_type: [],
        choosetime :[],
        index: 0,
        ct: 3,
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

        showModalStatus: false
    },
    customData: {
        tid: null,
    },
    component: [
        'comps/datetimePicker/index',
    ],
    onLoad: function(){

    },

    onShow: function(){
        this.loadInitData()
    },

    returnorder: function(){
        this.setData({
            oil_block: false,
            other_block: true
        })
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
    datatime :function(e){
        var that = this
        console.log('picker发送选择改变，携带值为', e.detail.value)
        that.setData({
            ct :  e.detail.value
        }) 
    },

    formSubmit:function  (e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        var that   = this
        var note   = e.detail.value.remarks
        var oil_id = this.data.current_oil.id
        var weight = _.array_column(this.data.current_addr, 'weight')
        var addrs  = _.array_column(this.data.current_addr, 'id')
        var time   = this.data.ct===null ? '' : this.data.choosetime[this.data.ct]
        
        if ( time ){
            time = _.date('Y-m-d H:i:s', _.strtotime('+'+time+' hours'))
        }

        if ( !oil_id ){
            _.alert("请选择购买的油料种类");
            return;
        }

        if ( ! addrs.length ){
            _.alert("请选择送货地址");
            return;
        }

        if ( ! weight ){
            _.alert("请设置重量");
            return;
        }

        P.Api.order.confirm({
            'addrs'         : addrs.join(','),
            "note"          : note,
            'oil_id'        : oil_id,
            'weight'        : weight.join(','),
            'expected_time' : time,
        }, function(response){
            _.navigateTo('/pages/order/pay?order='+response.order.id)
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
                    allweight: weight,
                    oil_block: true,
                    other_block: false
                })
                wx.hideLoading();
            }, function(){
                that.setData({
                    weight: '',
                    cost: 0,
                })
            })
        }, 350)
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

        var price = new Promise(function(resolve, reject){
            P.Api.oil.price(function(response){
                resolve(response)
            });
        })

        var time = new Promise(function(resolve, reject){
            P.Api.order.choosetime(function(response){
                resolve(response)
            });
        })

        Promise.all([oil, addr, price ,time]).then(function(result){
            console.log(that.customData)

            that.customData.oil   = result[0]
            that.customData.addr  = result[1]
            that.customData.price = result[2]
            that.customData.time  = result[3].time

            that.setData({
                oil_type: that.customData.oil,
                addrs: that.customData.addr,
                choosetime :that.customData.time,
            })

            that.setCurrentOil(that.customData.oil[0]);

            if ( that.customData.addr.length ){
                that.setCurrentAddrs(that.customData.addr[0]);
            }

            wx.hideLoading()

            getApp().trigger('reLaunch', that)
        })

        this.checkTicket()
    },

    showConfirmBlock: function(e){
        var that = this
        var addr = this.data.current_addr

        if ( !addr.length ){
            _.mytoast('至少设置一个地址')
            return false
        }

        for ( var x in addr ){
            var w = addr[x].weight
            if ( isNaN(w) || w<=0 ){
                _.mytoast('未设置重量')
                return false
            }
        }

        this.countMoney()

        
    },

    newAddr: function(){
        var current_addr = this.data.current_addr
        var current_oil = this.data.current_oil

        getApp().on('reLaunch', function(){
            var first = this.customData.addr[0]
            current_addr = [first]
            this.setData({
                current_addr: current_addr,
                current_oil: current_oil,
                oil_block: false,
                other_block: true
            })
        })

        _.navigateTo('/pages/address/add?from=order')
    },

    selectAddr: function(e){
        var index = e.currentTarget.dataset.index
        var addr = this.customData.addr[index]

        this.setCurrentAddrs(addr)

        this.setData({
            showModalStatus: false  
        })
        
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
        var i = 0;//改为只能有一个地址
        var addrs = this.data.current_addr

        for( var x in addrs ){
            if ( addr.id == addrs[x].id ){
                return true;
            }
        }

        if ( isNaN(i) ){
            if ( addrs.length >= 1 ){
                _.mytoast('只能选择1个地址')
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
    },

    checkTicket: function(){
        P.Api.order.ticket(function(response){
            if ( response ){
                getApp().globalData('ticket', response)
                _.alert('您上次的订单超时，需支付超时费用', function(){
                    _.redirectTo('/pages/order/payticket')
                })
            }
        })
    },
    powerDrawer: function (e) { 
        var addr = this.data.current_addr
        console.log(addr)
        if (!addr.length ){
            _.mytoast('还没有地址，去新增地址吧')

        }
        else{
            var currentStatu = e.currentTarget.dataset.statu;  
            this.util(currentStatu)   
     }

 },  
 util: function(currentStatu){  
    /* 动画部分 */  
    // 第1步：创建动画实例   
    var animation = wx.createAnimation({  
        duration: 100,  //动画时长  
        timingFunction: "ease",  
        delay: 0  //0则不延迟  
    });  

    // 第2步：这个动画实例赋给当前的动画实例  
    this.animation = animation;  

    // 第3步：执行第一组动画：Y轴偏移240px后(盒子高度是240px)，停  
    animation.translateY(240).step();  

    // 第4步：导出动画对象赋给数据对象储存  
    this.setData({  
        animationData: animation.export()  
    })  

    // 第5步：设置定时器到指定时候后，执行第二组动画  
    setTimeout(function () {  
        // 执行第二组动画：Y轴不偏移，停  
        animation.translateY(0).step()  
        // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象  
        this.setData({  
            animationData: animation  
        });  
        
        //关闭抽屉  
        if (currentStatu == "close") {  
            this.setData(  
            {  
                showModalStatus: false  
            }  
            );  
        }  
    }.bind(this), 200)  
    
    // 显示抽屉  
    if (currentStatu == "open") {  
      this.setData(  
      {  
          showModalStatus: true  
      }  
      );  
  }  
}  

});

