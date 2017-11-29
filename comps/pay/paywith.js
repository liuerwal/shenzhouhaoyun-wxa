Component({
    properties: {
        payWithDeposit: {
            type: Boolean,
            value: null,
            observer: '_payWithDeposit'
        },
        payWithBoss: {
            type: Boolean,
            value: false,
            observer: '_payWithBoss'
        },
        default: {
            type: String,
            value: '',
            observer: '_default'
        }
    },
    data: {
        withBoss: false,
        withDeposit: false,
        def: ''
    },
    methods: {
        _payWithBoss: function(payWithBoss){
            this.setData({
                withBoss: payWithBoss
            })
        },

        _payWithDeposit: function(payWithDeposit){
            this.setData({
                withDeposit: payWithDeposit
            })
        },

        _default: function(def){
            console.log(def)
            this.setData({
                def: def
            })

            this.triggerEvent('change', {
                paywith: def
            })
        },

        _change: function(e){
            var paywith = e.currentTarget.dataset.paywith

            this.triggerEvent('change', {
                paywith: paywith
            })
        }
       
    },

})