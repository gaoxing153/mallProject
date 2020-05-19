/*
上拉加载下一页
  1 用户赏花页面 滚动条触底 开始夹杂下一页数据
    1.找到滑动条触底事件 微信开发文档中有
    2.判断有没有下一页数据
      1 获取到总页数 只有一个总条数
        总页数= Math.ceil(总条数/页容量)
      2 获取到当前的页码
      3 判断一下当前的页码是否大于等于总页数
        表示 没有下一页数据
    3.假如没有下一页数据 弹出一个提示
    4.加入还有下一页数据 来加载下一页数据
      获取当前的页码+1
      重新发送请求
      数据请求回来 对元素组进行拼接

 */
 /*
  下拉刷新页面
    触发下拉刷新事件
    重置 数据 数组
    重置页码为1
    重新发送请求
    数据请求回来了 需要手动关闭等待效果
 */
import { request } from "../../request/index.js";

// pages/goods_list/goods_list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:[
      {
        id:0,
        value:"综合",
        isActive:true
      },
       {
        id:1,
        value:"销量",
        isActive:false
      },
       {
        id:2,
        value:"价格",
        isActive:false
      }
    ],
    goods_list:[]
  },
  QueryParams:{
    query:"",
    cid:"",
    pagenum:1,
    pagesize:10
  },
  totalPages:1,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)
    this.QueryParams.cid=options.cid||"";
    this.QueryParams.query=options.query||"";
    this.getGoodsList()
   
  },
  async getGoodsList(){
    const result = await request({url:'/goods/search',data:this.QueryParams})
    // console.log(result);
    const total=result.data.message.total;
    this.totalPages=Math.ceil(total/this.QueryParams.pagesize);
    // console.log(this.totalPages);
    this.setData({
      goods_list:[...this.data.goods_list,...result.data.message.goods]
    })
    //关闭下拉刷新的窗口 如果没有调用下拉刷新事件也不会报错
    // wx-wx.stopPullDownRefresh({
    //   complete: (res) => {},
    //   fail: (res) => {},
    //   success: (res) => {},
    // })
  },
  handleTabsItemChange(e){
    // console.log(e);
    const {index}=e.detail;
    let {tabs}=this.data;
    tabs.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false)
    this.setData({
      tabs
    })
  },
  //监听用户上拉事件
  onReachBottom(){
    // console.log("我是有底线的");
    if(this.QueryParams.pagenum>=this.totalPages){
      // console.log("我是有底线的");
      wx:wx.showToast({
        title: '我是有底线的'
      })
    }else{
    // console.log()
      this.QueryParams.pagenum++;
      this.getGoodsList();
    }
  },
  // 监听用户下拉事件
 onPullDownRefresh: function () {
    this.setData({
      goods_list:[]
    })
    this.QueryParams.pagenum=1;
    this.getGoodsList();
     wx-wx.stopPullDownRefresh({
      complete: (res) => {},
      fail: (res) => {},
      success: (res) => {},
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

  /**
   * 页面上拉触底事件的处理函数
   */


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})