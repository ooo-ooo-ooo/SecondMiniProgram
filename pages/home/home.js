// pages/home/home.js
const TOP_DISTANCE = 1000;

Page({

  /**
   * 页面的初始数据
   */

  data: {
    showBackTop: false
  },
  handleBackTop(){
    wx.pageScrollTo({
      scrollTop: 0,
    })
  },
  // 监听按钮回到顶部
  onPageScroll(options){
    const scrollTop = options.scrollTop;
    const flag = scrollTop >= TOP_DISTANCE;
    if(flag != this.data.showBackTop){
      this.setData({
        showBackTop: flag
      })
    }
  },
  onShow: function () {
    // 监听具体的组件到达指定的位置变成悬停
    // wx.createSelectorQuery().select(dom).boundingClientRect(rect => {
    //   console.log(rect)
    // }).exec()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})