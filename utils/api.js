var CONFIG = require('config');

module.exports = {
	login: function(phone, password, success){

		wx.request({
            url: CONFIG.API.LOGIN_URL,
            data: {
                phone: phone,
                password: password
            },
            method: 'POST',
            header: {
                'Content-Type':'application/x-www-form-urlencoded'
            },
            success: function(response){
            	var res = response.data;
            	console.log(res)
                if ( res.status == 1){
                    wx.setStorageSync('token', res.data);
                    console.log(res.data);
                    console.info('登录成功');
                    success && success(res.data.data);
                }else{
                	wx.showToast({
	                    title: "登陆失败",
	                    icon: "false",
	                    duration: 3000,

	                });
                }
            }
        });

	},

	getUserInfo: function(){
        var userinfo = wx.getStorageSync('userinfo');
        if ( !userinfo ){
            wx.getUserInfo({
                success: function(res) {
                    var userinfo = res.userInfo
                    wx.setStorageSync('userinfo', userinfo);
                    console.log(userinfo);
                }
            });
        }
    },
}

// function post(data){
// 	data.header["Content-Type"] = "application/x-www-form-urlencoded";
// 	data.header['Version'] = "v1";
// 	if ( data.url !== CONFIG.API.LOGIN ){
// 		data.header['Authorization'] = "Bearer "+ wx.getStorageSync('token');
// 	}
// 	data.method = "POST";
// 	data.url = CONFIG.API.ROOT+data.url;

// 	delete data.token;

// 	wx.request(data);
// }

