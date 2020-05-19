// pages/feedback/feedback.js
/*
  1 点击"+"触发tap点击事件
    1 调用小程序内置的 选择图片api
    2 获取搭配图片路径的数组
    3 把图片路径存到data 变量中
    4 页面可以根据图片数组进行循环显示 自定义组件

  2 点击自定义图片组件
    1 获取被点击元素的索引
    2 获取data中的图片数组
    3 根据索引数组中删除对应元素
    4 把数组重新设置会data中
  3 点击提交按钮
    1 获取文本域的内容
      1 data中定义变量 表示 输入框内容
      2 文本域绑定输入事件 事件触发的时候 把输入框的值存到变量中
      3 提交时获取变量
    2 对这些内容进行合法性验证
    3 验证通过 用户选择的图片上传到专门的图片的服务器 返回图片外网的链接
      1 便利图片数组
      2 挨个上传
      3 自己获取图片的数组
    4 文本域和外网的图片路径 一起提交到服务器（目前只是做前端的模拟）
    5 清空当前页面
    6 返回上一页
*/
Page({

  /**
   * 页面的初始数据
   */
  data: {
      tabs:[
      {
        id:0,
        value:"体验问题",
        isActive:true,
        problem_list:[
          {
            id:0,
            title:"功能建议"
          },
          {
            id:1,
            title:"购买遇到问题"
          },
          {
            id:2,
            title:"性能问题"
          },
          {
            id:3,
            title:"其他"
          }
        ],
      },
       {
        id:1,
        value:"商品,商家投诉",
        isActive:false,
                problem_list:[
          {
            id:0,
            title:"功能建议"
          },
          {
            id:1,
            title:"购买遇到问题"
          },
          {
            id:2,
            title:"性能问题"
          },
          {
            id:3,
            title:"其他"
          }
        ]
      }
    ],
    img_list:[],
    textval:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  //点击加号选择图片事件
  handleChooseImage(){
    //调用小程序内置api
    wx.chooseImage({
      //同时选择图片的数量
      count:9,
      //图片的格式 原图 压缩
      sizeType:['original','compressed'],
      //图片的来源 相册 照相机
      sourceType:['album','camera'],
      success:(res)=>{
        // console.log(res);
        this.setData({
            img_list:[...this.data.img_list,...res.tempFilePaths]
        })
      }
    })
  },
  delete_img(e){
  // console.log(e);
    let img_list = this.data.img_list;
    let {index}=e.currentTarget.dataset;
    img_list.splice(index,1);
    this.setData({
      img_list
    })
  },
  handleinput(e){
    //console.log(e);
    this.setData({
     textval: e.detail.value
    });
  },
  handle_from_submit(){
  //获取文本内容
    const { textval,img_list } = this.data;
    //判断文本合法性
    if(!textval.trim()){
      wx.showToast({
        title: '输入不合法',
        icon:'none',
        mask:true
      })
      return;
    }
    wx.showToast({
        title: '后台接口暂时有问题',
        icon:'none',
        mask:true
      })
    wx.navigateBack({
      delta:1
    })
    // img_list.map(v=>{
    //   //准备上传图片到专门的服务器
    //   // 上传文件的api不支持多个文件进行上传
    //   wx.uploadFile({
    //     //上传文件的路径
    //     filePath: v,
    //     //上传文件的名字
    //     name: 'image',
    //     //上传文件到哪里
    //     url: 'https://images.ac.cn/',
    //     success:(res=>{
    //       console.log(res);
    //     })
    //   })
    // })


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