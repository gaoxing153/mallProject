// pages/order//order.js
/*
  页面被打开的时候 onShow
    onshow中无法直接获取options

    获取url上的参数
    根据type参数发送请求获取订单数据
    渲染页面
  点击不同的标题 重新发送请求来获取数据
*/
import { request } from "../../request/index.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
     tabs:[
      {
        id:0,
        value:"全部",
        isActive:true
      },
       {
        id:1,
        value:"待付款",
        isActive:false
      },
       {
        id:2,
        value:"待收货",
        isActive:false
      },
       {
        id:3,
        value:"退款/退货",
        isActive:false
      }
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },
  onShow:function(options){
    wx.setStorageSync('token',"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo");
    const token = wx.getStorageSync('token');
    if(!token){
      wx.navigateTo({
        url:'/pages/auth/auth'
      })
      return;
    }
    let pages = getCurrentPages();
    let currentPage = pages[pages.length - 1];
    let type = currentPage.options;
    console.log(currentPage.options);
    this.getOrder(type);
  },
  async getOrder(type){
    const res = await request({url:"/my/orders/all",data:{type}});
    console.log(res);
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
  
})