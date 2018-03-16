"use strict";

var sprintf = require('libs/sprintf')
var strtotime = require('libs/strtotime')
var CONFIG = require('config')

function formatTime(date) {
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var day = date.getDate()

    var hour = date.getHours()
    var minute = date.getMinutes()
    var second = date.getSeconds()


    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatTime2(date) {
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var day = date.getDate()

    return [year, month, day].map(formatNumber).join('/')
}

function formatNumber(n) {
    n = n.toString()
    return n[1] ? n : '0' + n
}

var class2type = function(){
    return {};
}()

var hasOwn = function (){
    return class2type.hasOwnProperty;
}()

var toString = function () {
    return class2type.toString;
}()

var getProto = function (){
    return Object.getPrototypeOf;
}()

var fnToString = function (){
    return hasOwn.toString;
}()

var ObjectFunctionString = function (){
    return fnToString.call( Object );
}()

"Boolean Number String Function Array Date RegExp Object".split(" ").forEach(function(name, i) {
    class2type[ "[object " + name + "]" ] = name.toLowerCase();
});

module.exports = {
    formatTime: formatTime,
    formatTime2: formatTime2,

    date: function(format, timestamp){
        var date = timestamp ? new Date(timestamp*1000) : new Date()
        return format.replace('Y', date.getFullYear())
                     .replace('m', date.getMonth()+1)
                     .replace('d', date.getDate())
                     .replace('H', date.getHours())
                     .replace('i', date.getMinutes())
                     .replace('s', date.getSeconds())
    },

    extend: function() {
        var options, name, src, copy, copyIsArray, clone,
            target = arguments[ 0 ] || {},
            i = 1,
            length = arguments.length,
            deep = false;

        // Handle a deep copy situation
        if ( typeof target === "boolean" ) {
            deep = target;

            // Skip the boolean and the target
            target = arguments[ i ] || {};
            i++;
        }

        // Handle case when target is a string or something (possible in deep copy)
        if ( typeof target !== "object" && !this.isFunction( target ) ) {
            target = {};
        }

        // Extend jQuery itself if only one argument is passed
        if ( i === length ) {
            target = this;
            i--;
        }

        for ( ; i < length; i++ ) {

            // Only deal with non-null/undefined values
            if ( ( options = arguments[ i ] ) != null ) {

                // Extend the base object
                for ( name in options ) {
                    src = target[ name ];
                    copy = options[ name ];

                    // Prevent never-ending loop
                    if ( target === copy ) {
                        continue;
                    }

                    // Recurse if we're merging plain objects or arrays
                    if ( deep && copy && ( this.isPlainObject( copy ) ||
                        ( copyIsArray = this.isArray( copy ) ) ) ) {

                        if ( copyIsArray ) {
                            copyIsArray = false;
                            clone = src && this.isArray( src ) ? src : [];

                        } else {
                            clone = src && this.isPlainObject( src ) ? src : {};
                        }

                        // Never move original objects, clone them
                        target[ name ] = this.extend( deep, clone, copy );

                    // Don't bring in undefined values
                    } else if ( copy !== undefined ) {
                        target[ name ] = copy;
                    }
                }
            }
        }

        // Return the modified object
        return target;
    },

    isFunction: function( obj ) {

        // Support: Chrome <=57, Firefox <=52
        // In some browsers, typeof returns "function" for HTML <object> elements
        // (i.e., `typeof document.createElement( "object" ) === "function"`).
        // We don't want to classify *any* DOM node as a function.
        return typeof obj === "function" && typeof obj.nodeType !== "number";
    },

    isNumeric: function( obj ) {

        // As of jQuery 3.0, isNumeric is limited to
        // strings and numbers (primitives or objects)
        // that can be coerced to finite numbers (gh-2662)
        var type = this.type( obj );
        return ( type === "number" || type === "string" ) &&

            // parseFloat NaNs numeric-cast false positives ("")
            // ...but misinterprets leading-number strings, particularly hex literals ("0x...")
            // subtraction forces infinities to NaN
            !isNaN( obj - parseFloat( obj ) );
    },

    isPlainObject: function( obj ) {
        var proto, Ctor;

        // Detect obvious negatives
        // Use toString instead of jQuery.type to catch host objects
        if ( !obj || toString.call( obj ) !== "[object Object]" ) {
            return false;
        }

        proto = getProto( obj );

        // Objects with no prototype (e.g., `Object.create( null )`) are plain
        if ( !proto ) {
            return true;
        }

        // Objects with prototype are plain iff they were constructed by a global Object function
        Ctor = hasOwn.call( proto, "constructor" ) && proto.constructor;
        return typeof Ctor === "function" && fnToString.call( Ctor ) === ObjectFunctionString;
    },

    isEmptyObject: function( obj ) {

        /* eslint-disable no-unused-vars */
        // See https://github.com/eslint/eslint/issues/6125
        var name;

        for ( name in obj ) {
            return false;
        }
        return true;
    },

    type: function( obj ) {
        if ( obj == null ) {
            return obj + "";
        }

        // Support: Android <=2.3 only (functionish RegExp)
        return typeof obj === "object" || typeof obj === "function" ?
            class2type[ toString.call( obj ) ] || "object" :
            typeof obj;
    },

    isArray: Array.isArray,

    isString: function( obj ){
        return this.type( obj ) === 'string';
    },

    cache: function(key, value){
        if ( value === undefined ){
            return wx.getStorageSync(key);
        }
        wx.setStorageSync(key, value);
    },

    timestamp: function(){
        return this.strtotime('now');
    },

    alert: function(message, success){
        wx.showModal({
            title: "温馨提示",
            content: message,
            showCancel: false,
            success: function(res){
                if ( res.confirm && success ){
                    success.call()
                }
            },
        });
    },

    confirm: function(message, success, error, confirm_text, cancel_text){
        wx.showModal({
            title: "温馨提示",
            content: message,
            showCancel: true,
            cancelText: cancel_text || '取消',
            confirmText: confirm_text || '确定',
            success: function(res){
                if ( res.confirm && success ){
                    success.call()
                }
                if ( res.cancel && error ){
                    error.call()
                }
            },
        });
    },

    toast: function(message){
        wx.showToast({
            title: message,
            
        })
    },

    mytoast: function(message){
        this.currentPage().setData({
            _toast_hide: false,
            _toast_message: message
        })
    },

    currentPage: function(){
        var pages = getCurrentPages()
        return pages[pages.length-1]
    },

    loading: function(message){
        wx.showLoading({
            title: message,
            mask: true,
        })
    },

    hideLoading: function(message){
        wx.hideLoading()
    },

    redirectTo: function(url){
        wx.redirectTo({
            url: url
        })
    },

    navigateTo: function(url){
        wx.navigateTo({
            url: url
        })
    },

    reLaunch: function(url){
        wx.reLaunch({
            url: url
        })
    },

    sprintf: sprintf.sprintf,
    strtotime: function(str){
        return parseInt(strtotime(str))
    },

    debug: function(msg){
        if ( CONFIG.DEBUG ){
            console.trace(msg)
            // console.info(msg)
        }
    },

    array_column: function(array, column_key){//, index_key){
        if ( !this.isArray(array) ){
            return null
        }
        
        if ( column_key!==null && column_key!==undefined ){
            array = array.reduce(function(result, item){
                var keys = column_key.split('.') 
                if ( keys.length>1 ){
                    keys.forEach(function(value){
                        item = item[value]
                    })
                }else{
                    item = item[column_key]
                }
                result.push( item!==undefined ? item : null )
                return result;
            }, [])
        }
        return array
    },

    array_sum: function(array){
        return array.reduce(function(a, b){
            return a*1 + b*1
        }, 0)
    },

    trimRightZero: function(str){
        return str.replace(/[.]*[0]*$/, '')
    },

    ucfirst: function(str){
        if(!!str){
            return str[0].toUpperCase() + str.substr(1)
        }else {
            return str;
        }
    },

    Math: {
        sub: function(arg1,arg2){    
            var r1, r2, m, n;
            try {
                r1 = arg1.toString().split(".")[1].length;
            } catch (e) {
                r1 = 0;
            }
            try {
                r2 = arg2.toString().split(".")[1].length;
            } catch (e) {
                r2 = 0;
            }
            m = Math.pow(10, Math.max(r1, r2));
             //last modify by deeka
             //动态控制精度长度
            n = (r1 >= r2) ? r1 : r2;
            return ((arg1 * m - arg2 * m) / m).toFixed(n);
        },
        add: function(arg1,arg2){    
            var r1, r2, m;
            try {
                r1 = arg1.toString().split(".")[1].length;
            } catch (e) {
                r1 = 0;
            }
            try {
                r2 = arg2.toString().split(".")[1].length;
            } catch (e) {
                r2 = 0;
            }
            m = Math.pow(10, Math.max(r1, r2));
            return (arg1 * m + arg2 * m) / m;
        }    
    }
}
