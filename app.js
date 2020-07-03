//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)


    // 1.先从缓存中取出token
    const token = wx.getStorageSync('token');
    // 2.判断token是否有值
    if(token && token.length !== 0){
      // 验证token是否过期
      wx.request({
        url: '',
        method: 'post',
        header: {
          token
        },
        success: res=>{
          if(!res.data.errCode){
            this.globalData.token = token
          }else{
            wx.login({
              success: res => {
                // 发送 res.code 到后台换取 openId, sessionKey, unionId
                const code = res.code;
                wx.request({
                  url: 'url',
                  method: 'post',
                  data: {
                    code
                  },
                  success: res => {
                    // 1.取出token
                    const token = res.data.token
      
                    // 2.将token保存在globalData中
                    this.globalData.token = token
      
                    // 3.进行本地存储
                    wx.setStorageSync('token', token)
                  }
                })
              }
            })
          }
        }
      })
    }else{
       // 登录
      wx.login({
        success: res => {
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          const code = res.code;
          wx.request({
            url: 'url',
            method: 'post',
            data: {
              code
            },
            success: res => {
              // 1.取出token
              const token = res.data.token

              // 2.将token保存在globalData中
              this.globalData.token = token

              // 3.进行本地存储
              wx.setStorageSync('token', token)
            }
          })
        }
      })
    }

   
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    token: "",
    url: 'http://123.207.32.32:8000'
  }
})