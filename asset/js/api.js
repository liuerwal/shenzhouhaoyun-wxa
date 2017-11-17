var CONFIG = require('config')
var _      = require('util')
var Http   = require('http')

module.exports = {

    register: function(data, success){

        Http.post(CONFIG.API.REGISTER_URL, _.extend(data, {access_token: data.phone}), function(response){
            if ( response.status == 1){
                _.cache('token', response.data.token)
                _.cache('ttl', response.data.ttl)
                _.cache('refresh_ttl', response.data.refresh_ttl)
                _.cache('user', response.data.user)
                success && success(response.data)
            }else{
               _.toast(response.msg)
            }
        })
    },

    login: function(phone, password, success){

        Http.post(CONFIG.API.LOGIN_URL, {phone: phone, password: password }, function(response){
            if ( response.status == 1){
                _.cache('token', response.data.token)
                _.cache('ttl', response.data.ttl)
                _.cache('refresh_ttl', response.data.refresh_ttl)
                _.cache('user', response.data.user)
                success && success(response.data)
            }else{
                _.toast("登陆失败")
            }
        })
    },

    verifyCode: function(phone){
        Http.post(CONFIG.API.VERIFYCODE, {phone: phone, access_token: phone}, function(response){
            if ( response.success){
                _.toast('短信已发送')
            }else{
                _.toast(response.message)
            }
        })
    },

    auth: {
        phone: function(phone, success){
            Http.post(CONFIG.API.AUTH.PHONE, {phone: phone}, function(response){
                if ( response.status == 1){
                    success && success(response.data)
                }else{
                    _.toast(response.msg)
                }
            })
        }
    },

    message: {
        destory: function(id, success){
            Http.post( _.sprintf(CONFIG.API.MESSAGE.DESTORY, id), {}, function(response){
                if ( response.status == 1){
                    success && success(response.data)
                }else{
                    _.toast(response.msg)
                }
            })
        },
        list: function(page, success){
            Http.get( CONFIG.API.MESSAGE.LIST, {page: page || 1}, function(response){
                if ( response.status == 1){
                    success && success(response.data)
                }else{
                    _.toast(response.msg)
                }
            })
        },
        show: function(id, success){
            Http.get( _.sprintf(CONFIG.API.MESSAGE.SHOW, id), {}, function(response){
                if ( response.status == 1){
                    success && success(response.data)
                }else{
                    _.toast(response.msg)
                }
            })
        }
    },

    order: {
        confirm: function(order, success){
            Http.post( CONFIG.API.ORDER.CONFIRM, order, function(response){
                if ( response.status == 1){
                    success && success(response.data)
                }else{
                    _.toast(response.msg)
                }
            })
        },
        done: function(id, success){
            
        },
        cancel: function(id, success){
            Http.post( _.sprintf(CONFIG.API.ORDER.CANCEL, id), {}, function(response){
                if ( response.status == 1){
                    success && success(response.data)
                }else{
                    _.toast(response.msg)
                }
            })
        },
        list: function(starttime, endtime, page, success){
            Http.get( CONFIG.API.ORDER.LIST, {starttime:starttime, endtime:endtime, page: page || 1}, function(response){
                if ( response.status == 1){
                    success && success(response.data)
                }else{
                    _.toast(response.msg)
                }
            })
        },
        show: function(id, success){
            Http.get( _.sprintf(CONFIG.API.ORDER.SHOW, id), {}, function(response){
                if ( response.status == 1){
                    success && success(response.data)
                }else{
                    _.toast(response.msg)
                }
            })
        },
        money: function(oil_id, weight, addrs, success, error){
            Http.get( CONFIG.API.ORDER.MONEY, {oil_id: oil_id, weight: weight, addrs: addrs}, function(response){
                if ( response.status == 1){
                    success && success(response.data)
                }else{
                    _.toast(response.msg)
                    error && error(response.data)
                }
            })
        },
        inpour: function(amount, success){
            Http.post( CONFIG.API.ORDER.INPOUR, {amount: amount}, function(response){
                if ( response.status == 1){
                    success && success(response.data)
                }else{
                    _.toast(response.msg)
                }
            })
        },
        address: {
            deliver: function(id, location, success){
                Http.post( _.sprintf(CONFIG.API.ORDER.ADDRESS.DELIVER, id), location, function(response){
                    if ( response.status == 1){
                        success && success(response.data)
                    }else{
                        _.toast(response.msg)
                    }
                })
            },
            arrive: function(id, location, success){
                Http.post( _.sprintf(CONFIG.API.ORDER.ADDRESS.ARRIVE, id), location, function(response){
                    if ( response.status == 1){
                        success && success(response.data)
                    }else{
                        _.toast(response.msg)
                    }
                })
            },
            done: function(id, location, success){
                Http.post( _.sprintf(CONFIG.API.ORDER.ADDRESS.DONE, id), location, function(response){
                    if ( response.status == 1){
                        success && success(response.data)
                    }else{
                        _.toast(response.msg)
                    }
                })
            }
        },
        ticket: function(success){
            Http.get( CONFIG.API.ORDER.TICKET, {}, function(response){
                if ( response.status == 1){
                    success && success(response.data)
                }else{
                    _.toast(response.msg)
                }
            })
        },
        choosetime: function(success){
            Http.get( CONFIG.API.ORDER.TIME, {}, function(response){
                if ( response.status == 1){
                    success && success(response.data)
                }else{
                    _.toast(response.msg)
                }
            })
        }
    },

    waybill: {
        list: function(starttime, endtime, page, success){
            Http.post( CONFIG.API.WAYBILL.LIST, {starttime:starttime, endtime:endtime, page: page || 1}, function(response){
                if ( response.status == 1){
                    success && success(response.data)
                }else{
                    _.toast(response.msg)
                }
            })
        },
        show: function(id, success){
            Http.get( _.sprintf(CONFIG.API.WAYBILL.SHOW, id), {}, function(response){
                if ( response.status == 1){
                    success && success(response.data)
                }else{
                    _.toast(response.msg)
                }
            })
        },
        pickup: function(id, location, success){
            Http.post( _.sprintf(CONFIG.API.WAYBILL.PICKUP, id), location, function(response){
                if ( response.status == 1){
                    success && success(response.data)
                }else{
                    _.toast(response.msg)
                }
            })
        },
        loading: function(id, location, success){
            Http.post( _.sprintf(CONFIG.API.WAYBILL.LOADING, id), location, function(response){
                if ( response.status == 1){
                    success && success(response.data)
                }else{
                    _.toast(response.msg)
                }
            })
        },
        deliver: function(id, location, success){
            Http.post( _.sprintf(CONFIG.API.WAYBILL.DELIVER, id), location, function(response){
                if ( response.status == 1){
                    success && success(response.data)
                }else{
                    _.toast(response.msg)
                }
            })
        },
        cancel: function(id, location, success){
            Http.post( _.sprintf(CONFIG.API.WAYBILL.CANCEL, id), location, function(response){
                if ( response.status == 1){
                    success && success(response.data)
                }else{
                    _.toast(response.msg)
                }
            })
        }
    },

    oil: {
        list: function(success){
            Http.get( CONFIG.API.OIL.LIST, {}, function(response){
                if ( response.status == 1){
                    success && success(response.data)
                }else{
                    _.toast(response.msg)
                }
            })
        },
        price: function(success){
            Http.get( CONFIG.API.OIL.PRICE, {}, function(response){
                if ( response.status == 1){
                    _.cache('price', response.data)
                    success && success(response.data)
                }else{
                    _.toast(response.msg)
                }
            })
        }
    },

    address: {
        list: function(page, success){
            Http.get( CONFIG.API.ADDRESS.LIST, {page: page || 1}, function(response){
                if ( response.status == 1){
                    success && success(response.data)
                }else{
                    _.toast(response.msg)
                }
            })
        },
        show: function(id, success){
            Http.get( _.sprintf(CONFIG.API.ADDRESS.SHOW, id), {}, function(response){
                if ( response.status == 1){
                    success && success(response.data)
                }else{
                    _.toast(response.msg)
                }
            })
        },
        add: function(addr, success){
            Http.post( CONFIG.API.ADDRESS.ADD, addr, function(response){
                if ( response.status == 1){
                    success && success(response.data)
                }else{
                    _.toast(response.msg)
                }
            })
        },
        edit: function(id, addr, success){
            Http.post( _.sprintf(CONFIG.API.ADDRESS.EDIT, id), addr, function(response){
                if ( response.status == 1){
                    success && success(response.data)
                }else{
                    _.toast(response.msg)
                }
            })
        },
        destory: function(id, success){
            Http.post( _.sprintf(CONFIG.API.ADDRESS.DESTROY, id), {}, function(response){
                if ( response.status == 1){
                    success && success(response.data)
                }else{
                    _.toast(response.msg)
                }
            })
        }
    },

    pay: function(order, paywith, success){
        Http.post( CONFIG.API.PAY, {order: order, paywith: paywith, openid: _.cache('openid')}, function(response){
            if ( response.status == 1){
                success && success(response.data)
            }else{
                _.toast(response.msg)
            }
        })
    },

    user: {
        myself: function(success){
            Http.get( CONFIG.API.USER.SHOW, {}, function(response){
                if ( response.status == 1){
                    _.cache('user', response.data)
                    success && success(response.data)
                }else{
                    _.toast(response.msg)
                }
            })
        },
        resetPwd: function(oldpwd, newpwd, success){
            Http.post( CONFIG.API.USER.RESET_PASSWORD, {old_password: oldpwd, new_password: newpwd}, function(response){
                if ( response.status == 1){
                    success && success(response.data)
                }else{
                    _.toast(response.msg)
                }
            })
        },
        resetPhone: function(oldpwd, newpwd, success){
            Http.post( CONFIG.API.USER.RESET_PHONE, {phone: phone}, function(response){
                if ( response.status == 1){
                    success && success(response.data)
                }else{
                    _.toast(response.msg)
                }
            })
        },
        bill: function(page, success){
            Http.get( CONFIG.API.USER.BILLS, {page: page || 1}, function(response){
                if ( response.status == 1){
                    success && success(response.data)
                }else{
                    _.toast(response.msg)
                }
            })
        },
        coupon: function(page, success){
            Http.get( CONFIG.API.USER.COUPONS, {page: page || 1}, function(response){
                if ( response.status == 1){
                    success && success(response.data)
                }else{
                    _.toast(response.msg)
                }
            })
        },
        subaccount: function(page, success){
            Http.get( CONFIG.API.USER.SUBACCOUNT, {page: page || 1}, function(response){
                if ( response.status == 1){
                    success && success(response.data)
                }else{
                    _.toast(response.msg)
                }
            })
        },
        resetLimitFund: function(user_id, limit, success){
            Http.post( CONFIG.API.USER.RESET_LIMIT_FUND, {'id': user_id, 'limit_fund': limit}, function(response){
                if ( response.status == 1){
                    success && success(response.data)
                }else{
                    _.toast(response.msg)
                }
            })
        }
    },

    qualification: {
        list: function(success){
            Http.get( CONFIG.API.QUALIFICATION.LIST, {}, function(response){
                if ( response.status == 1){
                    success && success(response.data)
                }else{
                    _.toast(response.msg)
                }
            })
        },
        add: function(data, success){
            Http.post( CONFIG.API.QUALIFICATION.ADD, data, function(response){
                if ( response.status == 1){
                    success && success(response.data)
                }else{
                    _.toast(response.msg)
                }
            })
        }
    },

    weixin: {
        wxaqrcode: function(data, success){
            Http.get( CONFIG.API.WEIXIN.WXAQRCODE, data, function(response){
                if ( response.status == 1 ){
                    success && success(response.data)
                }else{
                    _.toast(response.msg)
                }
            })
        }
    },

    article: {
        list: function(success){
            Http.get( CONFIG.API.ARTICLE.LIST, {}, function(response){
                if ( response.status == 1 ){
                    success && success(response.data)
                }else{
                    _.toast(response.msg)
                }
            })
        }
    },

    getUserInfo: function(){
        var userinfo = wx.getStorageSync('userinfo')
        if ( !userinfo ){
            wx.getUserInfo({
                success: function(res) {
                    var userinfo = res.userInfo
                    _.cache('userinfo', userinfo)
                    console.log(userinfo)
                }
            })
        }
    },

    freshToken: function(success){
        Http.get(CONFIG.API.TOKEN_REFRESH, {}, function(response){
            _.cache('token', response.data.token)
            _.cache('ttl', response.data.ttl)
            _.debug('token fresh')
            success && success.call()
        })
    },

    isTokenExpired: function(){
        return _.timestamp() > _.cache('ttl')
    },

    isRefreshTokenExpired: function(){
        return _.timestamp() > _.cache('refresh_ttl')
    },

    saveOpenId: function(code){
        Http.post(CONFIG.API.AUTH.OPENID, {code: code}, function(response){
            if ( response.status == 1){
                _.cache('openid', response.data)
            }else{
                _.toast(response.msg)
            }
        })
    },

    get: Http.get,

    post: Http.post,

    request: Http.request,
}



