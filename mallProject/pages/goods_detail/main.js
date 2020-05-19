import { request } from "../../request/index";
/*
  1 发送请求回去数据
  2 点击轮播图 预览大图
    1 给轮播图绑定点击事件
    2 调用小程序的api previewImage
  3 点击加入购物车
    1 先绑定点击事件
    2 获取缓存中的购物车数据 数据格式
    3 先判断 当前的商品是否已经存在 购物车
    4 已经存在则修改商品数据 执行购物车数量++ 重新将购物车数组 填充到缓存中
    5 不存在购物车数组中 则直接给购物车数据添加一个新元素
    6 弹出提示
 */
// pages/goods_detail/goods_detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods_detail:{}
  },
  QueryParams:{
    goods_id:''
  },
  GoodsInfo:[],
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)
    const {goods_id} = options;
    this.QueryParams.goods_id = goods_id;
    this.getGoodsDetail();
  },
  async getGoodsDetail(){
    const result = await request({url:'/goods/detail',data:this.QueryParams});
    //console.log(result);
    const goods_detail=result.data.message;
    this.setData({
      goods_detail:{
        goods_name:goods_detail.goods_name,
        goods_price:goods_detail.goods_price,
        goods_introduce:goods_detail.goods_introduce,
        pics:goods_detail.pics
      }
    })
    this.GoodsInfo=result.data.message;
  },
  handlePrevewImage(){
    let index=e.currentTarget.dataset.index;
    const urls=this.data.goods_detail.pics.map(v=>v.pics_mid)
    wx.previewImage({
      current:urls[index],
      urls: urls,
    })
  },
  handleCartAdd(){
    
    //获取缓存中的购物车数组
    let cart=wx.getStorageSync('cart')||[];
    // console.log(cart);
    //判断 商品对象是否已经存在于购物车数组中
    let index=cart.findIndex(v=>v.goods_id==this.GoodsInfo.goods_id);
    if(index==-1){
      this.GoodsInfo.num=1;
      this.GoodsInfo.checked=true;
      cart.push(this.GoodsInfo);
    }else{
      cart[index].num++
    }
    // console.log(cart);
    wx.setStorageSync("cart",cart);

    wx.showToast({
      title:'加入成功',
      icon:'success',
      mask:true
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