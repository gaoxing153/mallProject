// pages/category/category.js
import { request } from "../../request/index.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cates:[],
    categoriesList:[],
    leftmenuList:[],
    rightContent:[],
    current_active:0,
    scrollTop:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  /*
    0 web中本地存储和小程序中的本地存储的区别
      1 写代码的方式不一样了
        web:
          存----localStorage.setItem("key","value")
          取----localStorage.getItem("key")
        小程序：
          存----wx.setStorageSync("key","value")
          取----wx/getStorageSync("key")
      2 存的时候 有没有对数据进行处理
        web：不管存储任何类型的数据都会对数据进行toString()
        小程序:不会对数据进行任何处理
    1.先判断本地存储中有没有九的数据
      {time:Date.now(),data:[...]}
    2 没有就的数据 直接发送新的请求
    3 有旧的数据 同时数据没有过期，就使用旧的数据，否则发送请求
  */

  // 1 获取本地存储数据
  const Cates=wx.getStorageSync('cates');
  // 2 判断
  if(!Cates){
    //不存在 发送请求获取数据
    this.getCategoriesList(); 
  }else{
    //有旧的数据 定义过期时间
    if(Date.now()-Cates.time<1000*20){
      this.cates=Cates.data;
      let leftmenuList=this.cates.map(v=>v.cat_name);
      let rightContent = this.cates[0].children;
      // console.log(leftmenuList,rightContent);
      
      // console.log(result.data.message);
      this.setData({
        leftmenuList,
        rightContent,
        scrollTop:0
      })
    }else{
      this.getCategoriesList();
    }
  }
    // 
  },
  async getCategoriesList(){
    // request({url:'/categories'})
    // .then(result=>{
    //   this.cates=result.data.message;
    //   wx.setStorageSync('cates',{time:Date.now(),data:this.cates});
    //   let leftmenuList=this.cates.map(v=>v.cat_name);
    //   let rightContent = this.cates[0].children;
    //   // console.log(leftmenuList,rightContent);
      
    //   // console.log(result.data.message);
    //   this.setData({
    //     leftmenuList,
    //     rightContent,
    //     scrollTop:0
    //   })
      
    // })
    //1 使用es7的asnyc await来发送reuest请求
      const res=await request({url:"/categories"});
      this.cates=res.data.message;
      wx.setStorageSync('cates',{time:Date.now(),data:this.cates});
      let leftmenuList=this.cates.map(v=>v.cat_name);
      let rightContent = this.cates[0].children;
      // console.log(leftmenuList,rightContent);
      
      // console.log(result.data.message);
      this.setData({
        leftmenuList,
        rightContent,
        scrollTop:0
      })
  },
  handleItemTap:function(e){
    let index=e.currentTarget.dataset.index;
    let rightContent = this.cates[index].children;
    this.setData({
      current_active:index,
      rightContent,
      scrollTop:0
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