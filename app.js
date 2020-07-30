//app.js
App({

  /* 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）*/
  onLaunch: function () {
    const token = wx.getStorageSync('token');
    if(token && token.length !== 0){
      this.check_token(token)
    }else{
      this.login()
    }    
  },
  check_token(token){
    console.log('执行了验证token的操作')
    wx.request({
      url: 'http://123.207.32.32:3000/auth',
      header: {
        token
      },
      method: 'post',
      success: res => {
        if(!res.data.errCode){
          this.globalData.token = token;
        }else{
          this.login()
        }
      },
      fail: err => {
        console.log(err)
      }
    })
  },

  login(){
    console.log('执行了登录操作')
    wx.login({
      success: res => {
        const code = res.code;
        wx.request({
          url: 'http://123.207.32.32:3000/login',
          data: {
            code
          },
          method: 'post',
          success: res => {
            const token = res.data.token;
            this.globalData.token = token;
            wx.setStorageSync('token', token)
          },
          fail: err => {
            console.log(err)
          }
        })
      },
    })
  },

  globalData: {
    token: ''
  }
})
