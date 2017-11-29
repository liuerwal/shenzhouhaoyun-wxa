Component({
    properties: {
        hide: {
            type: Boolean,
            value: true,
            observer: '_toggle'
        },
        zIndex: {
            type: Number,
            value: 10,
            observer: '_zIndex'
        }
    },
    data: {
        hidden: true,
        zIndex: 0,
    },
    methods: {
        _toggle: function(hide){
            this.setData({
                hidden: hide ? true : false,
            })
        },

        _show: function(){
            this.properties.hide = false
            this.setData({
                hidden: false,
            })
        },

        _hide: function(){
            this.properties.hide = true
            this.setData({
                hidden: true,
            })
        },

        _zIndex: function(zIndex){
            this.properties.zIndex = zIndex
            this.setData({
                zIndex: zIndex,
            })
        }
    },

})