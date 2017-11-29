Component({
    properties: {
        title: {
            type: String,
            value: null,
            observer: '_setTitle'
        },
        amount: {
            type: Number,
            value: null,
            observer: '_setAmount'
        },
        hide: {
            type: Boolean,
            value: true,
            observer: '_toggle'
        }
    },
    data: {
        pay_title: null,
        pay_amount: null,
        show_keyboard: false,
        password: '',
        encode_passwd: [],
        hidden: true,
        disabled: true
    },
    methods: {
        _toggle: function(hide){
            hide ? this._hide() : this._show()
        },

        _show: function(){
            this.properties.hide = false
            this.setData({
                hidden: false
            })

            this._showKeyboard()
        },

        _hide: function(){
            this.properties.hide = true
            this.setData({
                hidden: true
            })

            this._reset()
        },

        _reset: function(){
            this.setData({
                encode_passwd: this._format(),
                password: '',
                disabled: true,
                show_keyboard: false,
            })
        },

        _setTitle: function(title){
            this.setData({
                pay_title: title
            })
        },

        _setAmount: function(amount){
            this.setData({
                pay_amount: amount.toFixed(2)
            })
            this.applyDataUpdates()
        },

        _showKeyboard: function(){
            
            this.setData({
                show_keyboard: true,
            })
        },

        _passwordInput: function(e){
            var password = e.detail.value
            console.log(password)
            this._setPassword(password)
            this._checkComplete()
        },

        _setPassword: function(password){
            this.setData({
                encode_passwd: this._format(password),
                password: password
            })
        },

        _checkComplete: function(){
            var that = this
            var password = this.data.password

            if (password.length>=6){
                setTimeout(function(){
                    that._onPay()
                }, 300)
            }
        },

        _format: function(password){
            var encode = new Array(6)
            var pwd = (password || "").split('')

            for( var x=0; x<6; x++ ){
                encode[x] = pwd[x]!==undefined ? '•' : ''
            }
            return encode
        },

        _onPay: function(){
            var password = this.data.password

            this.triggerEvent('pay', {
                password: password
            })

            this._hide()
        }
    },

})