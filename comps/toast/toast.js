Component({
    properties: {
        message: {
            type: String,
            value: null,
            observer: '_message'
        },
        hide: {
            type: Boolean,
            value: true,
            observer: '_toggle'
        },
        delay: {
            type: Number,
            value: 2000,
        }
    },
    data: {
        message: null,
        hidden: true,
    },
    methods: {
        _toggle: function(hide){
            if ( !hide && this.properties.message.length ){
                this._show()
            }else{
                this._hide()
            }
        },

        _show: function(){
            var that = this
            this.properties.hide = false
            this.setData({
                hidden: false,
            })

            setTimeout(function(){
                that._hide()
            }, this.properties.delay)
        },

        _hide: function(){
            this.properties.hide = true
            this.setData({
                hidden: true,
            })
        },

        _message: function(message){
            this.setData({
                message: message
            })
        },
    },

})