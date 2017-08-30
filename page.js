
var _ = require('asset/js/util');
var Api = require('asset/js/api');
var page = this.Page;

module.exports = P = {

    onInit: function(){

        var args = Array.prototype.slice.apply(arguments)
        var success = args.pop()
        var context = this
        
        _.debug('page init')

        if ( !_.cache('openid') ){
            wx.login({
                success: function(res){
                    if (res.code) {
                      //发起网络请求
                        Api.saveOpenId(res.code)
                    } else {
                        console.log('获取用户登录态失败！' + res.errMsg)
                    }
                }
            })
        }

        if ( context.customData.login ){

            if ( Api.isRefreshTokenExpired() ){
                _.redirectTo('/pages/login/login')
            }else{
                if ( Api.isTokenExpired() ){
                    Api.freshToken(function(){
                        success && success.apply(context, args);
                    })
                    return;
                }
            }
        }

        if ( !_.cache('user') ){

            P.Api.user.myself(function(user){
                _.cache('user', user)
            });
        }

        success && success.apply(context, args);
    },

    run: function(data){

        var component = data.component || [];
        delete data.component;

        var obj = {
            customData: {
                login: true,
            },
            switchTab: function(tab){
                
                var user = _.cache('user')

                if ( tab === 'mine' ){
                    _.redirectTo('/pages/my/index')

                }else if ( tab === 'message' ){
                    _.redirectTo('/pages/message/index')

                }else if ( tab === 'home' ){
                    if ( user.role == 'buyer' ){
                        _.redirectTo('/pages/order/index')

                    }else if( user.role == 'driver'){
                        _.redirectTo('/pages/order/list')
                    }
                }
            }
        };
        var func = {};

        component = component.map(function(path){
            return require(path);
        });
        component.push(data);

        component.forEach(function(comp){
            for( var x in comp ){
                if ( _.isFunction(comp[x]) ){
                    func[x] = func[x] || [];
                    func[x].push(comp[x]);
                }else if ( _.isArray(comp[x]) ){
                    obj[x] = (obj[x] || []).concat(comp[x]);
                }else if ( _.isPlainObject(comp[x]) ){
                    obj[x] = _.extend(obj[x] || {} , comp[x]);
                }else{
                    obj[x] = comp[x];
                }
            }
        });

        for ( var x in func ){
            obj[x] = function(){
                var queue = func[x];
                return function(){
                    if ( queue.length == 1 ){
                        return queue[0].apply( this, arguments);
                    }else{
                        for( var i in queue ){
                            queue[i].apply( this, arguments);
                        }
                    }
                }
            }();
        }

        obj.onLoad = function(){
            var onload = obj.onLoad || function(){};
            return function(){
                var args = Array.prototype.slice.apply(arguments);
                args.push(onload)
                P.onInit.apply(this, args);
            }
        }()

        page(obj);


    },
    _ : _,
    Api: Api,

};