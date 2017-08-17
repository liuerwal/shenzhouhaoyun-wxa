
var _ = require('asset/js/underscore');
var page = this.Page;

module.exports = {

    run: function(data){

        var component = data.component || [];
        delete data.component;

        var obj = {};
        var func = {
            onLoad: [
                function(){
                    
                }
            ]
        };

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
                }else if ( _.isObject(comp[x]) ){
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
                    for( var i in queue ){
                        queue[i].apply( this, arguments);
                    }
                }
            }();
        }

        page(obj);

    },
    _ : _

};