//index.js
var CONFIG = require('../../asset/js/config');
var api = require('../../asset/js/api');

var P = require('../../page');

P.run({
    data: {
        items:[],
        tempFilePaths:[],
        path:[],
        files : [],
    },
    onLoad: function () {
        var that = this;
        if ( !wx.getStorageSync('token') ){
            wx.redirectTo({
                url: '/pages/login/login'
            });
        }

        that.items();
    },
    add:function(e){
        var that=this;
        var meta = e.currentTarget.dataset.index;
        var path = this.data.path;

        console.log(meta);
        console.log(path)

        wx.chooseImage({
            count: 9, 
            sizeType: ['original', 'compressed'], 
            sourceType: ['album', 'camera'], 
            success: function (res) {

                if ( path[meta] ){
                    path[meta].concat(res.tempFilePaths);
                }else{
                    path[meta] = res.tempFilePaths;
                }

                
                console.log(JSON.stringify(path));
                console.log(path[meta])

                console.log(res.tempFilePaths);
                for( x in res.tempFilePaths ){
                    console.log(res.tempFilePaths)
                    console.log(res.tempFilePaths[x])
                    that.upload(res.tempFilePaths[x], meta);
                }

                that.setData({
                    path: path,
                }) 
                
            }
        })
    },
    upload:function(file, item_id){
        var that=this;

        wx.uploadFile({

            url:  CONFIG.API.UPLOADPIC_URL , 
            filePath: file,
            name: "file",
            method: 'POST', 
            header: {
                "Content-Type":"application/json",
                Authorization: "Bearer " + wx.getStorageSync('token')
            },
            dataType: 'json',
            success: function(res){
                console.log(res)
                if ( res.statusCode == 200 ){
                    console.log(res)
                    // var items = res.data.data;

                    // that.setData({
                    //     items : items
                    // })
                    console.log("成功")
                    var data = JSON.parse(res.data);
                    if ( that.data.files[item_id] ){
                        that.data.files[item_id].push( data.data.id );
                    }else{
                        that.data.files[item_id]= [data.data.id]; 
                    }
                }else{
                    console.log("什么")
                }
            },
            fail:function(res){
                console.log("失败")
            },
            complete: function(){
                console.log("aa")
            }
        });
    },
    items:function(){
        var that=this;

        wx.request({

            url:  CONFIG.API.ITEMS_URL , 
            data: {

            },
            method: 'GET', 
            header: {
                "Content-Type":"application/json",
                Authorization: "Bearer " + wx.getStorageSync('token')
            },
            success: function(res){
                console.log(res.data.data)
                if ( res.statusCode == 200 ){
                    var items = res.data.data;

                    that.setData({
                        items : items
                    })
                    console.log("成功")

                }else{
                    console.log("什么")
                }
            },
            fail:function(res){
                console.log("失败")
            },
            complete: function(){
                console.log("aa")
            }
        });
    },
    submit: function(){
        var that=this;
        var items = [];
        var file = [];
        // var params = new FormData;

        // for( var x in this.data.items){
        //     params[].push(this.data.items[x].id);
        // }

        console.log(items);
        console.log(that.data.files);

        wx.request({

            url:  CONFIG.API.ADDITEMS_URL , 
            method: 'POST', 
            data: {
                "item_id": JSON.stringify([1,2,4]),
                "file_id[1][]": 20,
                "file_id[2][]": 20,
                "file_id[4][]": 20,
            },
            header: {
                "Content-Type":"application/x-www-form-urlencoded",
                Authorization: "Bearer " + wx.getStorageSync('token')
            },
            success: function(res){
                console.log(res)
                if ( res.statusCode == 200 ){
                    console.log(res)
                    console.log("成功")

                }else{
                    console.log("什么")
                }
            },
            fail:function(res){
                console.log("失败")
            },
            complete: function(){
                console.log("aa")
            }
        });
    }

});

