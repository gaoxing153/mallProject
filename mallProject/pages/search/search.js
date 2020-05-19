/*1 输入框绑定 只改变事件 input事件
    1 获取到输入框的值
    2 判断值的合法性
    3 验证通过 把输入框的值 发送到后台
    4 返回值打印到页面上
  2 防抖（防止抖动）定时器实现
      （0 防抖 一般输入框中 防止重复输入 重复发送请求
        1 节流 一般用在页面下拉和上拉）
    0 定义一个全局的定时器id，第一次输入的时候激活定时器
    1 每次有输入的时候重新开始定时器
    2 超过限定时间(一秒)没有输入则开始发送请求函数

   */
import {request} from "../../request/index.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShow:false,
    goods:[],
    input_value:""
  },
  TimeId:-1,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  handleInput(e){
    // console.log(e);
    let { value } = e.detail;
    // console.log(value);
    // console.log(!value.trim());
    // console.log(value);
    if(!value.trim()){
      this.setData({
        isShow:false,
        goods:[],
        input_value:""
      })
      return;
    }
    clearTimeout(this.TimeId);
    this.TimeId=setTimeout(()=>{
      this.getGoods(value);
    },1000);
    this.setData({
      input_value:value
    })
    // this.getGoods(value);
  },
  // 获取查询结果
  async getGoods(query){
    console.log(query);
    let res =await request({url:"/goods/qsearch",data:{query}});
    // console.log(res);
    let goods = res.data.message;
    // console.log(goods);
    this.setData({
      goods,
      isShow:true
    })
  },
  cancel(){
    this.setData({
      isShow:false,
      goods:[],
      input_value:""
    })
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