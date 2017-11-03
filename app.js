var Api = require('asset/js/api')
var _ = require('asset/js/util')

App({
    onLaunch: function() {
        //调用API从本地缓存中获取数据
        // var logs = wx.getStorageSync('logs') || []
        // logs.unshift(Date.now())
        // wx.setStorageSync('logs', logs)
    },

    getUserInfo: function(cb) {
        var that = this
        if (this.globalData.userInfo) {
        typeof cb == "function" && cb(this.globalData.userInfo)
        } else {
            //调用登录接口
            wx.getUserInfo({
                withCredentials: false,
                success: function(res) {
                    that.globalData.userInfo = res.userInfo
                    typeof cb == "function" && cb(that.globalData.userInfo)
                }
            })
        }
    },

    globalData: {
        userInfo: null
    },

    eventQueue: {
    },

    globalData: function(key, value){
        if ( value === undefined ){
            return this.globalData[key]
        }

        if ( value === null ){
            delete this.globalData[key]
            return true
        }

        this.globalData[key] = value
    },

    on: function(event, fn){
        var pages = getCurrentPages()
        var route = pages[page.length-1].route

        var queue = this.eventQueue[route] || {}

        if ( queue[event] ){
            queue[event].push(fn)
        }else{
            queue[event] = [fn]
        }

        this.eventQueue[route] = queue

        console.log(this.eventQueue)
    },

    trigger: function(event, context){
        var page = getCurrentPages()
        var route = page[0].route

        console.log(this.eventQueue)

        var cb = this.eventQueue[route]
        if ( !cb ) return

        var queue = cb[event]
        if ( !queue ) return

        console.log(queue)

        for ( x in queue ){
            queue[x].call(context)
        }
    },
    
})
