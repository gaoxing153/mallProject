// pages/cart/cart.js
/*
  1 获取用户的收货地址
    绑定点击事件
    调用小程序内置api
    2 获取用户对小程序的所授予的获取小程序地址权限
      1 假设用户授予权限
        scope值为true直接调用获取收货地址
      2 假设用户从来没有调用过收货地址的api
        scope undefined直接调用 获取收货地址
      3 假设用户点击获取收获着地址的提示框 取消
        scope值false
        1 诱导用户 自己打开 授权设置页面（wxwx.openSetting()）当用户重新给与获取地址权限的时候的时候
        2 获取收货地址

    2 页面加载完毕
      1 获取本地存储中的地址数据
      2 把数据设置为data中的一个变量
  
  点击结算
    判断有没有选购商品
    判断收货地址是否存在
    经过上面验证跳转到支付页面
*/
import { getSetting,chooseAddress,openSetting,showToast } from "../../utils/asyncWa.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:{},
    cart_list:[],
    money:0,
    num_total:0,
    allChecked:false,
    cart_null:true
  },
  onShow(){
    const address = wx.getStorageSync("address");
    if(address.name){
      const Detail = address.provinceName+address.cityName+address.countyName+address.detailInfo;
      address.Detail = Detail;
    }
    
    const cart=wx.getStorageSync("cart");
    //console.log(cart);
    let money=0;
    let num_total=0;
    let allChecked=false;
    let cart_null = true;
    if(cart.length!=0){ 
      cart_null=false;
      cart.map(v=>{ 
        money+=v.checked?(v.goods_price*v.num):0;
        num_total+=v.checked?v.num:0;
      });
      allChecked=cart.every(v=>v.checked==true);
    }
    this.setData({
      cart_list:cart,
      money,
      num_total,
      allChecked,
      address,
      cart_null
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // const cart=wx.getStorageSync("cart");
    // console.log(cart);
    // let money=0;
    // let num_total=0;
    // let allChecked=false;
    // cart.map(v=>{ 
    //   money+=v.checked?(v.goods_price*v.num):0;
    //   num_total+=v.checked?1:0;
    // });
    // if(cart.length!=0){
    //   allChecked=cart.every(v=>v.checked==true);
    // }
    // this.setData({
    //   cart_list:cart,
    //   money,
    //   num_total,
    //   allChecked
    // })
  },
  numSub(e){
    let index=e.target.dataset.index;
    let cart=this.data.cart_list;
    let num=cart[index].num-1;
    let num_total=this.data.num_total;
    let cart_null = this.data.cart_null;
    num_total--;
    if(num===0){
      cart.splice(index,1);
    }else{
      cart[index].num=num;
    }
    let money = 0;
    cart.map(v=>{ 
      money+=v.checked?(v.goods_price*v.num):0;
    });
    if(num_total===0){
      cart_null=true;
    }
    this.setData({
       cart_list:cart,
       money,
       num_total,
       cart_null
    })
    wx.setStorageSync('cart', cart)
    
  },
    numAdd(e){
    let index=e.target.dataset.index;
    let cart=this.data.cart_list;
    let num=cart[index].num+1;
    cart[index].num=num;
    let num_total = this.data.num_total;
    num_total++;
    let money = 0;

    cart.map(v=>{ 
      money+=v.checked?(v.goods_price*v.num):0;
    });
    this.setData({
       cart_list:cart,
       money,
       num_total
    })
    wx.setStorageSync('cart', cart)
  },
  checkboxChange(e){
    let index=e.currentTarget.dataset.index;
    // console.log(index);
    let cart = this.data.cart_list;
    let money = 0;
    let num_total = 0;
    let allChecked=false;
    cart[index].checked=(cart[index].checked?false:true);
    cart.map(v=>{ 
      money+=v.checked?(v.goods_price*v.num):0;
      num_total+=v.checked?v.num:0;
    });
    allChecked = cart.every(v=>{v.checked==true});
    this.setData({
      cart_list:cart,
      money,
      num_total,
      allChecked
    })
    wx.setStorageSync('cart',cart);
  },
  allCheckboxChange(){
    let cart=this.data.cart_list;
    let allChecked=this.data.allChecked;
    if(allChecked){
      cart.map(v=>{v.checked=false});
      allChecked=false;
    }else{
      cart.map(v=>{v.checked=true});
      allChecked=true;
    }
    // console.log(cart);
    let money = 0;
    let num_total=0;
    cart.map(v=>{ 
      money+=v.checked?(v.goods_price*v.num):0;
      num_total+=v.checked?v.num:0;
    });
    // console.log(money);
    this.setData({
      cart_list:cart,
      money,
      num_total,
      allChecked
    })
    wx.setStorageSync('cart',cart);
  },
  // async handleChooseAddress(){
    // wx.getSetting({
    //   success:(res)=>{
    //     const scopeAddress = res.authSetting["scope.address"]
    //     if(scopeAddress===true||scopeAddress===undefined){
    //       wx.chooseAddress({
    //           success: (res1) => {
    //             console.log(res1)
    //           },
    //         });
    //     }else{
    //       wx.openSetting({
    //         success: (res2) => {
    //             wx.chooseAddress({
    //               success: (res1) => {
    //                 console.log(res1)
    //               },
    //             });
    //         },
    //       })
    //     }
          

    //   }
      
    //   })

  async handleChooseAddress(){
    try{
        //获取权限状态
        const res1 = await getSetting();
        const scopeAddress = res1.authSetting["scope.address"]
        //判断权限授权状态
        if(scopeAddress===false){
            await openSetting();
        }
        //调用获取收货地址
        const address = await chooseAddress();
        //存入缓存
        wx.setStorageSync('address',address)
    }catch(error){
        console.log(error)
    }
},
async handlePay(){
  const {address,num_total}=this.data;
  if(!address.userName){
    await showToast({title:'你还没有添加收获地址'});
    return;
  }
  if(num_total===0){
    await showToast({title:'还没有选购商品'})
    return;
  }
  wx.navigateTo({
    url:"/pages/pay/pay"
  });
},
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */


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