// pages/pay/pay.js
/*
  微信支付
    那些人 那些账号 可以实现微信支付
    1 企业账号
    2 企业账号的小程序后台中 必须给开发者 添加白名单
      一个appid
*/
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cart_list:[],
    money:0,
    num_total:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  
  onLoad: function (options) {

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let cart = wx.getStorageSync('cart');
    let pay_list=[];
    let money=0;
    let num_total = 0;
    cart.map(v=>{
      if(v.checked===true){
        pay_list.push(v);
      }
    })
    pay_list.map(v=>{
      money+=v.goods_price*v.num;
      num_total+=v.num;
    })
    this.setData({
      pay_list,
      money,
      num_total
    })
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