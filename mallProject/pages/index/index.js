//index.js
//获取应用实例
import { request } from "../../request/index.js";
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    //轮播图数组
    swiperList:[],
    catitemsList:[],
    floordataList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {  
      this.getSwiperList();
      
      this.getCatitemsList();
      this.getFloordataList();
  },
  //获取轮播图数据
  async getSwiperList(){
        // wx.request({
        //   url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
        
        //   success: (result) => {
        //     this.setData({
        //       swiperList:result.data.message
        //     })
        //   },
        // })
      // request({ url:'/home/swiperdata'})
      //   .then(result => {
      //     this.setData({
      //       swiperList:result.data.message
      //     })
      //   })
      const result= await request({ url:'/home/swiperdata'})
          this.setData({
            swiperList:result.data.message
          })
          console.log(this.data.swiperList)
  },
  //获取导航数据
  async getCatitemsList(){
    // request({ url:'/home/catitems'})
    //     .then(result => {
    //       // console.log(result)
    //       this.setData({
    //         catitemsList:result.data.message
    //       })
    //     })
    const result= await request({url:'/home/catitems'})
    this.setData({
            catitemsList:result.data.message
          })

  },
  // 获取楼层数据
  async getFloordataList(){
    // request({url:'/home/floordata'})
    //   .then(result=>{
    //    // console.log(result)
    //     this.setData({
    //       floordataList:result.data.message
    //     })
    //   })
    let res = await request({url:'/home/floordata'})
    // console.log(res);
    let result =res.data.message;
    result.map(v=>{
      v.product_list.map(v1=>{
        v1.navigator_url=v1.navigator_url.replace(/goods_list/g,"goods_list/goods_list");
      })
    })
    console.log(result);
    // result.data.message.product_list.map(v=>{v.navigator_url.replace(/goods_list/g,"goods_list/goods_list")});
    this.setData({
          floordataList:res.data.message
        })
        console.log(this.data.floordataList)
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