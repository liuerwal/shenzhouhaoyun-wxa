//index.js
var CONFIG = require('../../asset/js/config');
var api = require('../../asset/js/api');

var P = require('../../page');
var _ = P._

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

        wx.chooseImage({
            count: 9, 
            sizeType: ['original', 'compressed'], 
            sourceType: ['album', 'camera'], 
            success: function (res) {

                if ( path[meta] ){
                    path[meta] = path[meta].concat(res.tempFilePaths);
                }else{
                    path[meta] = res.tempFilePaths;
                }
                console.log(path)

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
        });
    },
    items:function(){
        var that=this , file = [] , path = []

        P.Api.qualification.list(function(response){

            for( x in response ){
                var item = response[x]
                if ( item.type=='img' ){
                    file[item.id] = _.array_column(item.qualifications, 'file_id')
                    path[item.id] = _.array_column(item.qualifications, 'file.path')
                }
            }

            that.data.files = file;

            that.setData({
                items : response,
                path : path
            })
        });
    },
    submit: function(e){
        var that=this;
        var data = e.detail.value;
        var file = [];

        for( var x in this.data.files){
            var f = this.data.files[x]
            var k = 'item['+x+']';
            file[k] = f.join(',');
        }
        var params = _.extend(data, file);


        P.Api.qualification.add(params, function(res){
            _.toast('提交成功')
            // wx.navigateBack()
        });
        
    },

    previewImage: function(e){
        var that = this,
        index = e.currentTarget.dataset.index,
        files = that.data.items[1].qualifications;

        console.log(files);

        var urls = [];
        for( x in files ){
            urls.push(files[x].file.path );
        }

        wx.previewImage({
            current: files[index].file.path,
            urls: urls
        })
    },

});

