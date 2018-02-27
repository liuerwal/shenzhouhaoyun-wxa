
var _ = require('asset/js/util')
var Api = require('asset/js/api')
var P = null

module.exports = P = {

    onInit: function(){

        var args = Array.prototype.slice.apply(arguments)
        var success = args.pop()
        var context = this

        if ( context.customData.login ){

            if ( Api.isRefreshTokenExpired() ){
                _.redirectTo('/pages/login/login')
                return;
            }else{
                if ( Api.isTokenExpired() ){
                    Api.freshToken(function(){
                        success && success.apply(context, args);
                    })
                    return;
                }
            }

            if ( !_.cache('user') && _.cache('token') ){

                P.Api.user.myself(function(user){
                    _.cache('user', user)
                });
            }
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
            redirectTo: function(e){
                var url = e.currentTarget.dataset.url
                _.redirectTo(url)
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
                        _.redirectTo('/pages/waybill/list')
                    }
                }
            },
            onShareAppMessage: function(options){
                var user = _.cache('user')
                return {
                    'title'   : '神州好运',
                    'path'    : _.sprintf('/pages/login/login?referer=%d', user.id),
                    'imageUrl': '/asset/img/szhy_logo.png',
                    'success' : function(){ _.toast('分享成功') },
                    'fail'    : function(){ _.toast('分享失败') },
                    'complete': function(){},
                }
            },
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

        Page(obj);


    },
    _ : _,
    Api: Api,

};